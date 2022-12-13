/**
 * @name MediaHiderPlugin
 * @description Dummy text here
 * @version 0.0.1
 * @author me
 * @authorId example
 * @website asdjj
 * @source ekkjdf
 */
var plugin;
/******/ (() => {
    // webpackBootstrap
    /******/ var __webpack_modules__ = {
        /***/ "./node_modules/electron/index.js":
            /*!****************************************!*\
  !*** ./node_modules/electron/index.js ***!
  \****************************************/
            /***/ (module, __unused_webpack_exports, __webpack_require__) => {
                var __dirname = "/";
                const fs = __webpack_require__(/*! fs */ "?b8eb");
                const path = __webpack_require__(/*! path */ "?8f51");

                const pathFile = path.join(__dirname, "path.txt");

                function getElectronPath() {
                    let executablePath;
                    if (fs.existsSync(pathFile)) {
                        executablePath = fs.readFileSync(pathFile, "utf-8");
                    }
                    if (process.env.ELECTRON_OVERRIDE_DIST_PATH) {
                        return path.join(
                            process.env.ELECTRON_OVERRIDE_DIST_PATH,
                            executablePath || "electron"
                        );
                    }
                    if (executablePath) {
                        return path.join(__dirname, "dist", executablePath);
                    } else {
                        throw new Error(
                            "Electron failed to install correctly, please delete node_modules/electron and try installing again"
                        );
                    }
                }

                module.exports = getElectronPath();

                /***/
            },

        /***/ "./crudApi.ts":
            /*!********************!*\
  !*** ./crudApi.ts ***!
  \********************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__
            ) => {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony export */ __webpack_require__.d(
                    __webpack_exports__,
                    {
                        /* harmony export */ addHiddenMediaObject: () =>
                            /* binding */ addHiddenMediaObject,
                        /* harmony export */ createCacheEntry: () =>
                            /* binding */ createCacheEntry,
                        /* harmony export */ deleteHiddenMediaObject: () =>
                            /* binding */ deleteHiddenMediaObject,
                        /* harmony export */ getAllHiddenMediaObjects: () =>
                            /* binding */ getAllHiddenMediaObjects,
                        /* harmony export */ getHiddenMediaObject: () =>
                            /* binding */ getHiddenMediaObject,
                        /* harmony export */
                    }
                );
                /* harmony import */ var _helpers_apiHelper__WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! ./helpers/apiHelper */ "./helpers/apiHelper.ts"
                    );
                /* harmony import */ var _helpers_makeLog__WEBPACK_IMPORTED_MODULE_1__ =
                    __webpack_require__(
                        /*! ./helpers/makeLog */ "./helpers/makeLog.ts"
                    );
                var __awaiter =
                    (undefined && undefined.__awaiter) ||
                    function (thisArg, _arguments, P, generator) {
                        function adopt(value) {
                            return value instanceof P
                                ? value
                                : new P(function (resolve) {
                                      resolve(value);
                                  });
                        }
                        return new (P || (P = Promise))(function (
                            resolve,
                            reject
                        ) {
                            function fulfilled(value) {
                                try {
                                    step(generator.next(value));
                                } catch (e) {
                                    reject(e);
                                }
                            }
                            function rejected(value) {
                                try {
                                    step(generator["throw"](value));
                                } catch (e) {
                                    reject(e);
                                }
                            }
                            function step(result) {
                                result.done
                                    ? resolve(result.value)
                                    : adopt(result.value).then(
                                          fulfilled,
                                          rejected
                                      );
                            }
                            step(
                                (generator = generator.apply(
                                    thisArg,
                                    _arguments || []
                                )).next()
                            );
                        });
                    };
                var __generator =
                    (undefined && undefined.__generator) ||
                    function (thisArg, body) {
                        var _ = {
                                label: 0,
                                sent: function () {
                                    if (t[0] & 1) throw t[1];
                                    return t[1];
                                },
                                trys: [],
                                ops: [],
                            },
                            f,
                            y,
                            t,
                            g;
                        return (
                            (g = {
                                next: verb(0),
                                throw: verb(1),
                                return: verb(2),
                            }),
                            typeof Symbol === "function" &&
                                (g[Symbol.iterator] = function () {
                                    return this;
                                }),
                            g
                        );
                        function verb(n) {
                            return function (v) {
                                return step([n, v]);
                            };
                        }
                        function step(op) {
                            if (f)
                                throw new TypeError(
                                    "Generator is already executing."
                                );
                            while ((g && ((g = 0), op[0] && (_ = 0)), _))
                                try {
                                    if (
                                        ((f = 1),
                                        y &&
                                            (t =
                                                op[0] & 2
                                                    ? y["return"]
                                                    : op[0]
                                                    ? y["throw"] ||
                                                      ((t = y["return"]) &&
                                                          t.call(y),
                                                      0)
                                                    : y.next) &&
                                            !(t = t.call(y, op[1])).done)
                                    )
                                        return t;
                                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                                    switch (op[0]) {
                                        case 0:
                                        case 1:
                                            t = op;
                                            break;
                                        case 4:
                                            _.label++;
                                            return {
                                                value: op[1],
                                                done: false,
                                            };
                                        case 5:
                                            _.label++;
                                            y = op[1];
                                            op = [0];
                                            continue;
                                        case 7:
                                            op = _.ops.pop();
                                            _.trys.pop();
                                            continue;
                                        default:
                                            if (
                                                !((t = _.trys),
                                                (t =
                                                    t.length > 0 &&
                                                    t[t.length - 1])) &&
                                                (op[0] === 6 || op[0] === 2)
                                            ) {
                                                _ = 0;
                                                continue;
                                            }
                                            if (
                                                op[0] === 3 &&
                                                (!t ||
                                                    (op[1] > t[0] &&
                                                        op[1] < t[3]))
                                            ) {
                                                _.label = op[1];
                                                break;
                                            }
                                            if (op[0] === 6 && _.label < t[1]) {
                                                _.label = t[1];
                                                t = op;
                                                break;
                                            }
                                            if (t && _.label < t[2]) {
                                                _.label = t[2];
                                                _.ops.push(op);
                                                break;
                                            }
                                            if (t[2]) _.ops.pop();
                                            _.trys.pop();
                                            continue;
                                    }
                                    op = body.call(thisArg, _);
                                } catch (e) {
                                    op = [6, e];
                                    y = 0;
                                } finally {
                                    f = t = 0;
                                }
                            if (op[0] & 5) throw op[1];
                            return {
                                value: op[0] ? op[1] : void 0,
                                done: true,
                            };
                        }
                    };

                var _a = (0,
                    _helpers_makeLog__WEBPACK_IMPORTED_MODULE_1__["default"])(
                        "projectService"
                    ),
                    log = _a.log,
                    debug = _a.debug;
                var createCacheEntry = function (payload) {
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [
                                        4 /*yield*/,
                                        (0,
                                        _helpers_apiHelper__WEBPACK_IMPORTED_MODULE_0__.doRequest)(
                                            "/media",
                                            {
                                                body: payload,
                                                method: "POST",
                                            }
                                        ),
                                    ];
                                case 1:
                                    return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                };
                var getAllHiddenMediaObjects = function () {
                    return __awaiter(void 0, void 0, void 0, function () {
                        var HashedObjects;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    debug("getHiddenMedia(all)");
                                    return [
                                        4 /*yield*/,
                                        (0,
                                        _helpers_apiHelper__WEBPACK_IMPORTED_MODULE_0__.doRequest)(
                                            "/hiddenMedia",
                                            {}
                                        ),
                                    ];
                                case 1:
                                    HashedObjects = _a.sent().content;
                                    return [2 /*return*/, HashedObjects];
                            }
                        });
                    });
                };
                var getHiddenMediaObject = function (url) {
                    return __awaiter(void 0, void 0, void 0, function () {
                        var HashedObject;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    debug("getHiddenMedia(".concat(url, ")"));
                                    return [
                                        4 /*yield*/,
                                        (0,
                                        _helpers_apiHelper__WEBPACK_IMPORTED_MODULE_0__.doRequest)(
                                            "/hiddenMedia/".concat(url),
                                            {}
                                        ),
                                    ];
                                case 1:
                                    HashedObject = _a.sent().content;
                                    return [2 /*return*/, HashedObject];
                            }
                        });
                    });
                };
                var addHiddenMediaObject = function (url) {
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    debug(
                                        "addHiddenMediaObject(".concat(url, ")")
                                    );
                                    return [
                                        4 /*yield*/,
                                        (0,
                                        _helpers_apiHelper__WEBPACK_IMPORTED_MODULE_0__.doRequest)(
                                            "/hiddenMedia/".concat(url),
                                            {
                                                body: url,
                                                method: "POST",
                                            }
                                        ),
                                    ];
                                case 1:
                                    return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                };
                var deleteHiddenMediaObject = function (url) {
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    debug(
                                        "DeleteHashedObject(".concat(url, ")")
                                    );
                                    return [
                                        4 /*yield*/,
                                        (0,
                                        _helpers_apiHelper__WEBPACK_IMPORTED_MODULE_0__.doRequest)(
                                            "/hiddenmedia/".concat(url),
                                            {
                                                body: url,
                                                method: "Delete",
                                            }
                                        ),
                                    ];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, url];
                            }
                        });
                    });
                };

                /***/
            },

        /***/ "./helpers/apiHelper.ts":
            /*!******************************!*\
  !*** ./helpers/apiHelper.ts ***!
  \******************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__
            ) => {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony export */ __webpack_require__.d(
                    __webpack_exports__,
                    {
                        /* harmony export */ doRequest: () =>
                            /* binding */ doRequest,
                        /* harmony export */
                    }
                );
                var __awaiter =
                    (undefined && undefined.__awaiter) ||
                    function (thisArg, _arguments, P, generator) {
                        function adopt(value) {
                            return value instanceof P
                                ? value
                                : new P(function (resolve) {
                                      resolve(value);
                                  });
                        }
                        return new (P || (P = Promise))(function (
                            resolve,
                            reject
                        ) {
                            function fulfilled(value) {
                                try {
                                    step(generator.next(value));
                                } catch (e) {
                                    reject(e);
                                }
                            }
                            function rejected(value) {
                                try {
                                    step(generator["throw"](value));
                                } catch (e) {
                                    reject(e);
                                }
                            }
                            function step(result) {
                                result.done
                                    ? resolve(result.value)
                                    : adopt(result.value).then(
                                          fulfilled,
                                          rejected
                                      );
                            }
                            step(
                                (generator = generator.apply(
                                    thisArg,
                                    _arguments || []
                                )).next()
                            );
                        });
                    };
                var __generator =
                    (undefined && undefined.__generator) ||
                    function (thisArg, body) {
                        var _ = {
                                label: 0,
                                sent: function () {
                                    if (t[0] & 1) throw t[1];
                                    return t[1];
                                },
                                trys: [],
                                ops: [],
                            },
                            f,
                            y,
                            t,
                            g;
                        return (
                            (g = {
                                next: verb(0),
                                throw: verb(1),
                                return: verb(2),
                            }),
                            typeof Symbol === "function" &&
                                (g[Symbol.iterator] = function () {
                                    return this;
                                }),
                            g
                        );
                        function verb(n) {
                            return function (v) {
                                return step([n, v]);
                            };
                        }
                        function step(op) {
                            if (f)
                                throw new TypeError(
                                    "Generator is already executing."
                                );
                            while ((g && ((g = 0), op[0] && (_ = 0)), _))
                                try {
                                    if (
                                        ((f = 1),
                                        y &&
                                            (t =
                                                op[0] & 2
                                                    ? y["return"]
                                                    : op[0]
                                                    ? y["throw"] ||
                                                      ((t = y["return"]) &&
                                                          t.call(y),
                                                      0)
                                                    : y.next) &&
                                            !(t = t.call(y, op[1])).done)
                                    )
                                        return t;
                                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                                    switch (op[0]) {
                                        case 0:
                                        case 1:
                                            t = op;
                                            break;
                                        case 4:
                                            _.label++;
                                            return {
                                                value: op[1],
                                                done: false,
                                            };
                                        case 5:
                                            _.label++;
                                            y = op[1];
                                            op = [0];
                                            continue;
                                        case 7:
                                            op = _.ops.pop();
                                            _.trys.pop();
                                            continue;
                                        default:
                                            if (
                                                !((t = _.trys),
                                                (t =
                                                    t.length > 0 &&
                                                    t[t.length - 1])) &&
                                                (op[0] === 6 || op[0] === 2)
                                            ) {
                                                _ = 0;
                                                continue;
                                            }
                                            if (
                                                op[0] === 3 &&
                                                (!t ||
                                                    (op[1] > t[0] &&
                                                        op[1] < t[3]))
                                            ) {
                                                _.label = op[1];
                                                break;
                                            }
                                            if (op[0] === 6 && _.label < t[1]) {
                                                _.label = t[1];
                                                t = op;
                                                break;
                                            }
                                            if (t && _.label < t[2]) {
                                                _.label = t[2];
                                                _.ops.push(op);
                                                break;
                                            }
                                            if (t[2]) _.ops.pop();
                                            _.trys.pop();
                                            continue;
                                    }
                                    op = body.call(thisArg, _);
                                } catch (e) {
                                    op = [6, e];
                                    y = 0;
                                } finally {
                                    f = t = 0;
                                }
                            if (op[0] & 5) throw op[1];
                            return {
                                value: op[0] ? op[1] : void 0,
                                done: true,
                            };
                        }
                    };
                var API_URL = process.env.REACT_APP_API_URL;
                /**
                 * Fetches from provided url and returns as JSON.
                 * A fetch wrapper with error handling.
                 */
                var doRequest = function (url, params) {
                    return __awaiter(void 0, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (
                                        typeof params.body !== "undefined" &&
                                        typeof params.body !== "string"
                                    ) {
                                        params.body = JSON.stringify(
                                            params.body
                                        );
                                    }
                                    return [
                                        4 /*yield*/,
                                        fetch(API_URL + url, params),
                                    ];
                                case 1:
                                    response = _a.sent();
                                    if (response.status !== 200) {
                                        throw new Error(
                                            "Request failed with status "
                                                .concat(response.status, ": ")
                                                .concat(response.statusText)
                                        );
                                    }
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                };

                /***/
            },

        /***/ "./helpers/makeLog.ts":
            /*!****************************!*\
  !*** ./helpers/makeLog.ts ***!
  \****************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__
            ) => {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony export */ __webpack_require__.d(
                    __webpack_exports__,
                    {
                        /* harmony export */ default: () =>
                            __WEBPACK_DEFAULT_EXPORT__,
                        /* harmony export */
                    }
                );
                var makeLog = function (name) {
                    return {
                        log: function (message) {
                            return console.log(
                                "[".concat(name.toUpperCase(), "]"),
                                message
                            );
                        },
                        debug: function (message) {
                            return console.debug(
                                "[".concat(name.toUpperCase(), "]"),
                                message
                            );
                        },
                        error: function (message) {
                            return console.error(
                                "[".concat(name.toUpperCase(), "]"),
                                message
                            );
                        },
                    };
                };
                /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
                    makeLog;

                /***/
            },

        /***/ "./src/MediaHiderPlugin.plugin.js":
            /*!****************************************!*\
  !*** ./src/MediaHiderPlugin.plugin.js ***!
  \****************************************/
            /***/ function (
                module,
                __unused_webpack_exports,
                __webpack_require__
            ) {
                /**
                 * @name MediaHiderPlugin
                 * @description Dummy text here
                 * @version 0.0.1
                 * @author me
                 * @authorId example
                 * @website asdjj
                 * @source ekkjdf
                 */

                /*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/
                const config = {
                    main: "index.js",
                    id: "",
                    name: "MediaHiderPlugin",
                    author: "Salt",
                    authorId: "",
                    authorLink: "",
                    version: "0.1",
                    description: "Hide Media",
                    website: "",
                    source: "",
                    patreon: "",
                    donate: "",
                    invite: "",

                    changelog: [],
                    defaultConfig: [],
                    main: "index.js",
                };
                class Dummy {
                    constructor() {
                        this._config = config;
                    }
                    start() {}
                    stop() {}
                }

                const {
                    createCacheEntry,
                    getAllHiddenMediaObjects,
                    getHiddenMediaObject,
                    addHiddenMediaObject,
                    deleteHiddenMediaObject,
                } = __webpack_require__(/*! ../crudApi */ "./crudApi.ts");

                if (!__webpack_require__.g.ZeresPluginLibrary) {
                    BdApi.showConfirmationModal(
                        "Library Missing",
                        `The library plugin needed for ${
                            config.name ?? config.info.name
                        } is missing. Please click Download Now to install it.`,
                        {
                            confirmText: "Download Now",
                            cancelText: "Cancel",
                            onConfirm: () => {
                                __webpack_require__(/*! request */ "?470d").get(
                                    "https://betterdiscord.app/gh-redirect?id=9",
                                    async (err, resp, body) => {
                                        if (err)
                                            return __webpack_require__(
                                                /*! electron */ "./node_modules/electron/index.js"
                                            ).shell.openExternal(
                                                "https://betterdiscord.app/Download?id=9"
                                            );
                                        if (resp.statusCode === 302) {
                                            __webpack_require__(
                                                /*! request */ "?470d"
                                            ).get(
                                                resp.headers.location,
                                                async (
                                                    error,
                                                    response,
                                                    content
                                                ) => {
                                                    if (error)
                                                        return __webpack_require__(
                                                            /*! electron */ "./node_modules/electron/index.js"
                                                        ).shell.openExternal(
                                                            "https://betterdiscord.app/Download?id=9"
                                                        );
                                                    await new Promise((r) =>
                                                        __webpack_require__(
                                                            /*! fs */ "?569f"
                                                        ).writeFile(
                                                            __webpack_require__(
                                                                /*! path */ "?3f59"
                                                            ).join(
                                                                BdApi.Plugins
                                                                    .folder,
                                                                "0PluginLibrary.plugin.js"
                                                            ),
                                                            content,
                                                            r
                                                        )
                                                    );
                                                }
                                            );
                                        } else {
                                            await new Promise((r) =>
                                                __webpack_require__(
                                                    /*! fs */ "?569f"
                                                ).writeFile(
                                                    __webpack_require__(
                                                        /*! path */ "?3f59"
                                                    ).join(
                                                        BdApi.Plugins.folder,
                                                        "0PluginLibrary.plugin.js"
                                                    ),
                                                    body,
                                                    r
                                                )
                                            );
                                        }
                                    }
                                );
                            },
                        }
                    );
                }

                module.exports = !__webpack_require__.g.ZeresPluginLibrary
                    ? Dummy
                    : (([Plugin, Api]) => {
                          const plugin = (Plugin, Library) => {
                              const { DOM, ContextMenu, Patcher, Data } = BdApi;
                              const { Logger } = Library;
                              //Data.load/save for the hide list.
                              this.savedData = new Set(
                                  Data.load(config.name, "HiderList")
                              );
                              const HMstore = Array.from(this.savedData);
                              const HiddenMediaHTMLexpanded = `<div class="wrapper-30-Nkg cozy-VmLDNB zalgo-26OfGz MediaHiderWrapper" role="article">
                <div class="contents-2MsGLg">
                    <div class="blockedSystemMessage-3FmE9n container-x059i8 cozy-S5wsfF">
                        <div class="iconContainer-2rPbqG">
                            <svg class="blockedIcon-cd-3B7" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="red" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z">
                                </path>
                            </svg>
                        </div>
                        <div class="content-vSHmMD">
                            <div class="blockedMessageText-3Zeg3y">
                                Hidden Media — 
                                <span class="blockedAction-2cPk2G" 
                                role="button" tabindex="0">
                                    Show/Hide media
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
                              const MessageAccessorySelector =
                                  "div > div[id*=message-accessories]";
                              const imageMediaSelector =
                                  ":not(article *) > div:not([class*=grid]) > div[class*=imageContent]:not([class*=embedVideo]) div[class*=clickableWrapper] img";
                              const stickerSelector =
                                  "span[class*=clickableSticker] img";
                              const embedMediaSelector =
                                  "article div[class*=clickableWrapper] img";
                              const embedVideoSelector =
                                  "article[class*=embed] video, article div[class*=embedVideo] div[class*=wrapper] video";
                              const videoMediaSelector =
                                  "div[class*=inlineMediaEmbed] div[class*=imageWrapper]  div[class*=clickableWrapper]  video[class*=embedVideo], div[class*=inlineMediaEmbed] div[class*=imageWrapper]  div[class*=wrapper] video, div[class*=messageAttachment] div[class*=wrapper] video";

                              /* const MessageAccessorySelector =
                  "div > div[id*=message-accessories]";
              const imageMediaSelector =
                  ":not(article *) > div:not([class*=grid]) > div[class*=imageContent]:not([class*=embedVideo]) a";
              const stickerSelector = "span[class*=clickableSticker] img";
              const embedMediaSelector =
                  "article div[class*=clickableWrapper] img";
              const embedVideoSelector =
                  "article[class*=embed] video, article div[class*=embedVideo] div[class*=wrapper] video";
              const videoMediaSelector =
                  "div[class*=inlineMediaEmbed] div[class*=imageWrapper]  div[class*=clickableWrapper]  video[class*=embedVideo], div[class*=inlineMediaEmbed] div[class*=imageWrapper]  div[class*=wrapper] video, div[class*=messageAttachment] div[class*=wrapper] video";
               */
                              return class MediaHider extends Plugin {
                                  // Detects Li in current channel
                                  checkCurrentChannel(mutations) {
                                      // for each mutation
                                      for (let mutation of mutations) {
                                          // if addedNodes exists
                                          if (
                                              mutation.addedNodes.length !== 0
                                          ) {
                                              for (
                                                  let i = 0;
                                                  i <
                                                  mutation.addedNodes.length;
                                                  i++
                                              ) {
                                                  let addedNode =
                                                      mutation.addedNodes[i];
                                                  if (
                                                      (addedNode.tagName ===
                                                          "MAIN" &&
                                                          addedNode.className.includes(
                                                              "chatContent"
                                                          )) ||
                                                      (addedNode.tagName ===
                                                          "LI" &&
                                                          addedNode.className.includes(
                                                              "messageListItem"
                                                          ) &&
                                                          mutation.type ===
                                                              "childList")
                                                  ) {
                                                      // the ol containing the li items
                                                      const ChatMessageList =
                                                          document.querySelector(
                                                              "main > div > div > div > ol"
                                                          );
                                                      // the li items
                                                      const CMLli =
                                                          ChatMessageList.querySelectorAll(
                                                              "li"
                                                          );
                                                      // do this to each li in the list
                                                      CMLli.forEach((li) => {
                                                          const MessageAccessory =
                                                              li.querySelector(
                                                                  MessageAccessorySelector
                                                              );

                                                          const imageMedia =
                                                              MessageAccessory.querySelector(
                                                                  imageMediaSelector
                                                              );
                                                          const sticker =
                                                              MessageAccessory.querySelector(
                                                                  stickerSelector
                                                              );
                                                          //TODO this one does not work after the vid is clicked
                                                          const embedMedia =
                                                              MessageAccessory.querySelector(
                                                                  embedMediaSelector
                                                              );
                                                          const embedVideo =
                                                              MessageAccessory.querySelector(
                                                                  embedVideoSelector
                                                              );
                                                          const videoMedia =
                                                              MessageAccessory.querySelector(
                                                                  videoMediaSelector
                                                              );
                                                          // needs Media to trigger block
                                                          if (
                                                              MessageAccessory
                                                                  .children
                                                                  .length !== 0
                                                          ) {
                                                              // execute iff valid selector
                                                              if (
                                                                  !!imageMedia ||
                                                                  !!sticker ||
                                                                  !!embedMedia ||
                                                                  !!embedVideo ||
                                                                  !!videoMedia
                                                              ) {
                                                                  // use this var to prevent code repetition
                                                                  var url;
                                                                  // These pass the media link to the var
                                                                  if (
                                                                      !!imageMedia
                                                                  ) {
                                                                      Logger.info(
                                                                          "imageMedia: ",
                                                                          imageMedia
                                                                      );
                                                                      url =
                                                                          imageMedia.href;
                                                                  }
                                                                  if (
                                                                      !!sticker
                                                                  ) {
                                                                      Logger.info(
                                                                          "sticker: ",
                                                                          sticker
                                                                      );
                                                                      url =
                                                                          sticker.src;
                                                                  }
                                                                  if (
                                                                      !!embedMedia
                                                                  ) {
                                                                      Logger.info(
                                                                          "embedMedia: ",
                                                                          embedMedia
                                                                      );
                                                                      url =
                                                                          embedMedia.src;
                                                                  }
                                                                  if (
                                                                      !!embedVideo
                                                                  ) {
                                                                      Logger.info(
                                                                          "embedVideo: ",
                                                                          embedVideo
                                                                      );
                                                                      url =
                                                                          embedVideo.src;
                                                                  }
                                                                  if (
                                                                      !!videoMedia
                                                                  ) {
                                                                      Logger.info(
                                                                          "videoMedia: ",
                                                                          videoMedia
                                                                      );
                                                                      url =
                                                                          videoMedia.src;
                                                                  }
                                                                  // only triggers if url is mutated by the previous block
                                                                  if (
                                                                      url !==
                                                                      undefined
                                                                  ) {
                                                                      createCacheEntry(
                                                                          url
                                                                      );
                                                                      const isHidden =
                                                                          getHiddenMediaObject(
                                                                              url
                                                                          );
                                                                      //Logger.info("Url is: ",url);
                                                                      //const isHidden = HMstore.includes(url);

                                                                      // if hidden media is detected and there is not already a MediaHiderWrapper: hides element
                                                                      if (
                                                                          isHidden &&
                                                                          li.querySelector(
                                                                              "div[class*=MediaHiderWrapper]"
                                                                          ) ===
                                                                              null
                                                                      ) {
                                                                          // creates Wrapper
                                                                          const Wrapper =
                                                                              DOM.parseHTML(
                                                                                  HiddenMediaHTMLexpanded,
                                                                                  true
                                                                              );
                                                                          Wrapper.appendChild(
                                                                              MessageAccessory
                                                                          );

                                                                          const Message =
                                                                              li.querySelector(
                                                                                  "div[class*=message]"
                                                                              );
                                                                          // appending here preserves css styling
                                                                          Message.append(
                                                                              Wrapper
                                                                          );
                                                                          if (
                                                                              document.readyState !==
                                                                              "loading"
                                                                          ) {
                                                                              const MHspan =
                                                                                  Message.querySelector(
                                                                                      "span[class*=blockedAction]"
                                                                                  );
                                                                              MessageAccessory.style.display =
                                                                                  "none";
                                                                              const toggleShow =
                                                                                  function () {
                                                                                      MessageAccessory
                                                                                          .style
                                                                                          .display ===
                                                                                      "none"
                                                                                          ? (MessageAccessory.style.display =
                                                                                                "block")
                                                                                          : (MessageAccessory.style.display =
                                                                                                "none");
                                                                                  };

                                                                              MHspan.addEventListener(
                                                                                  "click",
                                                                                  function () {
                                                                                      toggleShow();
                                                                                  },
                                                                                  false
                                                                              );
                                                                          }
                                                                      }
                                                                  }
                                                              }
                                                          }
                                                      });
                                                      Logger.info(
                                                          "chat window or message loaded"
                                                      );
                                                  }
                                              }
                                          }
                                      }
                                  }
                                  //TODO Triggers multiple times and in multi-media posts grabs the first item only
                                  patchMessageContextMenu() {
                                      this.contextMenuPatch = ContextMenu.patch(
                                          "message",
                                          (retVal, props) => {
                                              // TODO Find better solution
                                              const ParentLi =
                                                  props.target.closest("li");
                                              const MessageAccessory =
                                                  ParentLi.querySelector(
                                                      MessageAccessorySelector
                                                  );
                                              //re-name these as they are unclear
                                              const imageMedia =
                                                  MessageAccessory.querySelector(
                                                      imageMediaSelector
                                                  );
                                              // selects stickers
                                              const sticker =
                                                  MessageAccessory.querySelector(
                                                      stickerSelector
                                                  );
                                              //TODO this one does not work after the vid is clicked
                                              const embedMedia =
                                                  MessageAccessory.querySelector(
                                                      embedMediaSelector
                                                  );
                                              const embedVideo =
                                                  MessageAccessory.querySelector(
                                                      embedVideoSelector
                                                  );
                                              const videoMedia =
                                                  MessageAccessory.querySelector(
                                                      videoMediaSelector
                                                  );
                                              var targetUrl;
                                              var targetElement;
                                              // needs Media to trigger block
                                              if (
                                                  MessageAccessory.children
                                                      .length !== 0
                                              ) {
                                                  // execute iff valid selector //
                                                  if (
                                                      !!imageMedia ||
                                                      !!sticker ||
                                                      !!embedMedia ||
                                                      !!embedVideo ||
                                                      !!videoMedia
                                                  ) {
                                                      // These pass the media link to the var
                                                      if (!!imageMedia) {
                                                          Logger.info(
                                                              "imageMedia: ",
                                                              imageMedia
                                                          );
                                                          targetUrl =
                                                              imageMedia.href;
                                                          targetElement =
                                                              imageMedia;
                                                      }
                                                      if (!!sticker) {
                                                          Logger.info(
                                                              "sticker: ",
                                                              sticker
                                                          );
                                                          targetUrl =
                                                              sticker.src;
                                                          targetElement =
                                                              sticker;
                                                      }
                                                      if (!!embedMedia) {
                                                          Logger.info(
                                                              "embedMedia: ",
                                                              embedMedia
                                                          );
                                                          targetUrl =
                                                              embedMedia.src;
                                                          targetElement =
                                                              embedMedia;
                                                      }
                                                      if (!!embedVideo) {
                                                          Logger.info(
                                                              "embedVideo: ",
                                                              embedMedia
                                                          );
                                                          targetUrl =
                                                              embedVideo.src;
                                                          targetElement =
                                                              embedVideo;
                                                      }
                                                      if (!!videoMedia) {
                                                          Logger.info(
                                                              "videoMedia: ",
                                                              videoMedia
                                                          );
                                                          targetUrl =
                                                              videoMedia.src;
                                                          targetElement =
                                                              videoMedia;
                                                      }
                                                      // only triggers if targetUrl is mutated by the previous block
                                                      if (
                                                          targetUrl !==
                                                          undefined
                                                      ) {
                                                          //Logger.info("targetUrl is: ",targetUrl );
                                                      }
                                                  }
                                              }
                                              //END OF AUTISM

                                              const hasHref =
                                                  !!props.target.href;
                                              const hasAttachments =
                                                  props.message.attachments
                                                      .length !== 0;
                                              const mAttachments =
                                                  props.message.attachments;

                                              const hasEmbeds =
                                                  props.message.embeds
                                                      .length !== 0;
                                              if (
                                                  !hasHref &&
                                                  !hasAttachments &&
                                                  !hasEmbeds
                                              ) {
                                                  return;
                                              }
                                              const HiddenMediaList =
                                                  getAllHiddenMediaObjects();
                                              //populates submenu with items from store
                                              const MediaHiderHiddenItems = [];
                                              for (
                                                  var i = 0;
                                                  HiddenMediaList.length > i;
                                                  i++
                                              ) {
                                                  const item =
                                                      HiddenMediaList[i];
                                                  const MediaFileName =
                                                      item.url.slice(
                                                          item.url.lastIndexOf(
                                                              "/"
                                                          ) + 1,
                                                          item.url.length
                                                      );

                                                  const label = item.url;
                                                  // individual item/ unhider logic
                                                  const MHHitem =
                                                      ContextMenu.buildItem({
                                                          label: MediaFileName,
                                                          id: `MHHi-${i}`,
                                                          closeOnClick: false,

                                                          action: (e) => {
                                                              // Modal for removing media from list
                                                              BdApi.showConfirmationModal(
                                                                  "Remove this from the hide list?",
                                                                  `${MediaFileName}`,
                                                                  {
                                                                      confirmText:
                                                                          "Unhide",
                                                                      cancelText:
                                                                          "Cancel",
                                                                      //logic for removing from hide list
                                                                      onConfirm:
                                                                          () => {
                                                                              const index =
                                                                                  HiddenMediaList.indexOf(
                                                                                      item
                                                                                  );

                                                                              if (
                                                                                  index >
                                                                                  -1
                                                                              ) {
                                                                                  const PresentLinks =
                                                                                      document.querySelectorAll(
                                                                                          "a, img, video"
                                                                                      );
                                                                                  for (let item of PresentLinks) {
                                                                                      if (
                                                                                          item.href ===
                                                                                              label ||
                                                                                          item.src ===
                                                                                              label
                                                                                      ) {
                                                                                          const UnHidParentLi =
                                                                                              item.closest(
                                                                                                  "li"
                                                                                              );
                                                                                          if (
                                                                                              UnHidParentLi !==
                                                                                              null
                                                                                          ) {
                                                                                              const Wrapper =
                                                                                                  UnHidParentLi.querySelector(
                                                                                                      "div[class*=MediaHiderWrapper]"
                                                                                                  );
                                                                                              Wrapper.remove();
                                                                                              const MA =
                                                                                                  UnHidParentLi.querySelector(
                                                                                                      "div > div[id*=message-accessories]"
                                                                                                  );
                                                                                              MA.style.display =
                                                                                                  "block";
                                                                                          }
                                                                                      }
                                                                                  }
                                                                                  deleteHiddenMediaObject(
                                                                                      item.url
                                                                                  );
                                                                              }
                                                                          },
                                                                  }
                                                              );
                                                          },
                                                      });
                                                  MediaHiderHiddenItems.push(
                                                      MHHitem
                                                  );
                                              }

                                              const MediaHiderButton =
                                                  ContextMenu.buildItem({
                                                      type: "text",
                                                      label: "Hide Media",
                                                      action: (e) => {
                                                          //Modal for confirming hide
                                                          BdApi.showConfirmationModal(
                                                              "Hide this media?",
                                                              `link`,
                                                              {
                                                                  confirmText:
                                                                      "Hide",
                                                                  cancelText:
                                                                      "Cancel",
                                                                  danger: true,
                                                                  onConfirm:
                                                                      () => {
                                                                          const HiddenMediaList =
                                                                              getAllHiddenMediaObjects();

                                                                          const mediaLink =
                                                                              targetUrl;
                                                                          // check if url is already in list
                                                                          if (
                                                                              !HiddenMediaList.hasOwnProperty(
                                                                                  mediaLink
                                                                              )
                                                                          ) {
                                                                              addHiddenMediaObject(
                                                                                  mediaLink
                                                                              );
                                                                              this.onHide(
                                                                                  ParentLi,
                                                                                  MessageAccessory
                                                                              );
                                                                          }
                                                                      },
                                                              }
                                                          );
                                                      },
                                                  });
                                              // Item that displays the submenu parent
                                              const MediaHiderListContextSubMenu =
                                                  ContextMenu.buildItem({
                                                      type: "submenu",
                                                      label: "Hidden Media List",
                                                      children:
                                                          MediaHiderHiddenItems,
                                                  });
                                              //pushes the created components to the menu
                                              retVal.props.children[2].props.children.push(
                                                  ContextMenu.buildItem({
                                                      type: "separator",
                                                  }),
                                                  MediaHiderButton,
                                                  MediaHiderListContextSubMenu
                                              );
                                          }
                                      );
                                  }

                                  getSettingsPanel() {
                                      return this.buildSettingsPanel().getElement();
                                  }

                                  onHide(li, MessageAccessory) {
                                      const HMelement = DOM.parseHTML(
                                          HiddenMediaHTMLexpanded,
                                          true
                                      );

                                      HMelement.appendChild(MessageAccessory);
                                      const Message = li.querySelector(
                                          "div[class*=message]"
                                      );
                                      Message.append(HMelement);
                                      if (document.readyState !== "loading") {
                                          const MHspan = Message.querySelector(
                                              "span[class*=blockedAction]"
                                          );
                                          MessageAccessory.style.display =
                                              "none";
                                          const toggleShow = function () {
                                              MessageAccessory.style.display ===
                                              "none"
                                                  ? (MessageAccessory.style.display =
                                                        "block")
                                                  : (MessageAccessory.style.display =
                                                        "none");
                                          };

                                          MHspan.addEventListener(
                                              "click",
                                              function () {
                                                  toggleShow();
                                              },
                                              false
                                          );
                                      }
                                  }

                                  onStart() {
                                      this.patchMessageContextMenu();
                                      Data.load(config.name, "HiderList");
                                      //observer
                                      this.channelObserver =
                                          new MutationObserver(
                                              this.checkCurrentChannel
                                          );
                                      //observer target
                                      const Chat =
                                          document.querySelector(
                                              "div[class*=chat]"
                                          );
                                      //observer options
                                      const options = {
                                          childList: true,
                                          subtree: true,
                                      };
                                      this.channelObserver.observe(
                                          Chat,
                                          options
                                      );
                                  }

                                  onStop() {
                                      // stop and remove everything added by the plugin
                                      this.contextMenuPatch?.();
                                      this.channelObserver.disconnect();
                                      const addedElements =
                                          document.querySelectorAll(
                                              "div#message-Block-Media"
                                          );
                                      for (const el of addedElements)
                                          el && el.remove();
                                      Patcher.unpatchAll(this.name);
                                  }
                              };
                          };
                          return plugin(Plugin, Api);
                      })(
                          __webpack_require__.g.ZeresPluginLibrary.buildPlugin(
                              config
                          )
                      );
                /*@end@*/

                /*  
                  imageToUint8array(mediaElement) {
                      const canvas = document.createElement("canvas");
                      const ElementWidth =
                          mediaElement.naturalWidth ??
                          mediaElement.width ??
                          mediaElement.style.maxWidth ??
                          mediaElement.closest("div").style.width;
                      const ElementHeight =
                          mediaElement.naturalHeight ??
                          mediaElement.height ??
                          mediaElement.style.maxHeight ??
                          mediaElement.closest("div").style.height;
                      var newElement;
                      if (mediaElement.nodeName === "VIDEO") {
                          newElement = document.createElement("video");
                      } else {
                          newElement = new Image();
                      }
                      canvas.width = ElementWidth;
                      canvas.height = ElementHeight;
                      const context = canvas.getContext("2d");
                      context.width = ElementWidth;
                      context.height = ElementHeight;
                      newElement.crossOrigin = "anonymous";
                      newElement.src = mediaElement.src;
                      newElement.width = ElementWidth;
                      newElement.height = ElementHeight;
                      newElement.style.aspectRatio =
                          mediaElement.style.aspectRatio;
                      if (newElement.nodeName === "VIDEO") {
                          newElement.poster = mediaElement.poster;
                      }
                      document.body.append(newElement);
                      Logger.info("newElement: ", newElement);
                      newElement.onload = function () {
                          context.drawImage(newElement, 0, 0);
                          const DataURL = canvas.toDataURL("image/png");
                          Logger.info("DataURL: ", DataURL);
                      };
                      const Uint8 = new Uint8Array(
                          context.getImageData(
                              0,
                              0,
                              ElementWidth,
                              ElementHeight
                          ).data.buffer
                      );
                      context.clearRect(0, 0, canvas.width, canvas.height);
                      canvas.remove();
                      newElement.remove();
                      return Uint8;
                  }
                  //TODO Pulled from the internet, does not work, fix after the step above
                  hash(filename, Uint8Array) {
                      const newArray = Array.from(Uint8Array);
                      const ArrayForHash = newArray.push(filename);
                      var hash = 0,
                          i,
                          chr;
                      if (ArrayForHash.length === 0) return hash;
                      for (i = 0; i < ArrayForHash.length; i++) {
                          chr = this.charCodeAt(i);
                          hash = (hash << 5) - hash + chr;
                          hash |= 0; // Convert to 32bit integer
                      }
                      return hash;
                  }
 */

                /***/
            },

        /***/ "?b8eb":
            /*!********************!*\
  !*** fs (ignored) ***!
  \********************/
            /***/ () => {
                /* (ignored) */
                /***/
            },

        /***/ "?8f51":
            /*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
            /***/ () => {
                /* (ignored) */
                /***/
            },

        /***/ "?569f":
            /*!********************!*\
  !*** fs (ignored) ***!
  \********************/
            /***/ () => {
                /* (ignored) */
                /***/
            },

        /***/ "?3f59":
            /*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
            /***/ () => {
                /* (ignored) */
                /***/
            },

        /***/ "?470d":
            /*!*************************!*\
  !*** request (ignored) ***!
  \*************************/
            /***/ () => {
                /* (ignored) */
                /***/
            },

        /******/
    };
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/ if (cachedModule !== undefined) {
            /******/ return cachedModule.exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = (__webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/ exports: {},
            /******/
        });
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        );
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ (() => {
        /******/ // define getter functions for harmony exports
        /******/ __webpack_require__.d = (exports, definition) => {
            /******/ for (var key in definition) {
                /******/ if (
                    __webpack_require__.o(definition, key) &&
                    !__webpack_require__.o(exports, key)
                ) {
                    /******/ Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key],
                    });
                    /******/
                }
                /******/
            }
            /******/
        };
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/global */
    /******/ (() => {
        /******/ __webpack_require__.g = (function () {
            /******/ if (typeof globalThis === "object") return globalThis;
            /******/ try {
                /******/ return this || new Function("return this")();
                /******/
            } catch (e) {
                /******/ if (typeof window === "object") return window;
                /******/
            }
            /******/
        })();
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ (() => {
        /******/ __webpack_require__.o = (obj, prop) =>
            Object.prototype.hasOwnProperty.call(obj, prop);
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ (() => {
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = (exports) => {
            /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                    value: "Module",
                });
                /******/
            }
            /******/ Object.defineProperty(exports, "__esModule", {
                value: true,
            });
            /******/
        };
        /******/
    })();
    /******/
    /************************************************************************/
    /******/
    /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module is referenced by other modules so it can't be inlined
    /******/ var __webpack_exports__ = __webpack_require__(
        "./src/MediaHiderPlugin.plugin.js"
    );
    /******/ plugin = __webpack_exports__["default"];
    /******/
    /******/
})();
//# sourceMappingURL=MediaHiderPlugin.plugin.js.map
