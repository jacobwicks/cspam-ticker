"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAtInterval = void 0;
const tslib_1 = require("tslib");
const Events_1 = require("./Events");
const GetFirstNotStickiedThread_1 = tslib_1.__importDefault(require("./GetFirstNotStickiedThread"));
const GetLatestPostFromThread_1 = tslib_1.__importDefault(require("./GetLatestPostFromThread"));
const Urls_1 = require("./Urls");
// a javascript app
// given a forum id
// it scrapes the forum for the latest post from the first non - stickied thread
// every 15 seconds
// it runs the text of the post across the screen
// looks like an old stock ticker
//questions
//how to deal with image posts
//how to deal with twitter embeds
//how to deal with the same post again
//keep a reference to the current postId
//if the postId is the same, then don't send the event
//the front end should just re-scroll the current event until it receives a new event
const forumIds = {
    cspam: 269,
    gbs: 273,
};
const forum = "cspam";
let currentPostId;
const getLatestPost = async () => {
    const forumUrl = Urls_1.getForumUrl(forumIds[forum]);
    const thread = await GetFirstNotStickiedThread_1.default(forumUrl);
    console.log(thread);
    const post = await GetLatestPostFromThread_1.default(thread);
    console.log(post);
    return post;
};
const sendLatestPostToTicker = async () => {
    const post = await getLatestPost();
    if (post) {
        if (currentPostId === post.id) {
            console.log("no new post");
        }
        else {
            currentPostId = post.id;
            Events_1.sendLogEvent(post);
        }
    }
};
exports.runAtInterval = () => {
    sendLatestPostToTicker();
    setTimeout(() => exports.runAtInterval(), 15000);
};
//# sourceMappingURL=index.js.map