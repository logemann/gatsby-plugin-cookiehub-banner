"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onRenderBody = void 0;

var _react = _interopRequireDefault(require("react"));

function isV2ApiEnabled(pluginOptions) {
    return pluginOptions.cookieHubV2Api !== undefined ? pluginOptions.cookieHubV2Api : false;
}

var onRenderBody = function onRenderBody(_ref, pluginOptions) {
    var setHeadComponents = _ref.setHeadComponents,
        setPostBodyComponents = _ref.setPostBodyComponents;

    if (!pluginOptions.cookieHubId) {
        return null;
    }

    var setComponents = pluginOptions.head ? setHeadComponents : setPostBodyComponents;
    var apiVersion = isV2ApiEnabled(pluginOptions) ? 'c2' : 'cc';

    var cookieHubUrl = "https://cookiehub.net/" + apiVersion + "/" + pluginOptions.cookieHubId + ".js";
    var cookieHubDemoUrl = "https://cookiehub.net/dev/" + apiVersion + "/" + pluginOptions.cookieHubId + ".js";

    var cookieNames = {};

    for (var i = 0; i < pluginOptions.categories.length; i++) {
        var category = pluginOptions.categories[i];
        cookieNames[category.categoryName] = category.cookieName;
    }

    return setComponents([
        _react.default.createElement("script", {
            key: "cookiehub-prequel",
            dangerouslySetInnerHTML: {
                __html: `
                const stageHosts = ${JSON.stringify(pluginOptions.stageHosts)};
                const stageMode = '${pluginOptions.stageMode && pluginOptions.stageHosts ? pluginOptions.stageMode : "demo"}';
                if(!stageHosts && stageMode) {
                    console.warn("gatsby-plugin-cookiehub-banner option 'stageMode' not allowed when no 'stageHosts' is given. Ignore option");
                }
                
                if((stageHosts && stageHosts.includes(window.location.hostname) && stageMode == "demo") ||
                       !stageHosts) {
 
                    const cookieHubUrl = '${cookieHubUrl}';
                    const cookieHubDemoUrl = '${cookieHubDemoUrl}';
                    var cpm = {};
                    (function(_document,_window,b){
                      var e=_document.getElementsByTagName("script")[0],element=_document.createElement("script");
                      element.async=true;
                      if(stageHosts && stageHosts.includes(window.location.hostname) && stageMode == "demo") {
                         element.src='${cookieHubDemoUrl}';
                      } else {
                        element.src='${cookieHubUrl}';
                      }
                      element.onload=function(){_window.cookiehub.load(b);}
                      e.parentNode.insertBefore(element,e);
                    })(document,window,cpm);
                }`
            }
        }),
        /*        _react.default.createElement("script", {
                        key: "gatsby-plugin-cookiehub-banner-src",
                        src: cookieHubUrl
                    }
                ),*/
        _react.default.createElement("script", {
            key: "gatsby-plugin-cookiehub-banner-script",
            dangerouslySetInnerHTML: {
                __html: `
                    if((stageHosts && stageHosts.includes(window.location.hostname) && stageMode == "demo") ||
                       !stageHosts) {
                        window.addEventListener("load", function() {
                            const cookieNames =  ${JSON.stringify(cookieNames)};
                            const handleCategoryUserInput = function(categoryName, allowed) {
                                var cookieName = cookieNames[categoryName];
                                if (cookieName === undefined) {
                                    cookieName = 'gatsby-plugin-cookiehub-banner-' + categoryName + '-allowed';
                                }
                                const cookieString = cookieName + '=' + allowed + ';path=/';
                                document.cookie = cookieString;
                            };
                            const cpm = { 
                                onInitialise: function(status) {
                                    for (var i = 0; i < status.categories.length; i++) {
                                        var category = status.categories[i];
                                        handleCategoryUserInput(category.id, category.value);
                                    }
                                },
                                onAllow: function(category) {
                                    handleCategoryUserInput(category, true);
                                },
                                onRevoke: function(category) {
                                    handleCategoryUserInput(category, false);
                                }
                            }
                            if (window.cookieconsent !== undefined) {
                                window.cookieconsent.initialise(cpm);
                            } else if (window.cookiehub !== undefined) {
                                window.cookiehub.load(cpm);
                            } else {
                                console.log("CookieHub not loaded!");
                            }
                    });
                }`
            }
        })
    ]);
};

exports.onRenderBody = onRenderBody;