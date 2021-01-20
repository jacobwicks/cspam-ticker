//a thread that the bot monitors
export interface Thread {
  active: boolean;
  //active is true if it was bookmarked
  //the last time we got bookmarked threads from the forums page
  bookmarked: boolean;

  //human readable name
  //designated by you, the person running the bot
  //goes in the logs
  name?: string;

  //title from the forums
  //this is often changed
  title: string;

  pages: number;
}
export interface ArrayThread extends Thread {
  threadId: number;
}

export interface SAUser {
  avatar?: string;
  id: number;
  name: string;
  title?: string;
  profile: string;
  regDate: string;
}

export interface Post {
  //the name of the user that wrote the post
  author?: SAUser;

  //the body of the post, without other quoted posts inside it
  body: string;

  //the date the post was made
  date: Date;

  //the unique postId number
  id: number;

  //the img.src property
  image?: string;

  //the img.src property of all images in the post except forums smileys
  images: string[];

  //a link to the post
  link: string;
}

export interface LogPost extends Post {
  thread?: ArrayThread;
}
export type LogEvent = {
  time: string;
  text?: string;
  data: LogPost;
};
