"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThreadLastPostUrl = exports.getForumUrl = exports.getUserProfileUrl = exports.baseUrl = void 0;
exports.baseUrl = "https://forums.somethingawful.com";
exports.getUserProfileUrl = (profile) => `${exports.baseUrl}/member.php?action=getinfo&userid=${profile}`;
exports.getForumUrl = (forumId) => `${exports.baseUrl}/forumdisplay.php?forumid=${forumId}`;
exports.getThreadLastPostUrl = (threadId) => `${exports.baseUrl}/showthread.php?threadid=${threadId}&goto=lastpost`;
//# sourceMappingURL=index.js.map