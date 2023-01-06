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
    
    // Offer to self-install for 🤡 users that try to run this directly.
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
//TODO reduce amount of nesting

var API_URL = "http://localhost:4000";
/**
 * Fetches from provided url and returns as JSON.
 * A fetch wrapper with error handling.
 */
const doRequest = async (url, params) => {
    if (typeof params.body !== "undefined" && typeof params.body !== "string") {
        params.body = JSON.stringify(params.body);
    }

    const response = await fetch(API_URL + url, params);

    if (response.status !== 200) {
        throw new Error(
            `Request failed with status ${response.status}: ${response.statusText}`
        );
    }

    return await response.json();
};

var makeLog = function (name) {
    return {
        log: function (message) {
            return console.log("[".concat(name.toUpperCase(), "]"), message);
        },
        debug: function (message) {
            return console.debug("[".concat(name.toUpperCase(), "]"), message);
        },
        error: function (message) {
            return console.error("[".concat(name.toUpperCase(), "]"), message);
        },
    };
};

var { log, debug } = makeLog("API");

/**
 *
 * @params {string} url - URL to be checked
 * @returns {Promise<boolean>} Is media hidden
 */
const isMediaHidden = async (url) => {
    debug(`getHiddenMedia(${url})`);
    let urlEncoded = btoa(url).replace("+", "-").replace("/", "_");
    console.log("ENCODED", urlEncoded);
    const response = await fetch(API_URL + "/media/" + urlEncoded, {
        method: "GET",
    });
    return !response.ok;
};
/**
 *
 * @returns {Promise<Array>} Array of all hidden media
 */
const getAllHiddenMediaObjects = async () => {
    debug(`getAllHiddenMediaObjects()`);
    const response = await fetch(API_URL + `/media`, { method: "GET" });
    const content = await response.json();
    console.log("response is: ", content);
    return content;
};
/**
 *
 * @param {string} url - URL of media to be hidden
 * @returns {null}
 */
const addHiddenMediaObject = async (url) => {
    debug(`addHiddenMediaObject(${url})`);
    let urlEncoded = btoa(url).replace("+", "-").replace("/", "_");
    return await fetch(API_URL + "/media/" + urlEncoded, {
        body: urlEncoded,
        method: "POST",
    });
};
/**
 *
 * @param {string} url - URL of media to be unhidden
 * @returns {null}
 */
const deleteHiddenMediaObject = async (url) => {
    debug(`DeleteHashedObject(${url})`);
    let urlEncoded = btoa(url).replace("+", "-").replace("/", "_");
    await fetch(API_URL + "/media/" + urlEncoded, {
        body: urlEncoded,
        method: "Delete",
    });
    return url;
};

