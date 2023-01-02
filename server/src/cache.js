class MediaCache {
    constructor() {
        this.hashes = {};
    }

    cleanup() {
        // shit yourself
    }

    /**
     *  @param {string} key - A string key
     *  @param {any} value - A value
     */
    cache(key, value) {
        this.hashes[key] = value;
    }

    /**
     * Returns a value or undefined if it exists in the cache.
     * @param {string} key - Key
     * @return {any | undefined} - Value or undefined
     */
    get(key) {
        return this.hashes[key];
    }
}

module.exports = MediaCache;
