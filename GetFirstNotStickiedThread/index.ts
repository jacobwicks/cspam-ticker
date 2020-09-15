import { baseUrl } from "../Urls";
import { ArrayThread } from "../types";
import getSearchablePage from "../GetSearchablePage";

// const getFirstNotStickiedThread = async () => {
//   const forumId = forumIds[forum];
//   const threads = await getNotStickiedThreadsFromForumId(forumId);
//   const firstNotStickyThread = threads.find((thread) => isNotSticky(thread));
//   const { threadId } = firstNotStickyThread;
//   return threadId;
// };

const getFirstNotStickiedThread = async (url: string): Promise<ArrayThread> => {
  const $ = await getSearchablePage(url);

  const threads = ($(".thread")
    .map((i, thread) => {
      const sticky = !!$(thread).find(".title_sticky").length;
      //if it's a sticky thread, don't want it
      if (sticky) return;

      const titleElement = $(thread).find(".thread_title");
      const title = $(titleElement).text();

      const link = `${baseUrl}/${$(titleElement).attr("href")}`;

      const threadId = Number(titleElement.attr("href")?.split("=")[1]);

      //sometimes announcements or ads are put in the bookmark list
      //these aren't threads, don't have a threadId
      //so don't put them in the thread array!
      if (isNaN(threadId)) return;

      const pageNumbers = $(thread).find(".pagenumber");
      const pages = Number(
        $(pageNumbers[pageNumbers.length - 1])
          .text()
          .toLowerCase() === "last post"
          ? $(pageNumbers[pageNumbers.length - 2]).text()
          : $(pageNumbers[pageNumbers.length - 1]).text()
      );

      const unreadPosts = $(thread).find(".count")
        ? Number($(thread).find(".count").text())
        : 0;

      return {
        title,
        threadId,
        link,
        pages,
        unreadPosts,
      };
    })
    .toArray() as any) as ArrayThread[];

  return threads[0];
};

export default getFirstNotStickiedThread;
