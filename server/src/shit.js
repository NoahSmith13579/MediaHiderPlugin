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
const fetch = require("node-fetch");

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
/* app.use((req, res, next) => {
    const corsWhitelist = ["*", "https://discord.com"];
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
    }
    next();
}); */

app.get("/", (req, res) => {
    res.send("Hello World").end();
});

//Get url and its hash from HashedObjects
app.get(
    "/hiddenmedia/:url",
    asyncHandler(async (req, res) => {
        var { url } = req.params;

        var decodedUrl = decodeURI(url);

        const HashedObject = await database.getHashedObject(decodedUrl);

        console.log("CUNT");
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
        return;
    })
);
//Get all items from HashedObjects
app.get(
    "/hiddenmedia",
    asyncHandler(async (req, res) => {
        const HashedObjects = await database.getAllHashedObjects();
        console.log("ball");
        if (!HashedObjects) {
            res.status(404).end();
            return;
        }
        //res.append("Access-Control-Allow-Origin", "*");
        //res.set("Access-Control-Allow-Origin", "*");
        res.send({
            success: true,
            content: { ...HashedObjects },
        }).end();
    })
);
// Change to get request
/* app.post(
    "/hiddenmedia",
    asyncHandler(async (req, res) => {
        // Parse the media link from the request body
        const mediaLink = decodeURI(req.body);
        console.log("Request Body: ", mediaLink);

        // Check if the media link is in the cache
        const cached = !!cache.get(mediaLink);
        if (cached) {
            // If the media link is in the cache, return a 403 response
            console.log("Already in Cache");
            res.sendStatus(403);
            return;
        }
        // Check if the media link is in the database
        const inDB = await database.getHashedObject(mediaLink);
        //console.log(inDB);
        if (!!inDB) {
            // If link is in database, add value from database to cache
            console.log("Already in Database");
            //1 hour
            cache.put(mediaLink, inDB, 60 * 60 * 1000, function (url, hash) {
                console.log(`${url} has expired from cache`);
            });
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
        MediaStream.on("end", async () => {
            const mediaHash = hash.digest("hex");

            // Check if the media hash is unique
            //const unique = await database.getAllHashedObjects().includes(mediaHash);
            cache.put(
                mediaLink,
                mediaHash,
                60 * 60 * 1000,
                function (url, hash) {
                    console.log(`${url} has expired from cache`);
                }
            );
            //res.append("Access-Control-Allow-Origin", "*");
            //res.set("Access-Control-Allow-Origin", "*");
            res.sendStatus(204);

            return;
            /* if (!!unique) {
                // If the media hash is unique, add it to the list of media hashes and return a 200 response
                //MEDIA_HASHES.push(mediaHash);
                //1 hour
                cache.put(
                    mediaLink,
                    mediaHash,
                    60 * 60 * 1000,
                    function (url, hash) {
                        console.log(`${url} has expired from cache`);
                    }
                );
                res.sendStatus(200);
                return;
            } else {
                // If the media hash is not unique, return a 403 response
                res.sendStatus(403);
                return;
            } */ /* 
        });
    })
); */

//TODO reduce repetition
// Add item to HashedObjects
app.post(
    "/hiddenmedia/block",
    asyncHandler(async (req, res) => {
        if (!req.body) {
            res.status(400).end();
            return;
        }
        console.log("hit hide route");
        const mediaLink = decodeURI(req.body);
        let payload;
        // If link is in cache, use the premade hash

        const response = await fetch(mediaLink);
        const MediaStream = response.body.pipe(new stream.PassThrough());
        // Create a hash of the media
        const hash = crypto.createHash("md5");
        MediaStream.on("data", (chunk) => {
            hash.update(chunk);
        });

        // When the streaming is finished, compare the media hash with the existing list of media hashes
        MediaStream.on("end", async () => {
            const mediaHash = hash.digest("hex");

            // Check if the media hash is unique
            const Unique = await database.getAllHashedObjects();
            const isNotUnique = Unique.includes(mediaHash);
            if (!isNotUnique) {
                console.log("hit isUnique");
                // If the media hash is unique, add it to the list of media hashes and return a 200 response
                // expires in one hour
                cache.put(
                    mediaLink,
                    mediaHash,
                    1000 * 60 * 60,
                    function (url, hash) {
                        console.log(`${url} has expired from cache`);
                    }
                );
                payload = { url: mediaLink, hash: cache.get(mediaLink) };

                database.addHashedObject(payload);
                res.send({ success: true, content: payload }).end();
                return;
            } else {
                // If the media hash is not unique, return a 403 response
                res.status(403);
                return;
            }
        });
    })
);

// Remove item from HashedObjects
app.delete(
    "/hiddenmedia",
    asyncHandler(async (req, res) => {
        var { url } = req.params;
        var url = decodeURI(url);
        const HashedObject = await database.getHashedObject(url);
        if (!HashedObject) {
            res.send(400).end();
            return;
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
