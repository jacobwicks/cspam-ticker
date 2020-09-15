export const baseUrl = "https://forums.somethingawful.com";

export const getUserProfileUrl = (profile: number) =>
  `${baseUrl}/member.php?action=getinfo&userid=${profile}`;

export const getForumUrl = (forumId: number) =>
  `${baseUrl}/forumdisplay.php?forumid=${forumId}`;

export const getThreadLastPostUrl = (threadId: number) =>
  `${baseUrl}/showthread.php?threadid=${threadId}&goto=lastpost`;