if (!global.ZeresPluginLibrary) {
    BdApi.showConfirmationModal(
        "Library Missing",
        `The library plugin needed for ${
            config.name ?? config.info.name
        } is missing. Please click Download Now to install it.`,
        {
            confirmText: "Download Now",
            cancelText: "Cancel",
            onConfirm: () => {
                require("request").get(
                    "https://betterdiscord.app/gh-redirect?id=9",
                    async (err, resp, body) => {
                        if (err)
                            return require("electron").shell.openExternal(
                                "https://betterdiscord.app/Download?id=9"
                            );
                        if (resp.statusCode === 302) {
                            require("request").get(
                                resp.headers.location,
                                async (error, response, content) => {
                                    if (error)
                                        return require("electron").shell.openExternal(
                                            "https://betterdiscord.app/Download?id=9"
                                        );
                                    await new Promise((r) =>
                                        require("fs").writeFile(
                                            require("path").join(
                                                BdApi.Plugins.folder,
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
                                require("fs").writeFile(
                                    require("path").join(
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

module.exports = !global.ZeresPluginLibrary
    ? Dummy
    : (([Plugin, Api]) => {
          const plugin = (Plugin, Library) => {
              const { DOM, ContextMenu, Patcher, Data } = BdApi;
              const { Logger } = Library;
              //Data.load/save for the hide list.
              //this.savedData = new Set(Data.load(config.name, "HiderList"));
              //const HMstore = Array.from(this.savedData);
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
              const stickerSelector = "span[class*=clickableSticker] img";
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
                          if (mutation.addedNodes.length !== 0) {
                              for (
                                  let i = 0;
                                  i < mutation.addedNodes.length;
                                  i++
                              ) {
                                  let addedNode = mutation.addedNodes[i];
                                  if (
                                      (addedNode.tagName === "MAIN" &&
                                          addedNode.className.includes(
                                              "chatContent"
                                          )) ||
                                      (addedNode.tagName === "LI" &&
                                          addedNode.className.includes(
                                              "messageListItem"
                                          ) &&
                                          mutation.type === "childList")
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
                                      CMLli.forEach(async (li) => {
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
                                              MessageAccessory.children
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
                                                  if (!!imageMedia) {
                                                      Logger.info(
                                                          "imageMedia: ",
                                                          imageMedia
                                                      );
                                                      url =
                                                          imageMedia.href ??
                                                          imageMedia.src;
                                                  }
                                                  if (!!sticker) {
                                                      Logger.info(
                                                          "sticker: ",
                                                          sticker
                                                      );
                                                      url = sticker.src;
                                                  }
                                                  if (!!embedMedia) {
                                                      Logger.info(
                                                          "embedMedia: ",
                                                          embedMedia
                                                      );
                                                      url = embedMedia.src;
                                                  }
                                                  if (!!embedVideo) {
                                                      Logger.info(
                                                          "embedVideo: ",
                                                          embedVideo
                                                      );
                                                      url = embedVideo.src;
                                                  }
                                                  if (!!videoMedia) {
                                                      Logger.info(
                                                          "videoMedia: ",
                                                          videoMedia
                                                      );
                                                      url = videoMedia.src;
                                                  }
                                                  Logger.info(
                                                      "Url type: ",
                                                      typeof url
                                                  );
                                                  // only triggers if url is mutated by the previous block
                                                  if (url !== undefined) {
                                                      const isHidden =
                                                          await isMediaHidden(
                                                              url
                                                          );
                                                      Logger.log(
                                                          "Is this hidden?: ",
                                                          isHidden
                                                      );
                                                      // if hidden media is detected and there is not already a MediaHiderWrapper: hides element
                                                      if (
                                                          !!isHidden &&
                                                          li.querySelector(
                                                              "div[class*=MediaHiderWrapper]"
                                                          ) === null
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
                          async (retVal, props) => {
                              // TODO Find better solution
                              const ParentLi = props.target.closest("li");
                              const MessageAccessory = ParentLi.querySelector(
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
                              if (MessageAccessory.children.length !== 0) {
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
                                              imageMedia.href ?? imageMedia.src;
                                          targetElement = imageMedia;
                                      }
                                      if (!!sticker) {
                                          Logger.info("sticker: ", sticker);
                                          targetUrl = sticker.src;
                                          targetElement = sticker;
                                      }
                                      if (!!embedMedia) {
                                          Logger.info(
                                              "embedMedia: ",
                                              embedMedia
                                          );
                                          targetUrl = embedMedia.src;
                                          targetElement = embedMedia;
                                      }
                                      if (!!embedVideo) {
                                          Logger.info(
                                              "embedVideo: ",
                                              embedMedia
                                          );
                                          targetUrl = embedVideo.src;
                                          targetElement = embedVideo;
                                      }
                                      if (!!videoMedia) {
                                          Logger.info(
                                              "videoMedia: ",
                                              videoMedia
                                          );
                                          targetUrl = videoMedia.src;
                                          targetElement = videoMedia;
                                      }
                                      // only triggers if targetUrl is mutated by the previous block
                                      if (targetUrl !== undefined) {
                                          //Logger.info("targetUrl is: ",targetUrl );
                                      }
                                  }
                              }
                              //BEGINNING OF AUTISM

                              const hasHref = !!props.target.href;
                              const hasAttachments =
                                  props.message.attachments.length !== 0;
                              const mAttachments = props.message.attachments;

                              const hasEmbeds =
                                  props.message.embeds.length !== 0;
                              if (!hasHref && !hasAttachments && !hasEmbeds) {
                                  return;
                              }
                              //TODO Breaks CSS styling if opened too close to bottom of screen
                              const HiddenMediaList =
                                  await getAllHiddenMediaObjects();
                              //populates submenu with items from store
                              const MediaHiderHiddenItems = [];
                              for (var i = 0; HiddenMediaList.length > i; i++) {
                                  const item = HiddenMediaList[i];
                                  const MediaFileName = item.originalUrl.slice(
                                      item.originalUrl.lastIndexOf("/") + 1,
                                      item.originalUrl.length
                                  );

                                  const label = item.originalUrl;
                                  // individual item/ unhider logic
                                  const MHHitem = ContextMenu.buildItem({
                                      label: MediaFileName,
                                      id: `MHHi-${i}`,
                                      closeOnClick: false,

                                      action: (e) => {
                                          // Modal for removing media from list
                                          BdApi.showConfirmationModal(
                                              "Remove this from the hide list?",
                                              `${MediaFileName}`,
                                              {
                                                  confirmText: "Unhide",
                                                  cancelText: "Cancel",
                                                  //logic for removing from hide list
                                                  onConfirm: () => {
                                                      const index =
                                                          HiddenMediaList.indexOf(
                                                              item
                                                          );

                                                      if (index > -1) {
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
                                                              item.originalUrl
                                                          );
                                                      }
                                                  },
                                              }
                                          );
                                      },
                                  });
                                  MediaHiderHiddenItems.push(MHHitem);
                              }

                              const MediaHiderButton = ContextMenu.buildItem({
                                  type: "text",
                                  label: "Hide Media",
                                  action: (e) => {
                                      const MediaFileName = targetUrl.slice(
                                          targetUrl.lastIndexOf("/") + 1,
                                          targetUrl.length
                                      );
                                      //Modal for confirming hide
                                      BdApi.showConfirmationModal(
                                          "Hide this media?",
                                          `${MediaFileName}`,
                                          {
                                              confirmText: "Hide",
                                              cancelText: "Cancel",
                                              danger: true,
                                              onConfirm: async () => {
                                                  const HiddenMediaList =
                                                      await getAllHiddenMediaObjects();
                                                  console.log(
                                                      "HiddenMediaList: ",
                                                      HiddenMediaList
                                                  );
                                                  const mediaLink = targetUrl;
                                                  // check if url is already in list
                                                  const isNotUnique =
                                                      HiddenMediaList.find(
                                                          (obj) =>
                                                              obj.url ===
                                                              mediaLink
                                                      );
                                                  console.log(
                                                      "isNotUnique: ",
                                                      isNotUnique
                                                  );
                                                  //HiddenMediaList.hasOwnProperty(mediaLink)
                                                  if (!isNotUnique) {
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
                                      children: MediaHiderHiddenItems,
                                  });
                              //pushes the created components to the menu
                              retVal.props.children[2].props.children.push(
                                  ContextMenu.buildItem({ type: "separator" }),
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
                      const Message = li.querySelector("div[class*=message]");
                      Message.append(HMelement);
                      if (document.readyState !== "loading") {
                          const MHspan = Message.querySelector(
                              "span[class*=blockedAction]"
                          );
                          MessageAccessory.style.display = "none";
                          const toggleShow = function () {
                              MessageAccessory.style.display === "none"
                                  ? (MessageAccessory.style.display = "block")
                                  : (MessageAccessory.style.display = "none");
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
                      //Data.load(config.name, "HiderList");
                      //observer
                      this.channelObserver = new MutationObserver(
                          this.checkCurrentChannel
                      );
                      //observer target
                      const Chat = document.querySelector("div[class*=chat]");
                      //observer options
                      const options = {
                          childList: true,
                          subtree: true,
                      };
                      this.channelObserver.observe(Chat, options);
                  }

                  onStop() {
                      // stop and remove everything added by the plugin
                      this.contextMenuPatch?.();
                      this.channelObserver.disconnect();
                      const addedElements = document.querySelectorAll(
                          "div#message-Block-Media"
                      );
                      for (const el of addedElements) el && el.remove();
                      Patcher.unpatchAll(this.name);
                  }
              };
          };
          return plugin(Plugin, Api);
      })(global.ZeresPluginLibrary.buildPlugin(config));
/*@end@*/
