import { sendLogEvent } from "./Events";
import getFirstNotStickiedThread from "./GetFirstNotStickiedThread";
import getLatestPostFromThread from "./GetLatestPostFromThread";
import { getForumUrl } from "./Urls";

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

let currentPostId: number;

const getLatestPost = async () => {
  const forumUrl = getForumUrl(forumIds[forum]);
  const thread = await getFirstNotStickiedThread(forumUrl);
  console.log(thread);
  const post = await getLatestPostFromThread(thread);
  console.log(post);

  return post;
};

const sendLatestPostToTicker = async () => {
  const post = await getLatestPost();
  if (post) {
    if (currentPostId === post.id) {
      console.log("no new post");
    } else {
      currentPostId = post.id;
      sendLogEvent(post);
    }
  }
};

export const runAtInterval = () => {
  sendLatestPostToTicker();
  setTimeout(() => runAtInterval(), 15000);
};
