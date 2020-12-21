"use strict";

exports.onPreInit = function (_ref, options) {
    var reporter = _ref.reporter;

    if (!options.cookieHubId) {
        reporter.warn("The cookiehub banner plugin requires a cookieHubId.");
    }

    if (!options.stageHosts && options.stageMode) {
        reporter.warn("The cookiehub banner plugin allows stageMode only when stageHosts is given.");
    }

    if (options.stageHosts && options.stageHosts.length === 0) {
        reporter.warn("The cookiehub banner plugin doesnt allow empty array in stageHosts");
    }
};