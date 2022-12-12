import HashedObject from "./entities/HashedObject";
import { ApiResponse, doRequest } from "./helpers/apiHelper";
import makeLog from "./helpers/makeLog";

const { log, debug } = makeLog("projectService");

const createCacheEntry = async (
    payload: string
): Promise<ApiResponse<string>> => {
    return await doRequest("/media", {
        body: payload,
        method: "POST",
    });
};
const getAllHiddenMediaObjects = async (): Promise<HashedObject[]> => {
    debug(`getHiddenMedia(all)`);
    const { content: HashedObjects } = await doRequest<HashedObject[]>(
        `/hiddenMedia`,
        {}
    );
    return HashedObjects;
};

const getHiddenMediaObject = async (url: string): Promise<HashedObject> => {
    debug(`getHiddenMedia(${url})`);
    const { content: HashedObject } = await doRequest<HashedObject>(
        `/hiddenMedia/${url}`,
        {}
    );
    return HashedObject;
};
const addHiddenMediaObject = async (url: string) => {
    debug(`addHiddenMediaObject(${url})`);
    return await doRequest(`/hiddenMedia/${url}`, {
        body: url,
        method: "POST",
    });
};
const deleteHiddenMediaObject = async (url: string): Promise<string> => {
    debug(`DeleteHashedObject(${url})`);
    await doRequest<string>(`/hiddenmedia/${url}`, {
        body: url,
        method: "Delete",
    });
    return url;
};

export {
    createCacheEntry,
    getAllHiddenMediaObjects,
    getHiddenMediaObject,
    addHiddenMediaObject,
    deleteHiddenMediaObject,
};
