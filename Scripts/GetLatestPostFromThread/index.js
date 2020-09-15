"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GetPostContent_1 = tslib_1.__importDefault(require("../GetPostContent"));
const GetSearchablePage_1 = tslib_1.__importDefault(require("../GetSearchablePage"));
const Urls_1 = require("../Urls");
const getLatestPostFromThread = async (thread) => {
    const url = Urls_1.getThreadLastPostUrl(thread.threadId);
    const $ = await GetSearchablePage_1.default(url);
    const post = $(".post")
        .map((i, p) => {
        const adBot = !!$(p).find(".adbot").length;
        //if it's an adbot post, don't want it
        if (adBot)
            return;
        return p;
    })
        .toArray()
        .pop();
    return post && { ...GetPostContent_1.default({ $, post }), thread };
};
exports.default = getLatestPostFromThread;
//# sourceMappingURL=index.js.map