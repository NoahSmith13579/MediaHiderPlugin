module.exports = (db) => {
    const hashCol = db.collection("hashes");

    const storeHash = async ({ originalUrl, hash }) => {
        return await hashCol.insertOne({ originalUrl, hash });
    };

    const getAll = async () => {
        return hashCol.find({}).toArray();
    };

    const getFromHash = async (hash) => {
        return await hashCol.findOne({ hash });
    };

    const getFromUrl = async (url) => {
        return await hashCol.findOne({ url });
    };

    const deleteByUrl = async (url) => {
        await hashCol.deleteOne({ url });
    };

    const deleteByHash = async (hash) => {
        await hashCol.deleteOne({ hash });
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
