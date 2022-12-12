require("dotenv").config();

const cors = require("cors");
const http = require("http");
const asyncHandler = require("express-async-handler");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const fs = require("fs");
const cache = require("memory-cache");
const setupDb = require("./database");
const stream = require("node:stream");

const PORT = process.env.PORT || 4000;

const app = express();

var corsOptions = {
    origin: "*",
};

var MEDIA_HASHES = [];

let database;

//Error handler middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.send({
        message: "An internal server error occured.",
        success: false,
        content: null,
    });
    res.end();
});

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(bodyParser.text({ type: "*/*" }));

app.get("/", (req, res) => {
    res.send("Hello World").end();
});

//Get url and its hash from HashedObjects
app.get(
    "/hiddenMedia/:url",
    asyncHandler(async (req, res) => {
        const { url } = req.params;

        const HashedObject = await database.getHashedObject(url);

        if (!HashedObject) {
            res.status(404).end();
            return;
        }

        res.send({
            success: true,
            content: {
                ...HashedObject,
            },
        }).end();
    })
);
//Get all items from HashedObjects
app.get(
    "/hiddenMedia",
    asyncHandler(async (req, res) => {
        const HashedObjects = await database.getAllHashedObjects();

        if (!HashedObjects) {
            res.status(404).end();
            return;
        }

        res.send({
            success: true,
            content: { ...HashedObjects },
        }).end();
    })
);
//Create cache
app.post(
    "/media",
    asyncHandler(async (req, res) => {
        // Parse the media link from the request body
        const mediaLink = req.body.url;

        // Check if the media link is in the cache
        const cached = !!cache.get(mediaLink);
        if (cached) {
            // If the media link is in the cache, return a 403 response
            res.sendStatus(403);
            return;
        }

        const response = await fetch(mediaLink);
        // Stream the media from the link
        const MediaStream = response.body.pipe(new stream.PassThrough());
        // Create a hash of the media
        const hash = crypto.createHash("md5");
        MediaStream.on("data", (chunk) => {
            hash.update(chunk);
        });

        // When the streaming is finished, compare the media hash with the existing list of media hashes
        MediaStream.on("end", () => {
            const mediaHash = hash.digest("hex");

            // Check if the media hash is unique
            const unique = !MEDIA_HASHES.includes(mediaHash);
            if (unique) {
                // If the media hash is unique, add it to the list of media hashes and return a 200 response
                MEDIA_HASHES.push(mediaHash);
                cache.put(mediaLink, mediaHash, 36000000, function (url, hash) {
                    console.log(`${url} has expired from cache`);
                });
                res.sendStatus(200);
            } else {
                // If the media hash is not unique, return a 403 response
                res.sendStatus(403);
            }
        });
    })
);

//TODO reduce repetition
// Add item to HashedObjects
app.post(
    "/hiddenMedia/:url",
    asyncHandler(async (req, res) => {
        if (!req.body) {
            res.send(400).end();
        }
        const mediaLink = req.body;
        const cached = cache.get(mediaLink);

        let payload;
        // If link is in cache, use the premade hash
        if (!!cached) {
            payload = { mediaLink: cached };
            res.send({ success: true, content: payload }.end());
            // If link is not in cache, make a hash and use it instead
        } else {
            const response = await fetch(mediaLink);
            const MediaStream = response.body.pipe(new stream.PassThrough());
            // Create a hash of the media
            const hash = crypto.createHash("md5");
            MediaStream.on("data", (chunk) => {
                hash.update(chunk);
            });

            // When the streaming is finished, compare the media hash with the existing list of media hashes
            MediaStream.on("end", () => {
                const mediaHash = hash.digest("hex");

                // Check if the media hash is unique
                const unique = !MEDIA_HASHES.includes(mediaHash);
                if (unique) {
                    // If the media hash is unique, add it to the list of media hashes and return a 200 response
                    MEDIA_HASHES.push(mediaHash);
                    cache.put(
                        mediaLink,
                        mediaHash,
                        36000000,
                        function (url, hash) {
                            console.log(`${url} has expired from cache`);
                        }
                    );
                    payload = { mediaLink: mediaHash };
                    res.send({ success: true, content: payload }).end();
                } else {
                    // If the media hash is not unique, return a 403 response
                    res.sendStatus(403);
                }
            });
        }
    })
);

// Remove item from HashedObjects
app.delete(
    "/blockedMedia",
    asyncHandler(async (req, res) => {
        const { url } = req.params;
        const HashedObject = await database.getHashedObject(url);
        if (!HashedObject) {
            res.send(400).end();
        }

        await database.deleteHashedObject(url);
        res.send({ success: true });
    })
);

const { MongoClient } = require("mongodb");

const CON_STR = process.env.MONGO_CONNECTION_STRING;

const mongo = new MongoClient(CON_STR);

const asyncMain = async () => {
    await mongo.connect();
    console.log("Successfully connected to mongo");

    database = setupDb(mongo.db("MediaHiderPlugin"));

    app.listen(PORT, () => {
        console.log(`Listening on: ${PORT}`);
    });
};
asyncMain().catch(console.error);
