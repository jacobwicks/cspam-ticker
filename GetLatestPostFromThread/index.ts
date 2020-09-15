import getPostContent from "../GetPostContent";
import getSearchablePage from "../GetSearchablePage";
import { ArrayThread, LogPost } from "../types";
import { getThreadLastPostUrl } from "../Urls";

const getLatestPostFromThread = async (thread: ArrayThread) => {
  const url = getThreadLastPostUrl(thread.threadId);

  const $ = await getSearchablePage(url);
  const post = $(".post")
    .map((i, p) => {
      const adBot = !!$(p).find(".adbot").length;
      //if it's an adbot post, don't want it
      if (adBot) return;
      return p;
    })
    .toArray()
    .pop();

  return post && ({ ...getPostContent({ $, post }), thread } as LogPost);
};

export default getLatestPostFromThread;
