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
} = require("../crudApi");

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
              this.savedData = new Set(Data.load(config.name, "HiderList"));
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
                                                      url = imageMedia.href;
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
                                                  // only triggers if url is mutated by the previous block
                                                  if (url !== undefined) {
                                                      createCacheEntry(url);
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
                          (retVal, props) => {
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
                                          targetUrl = imageMedia.href;
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
                              //END OF AUTISM

                              const hasHref = !!props.target.href;
                              const hasAttachments =
                                  props.message.attachments.length !== 0;
                              const mAttachments = props.message.attachments;

                              const hasEmbeds =
                                  props.message.embeds.length !== 0;
                              if (!hasHref && !hasAttachments && !hasEmbeds) {
                                  return;
                              }
                              const HiddenMediaList =
                                  getAllHiddenMediaObjects();
                              //populates submenu with items from store
                              const MediaHiderHiddenItems = [];
                              for (var i = 0; HiddenMediaList.length > i; i++) {
                                  const item = HiddenMediaList[i];
                                  const MediaFileName = item.url.slice(
                                      item.url.lastIndexOf("/") + 1,
                                      item.url.length
                                  );

                                  const label = item.url;
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
                                                              item.url
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
                                      //Modal for confirming hide
                                      BdApi.showConfirmationModal(
                                          "Hide this media?",
                                          `link`,
                                          {
                                              confirmText: "Hide",
                                              cancelText: "Cancel",
                                              danger: true,
                                              onConfirm: () => {
                                                  const HiddenMediaList =
                                                      getAllHiddenMediaObjects();

                                                  const mediaLink = targetUrl;
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
                      Data.load(config.name, "HiderList");
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
