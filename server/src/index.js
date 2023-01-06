require("dotenv").config();

const { MONGO_CONNECTION_STRING: CON_STR, PORT } = process.env;

const cors = require("cors");
const http = require("http");
const asyncHandler = require("express-async-handler");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const fs = require("fs");
const setupDb = require("./database");
const nodeStream = require("node:stream");
const fetch = require("node-fetch");
const { MongoClient } = require("mongodb");

const MediaCache = require("./cache");
const initMongo = require("./database");

const cache = new MediaCache();

const app = express();

const corsOptions = {
    origin: "*",
};

let database; // 🥴

const getHash = (url) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url);
        // Stream the media from the link
        const stream = response.body.pipe(new nodeStream.PassThrough());
        // Create a hash of the media
        const hash = crypto.createHash("md5");
        stream.on("data", (chunk) => {
            hash.update(chunk);
        });

        let handle = setTimeout(() => reject("Request timed out."), 30 * 1000);

        // When the streaming is finished, compare the media hash with the existing list of media hashes
        stream.on("end", () => {
            const mediaHash = hash.digest("hex");

            clearTimeout(handle);
            resolve(mediaHash);
        });
    });
};

const decode = (string) => atob(string.replace("-", "+").replace("_", "/"));

const encode = (string) => btoa(string.replace("+", "-").replace("/", "_"));

//Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (res.headersSent) {
        return next(err);
    }

    res.status(500);
    res.send("An internal error ocured.");
});

app.use(morgan("dev"));
app.use(cors(corsOptions));
//app.use(bodyParser.text({type:"*/*"}));

app.get("/", (req, res) => {
    res.send("Fuck off").end();
});
//TODO update cache after adding/removing items to db
// block a media
app.post(
    "/media/:url",
    asyncHandler(async (req, res) => {
        console.log("POST REQ", req.params.url);

        const url = decode(req.params.url);

        console.log("Decoded url", url);
        //check db
        const media = await database.getFromUrl(url);
        if (!!media) {
            res.status(403).end();

            return;
        }
        //check cache
        const cacheResult = cache.get(url);
        if (!!cacheResult) {
            const { blocked, url, hash } = cacheResult;
            if (blocked) {
                res.status(403).end();
                return;
            }
            await database.storeHash({ url, hash });
            cache.cache(url, { url, hash, blocked: true });
            res.status(200).end();
            return;
        }

        const hash = await getHash(url);
        console.log("Hash: ", hash);
        await database.storeHash({ url, hash });
        cache.cache(url, { url, hash, blocked: true });
        return;
    })
);

app.get(
    "/media",
    asyncHandler(async (req, res) => {
        console.log("GET MEDIA");
        const hiddenArray = await database.getAll();
        console.log("MEDIA ARRAY: ", hiddenArray);
        res.status(200).send(hiddenArray).end();
    })
);

app.get(
    "/media/:url",
    asyncHandler(async (req, res) => {
        // get specific media
        //console.log("GET REQ", req.params.url);

        const url = decode(req.params.url);

        console.log("GET url", url);

        // check cache first
        const cacheResult = cache.get(url);

        if (!!cacheResult) {
            const { blocked } = cacheResult;
            res.status(blocked ? 403 : 200).end();
            return;
        }

        //console.log("NOT CACHED");

        // check db
        const media = await database.getFromUrl(url);
        if (!!media) {
            const { hash } = media;
            cache.cache(url, { url, hash, blocked: true });
            res.status(403).end();
            return;
        }

        //console.log("UNIQUE URL");

        const hash = await getHash(url);

        //console.log("HASH IS", hash);

        const hashedMedia = await database.getFromHash(hash);

        if (!!hashedMedia) {
            cache.cache(url, { url, hash, blocked: true });
            res.status(403).end();
            return;
        }

        //console.log("NOT BLOCKED");

        cache.cache(url, { url, hash, blocked: false });

        res.status(200).end();

        return;
    })
);

app.patch(
    "/media/:url",
    asyncHandler(async (req, res) => {
        // update
        console.log("PATCH REQ", req.params.url);
    })
);

app.delete(
    "/media/:url",
    asyncHandler(async (req, res) => {
        console.log("DELETE REQ", req.params.url);
        const decodedUrl = decode(req.params.url);
        console.log("DECODED URL: ", decodedUrl);
        //check cache first
        const cacheResult = cache.get(decodedUrl);
        if (!!cacheResult) {
            const { blocked, hash, url } = cacheResult;
            if (blocked) {
                await database.deleteByUrl(url);
                cache.cache(url, { url, hash, blocked: false });
                res.status(200).end();
            }
        }
        const media = await database.getFromUrl(decodedUrl);
        //check db
        if (!!media) {
            await database.deleteByUrl(decodedUrl);
            cache.cache(url, { url, hash, blocked: false });
            res.status(200).end();
            return;
        }
        res.status(403).end();
        return;
    })
);

const mongo = new MongoClient(CON_STR);

const asyncMain = async () => {
    await mongo.connect();
    console.log("Connected to Mongo");

    database = initMongo(mongo.db("MediaHiderPlugin")); // TODO: Make this configurable.

    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
};

asyncMain().catch(console.error);
