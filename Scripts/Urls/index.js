"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThreadLastPostUrl = exports.getForumUrl = exports.getUserProfileUrl = exports.baseUrl = void 0;
exports.baseUrl = "https://forums.somethingawful.com";
const getUserProfileUrl = (profile) => `${exports.baseUrl}/member.php?action=getinfo&userid=${profile}`;
exports.getUserProfileUrl = getUserProfileUrl;
const getForumUrl = (forumId) => `${exports.baseUrl}/forumdisplay.php?forumid=${forumId}`;
exports.getForumUrl = getForumUrl;
const getThreadLastPostUrl = (threadId) => `${exports.baseUrl}/showthread.php?threadid=${threadId}&goto=lastpost`;
exports.getThreadLastPostUrl = getThreadLastPostUrl;
//# sourceMappingURL=index.js.map