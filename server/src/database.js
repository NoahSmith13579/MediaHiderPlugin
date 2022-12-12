module.exports = (db) => {
    const hashCol = db.collection("HashedObjects");

    const getAllHashedObjects = async () => hashCol.find({}).toArray();

    const getHashedObject = async (url) => hashCol.findOne({ url });

    const addHashedObject = async (hashObject) => hashCol.insert(hashObject);

    const deleteHashedObject = async (url) => hashCol.deleteOne({ url: url });

    const getUrlbyHash = async (obj, value) => {
        return Object.keys(obj).find((key) => obj[key] === value);
    };

    return {
        getAllHashedObjects,
        getHashedObject,
        addHashedObject,
        deleteHashedObject,
        getUrlbyHash,
    };
};
