//ok, so, the smilies are stored in a lot of places
//I think most are in url type 1 or 2
//smiley url type 1  'https://fi.somethingawful.com/safs/smilies/1/8/same.001.gif'
//smiley url type 2  'https://fi.somethingawful.com/images/smilies/confused.gif';
//but then here's :whitewater:
//https://i.somethingawful.com/u/garbageday/2013/avatars/whitewater.gif
//maybe come back and figure all these out, but then again... maybe not
const smiley = "https://fi.somethingawful.com/safs/smilies";
const smiley2 = "https://fi.somethingawful.com/images/smilies";

export const isSmiley = (img: string) =>
  img.slice(0, smiley.length) === smiley ||
  img.slice(0, smiley2.length) === smiley2;
