module.exports = (db) => {
    const hashCol = db.collection("hashes");

    const storeHash = async ({ url, hash }) => {
        console.log("url: ", url, "hash: ", hash);
        return await hashCol.insertOne({ originalUrl: url, hash });
    };

    const getAll = async () => {
        return await hashCol.find({}).toArray();
    };

    const getFromHash = async (hash) => {
        return await hashCol.findOne({ hash });
    };

    const getFromUrl = async (url) => {
        return await hashCol.findOne({ originalUrl: url });
    };

    const deleteByUrl = async (url) => {
        return await hashCol.deleteOne({ originalUrl: url });
    };

    const deleteByHash = async (hash) => {
        return await hashCol.deleteOne({ originalUrl: url });
    };

    return {
        storeHash,
        getAll,
        getFromHash,
        getFromUrl,
        deleteByUrl,
        deleteByHash,
    };
};
