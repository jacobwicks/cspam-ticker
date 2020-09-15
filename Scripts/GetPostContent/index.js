"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Urls_1 = require("../Urls");
const IsSmiley_1 = require("../IsSmiley");
const getPostContent = ({ $, post, }) => {
    const username = $(post).find(".author").text();
    const userId = Number($(post).find(".userinfo").attr("class")?.split(" ")?.[1]?.slice(7));
    const profile = Urls_1.getUserProfileUrl(userId);
    const regDate = $(post).find(".registered").text();
    //the avatar of the user that wrote the post
    const avatar = $($(post).find(".title").find("img")[0]).attr("src");
    //custom title text of the user that wrote the post
    const title = $(post).find(".title").text()?.trim();
    //the author object, type: SAUser
    const author = {
        avatar,
        id: userId,
        name: username,
        profile,
        regDate,
        title,
    };
    //the date the post was submittedAt
    //we consider this unique, and track posts by it.
    //it might not be unique,
    //could cause problems if/when we actually start tracking per-post interactions
    //threadId && submittedAt would be unique
    const date = new Date($(post).find(".postdate").text().trim());
    const body = $(post)
        .find(".postbody")
        .contents()
        .filter(function () {
        //return only textnodes
        //we only want waht the user posted, not quotes from other users
        //or embeds or something
        //@ts-ignore
        return this.nodeType == 3;
    })
        .text()
        .trim();
    //get all images
    const images = $(post)
        .find(".postbody")
        .find("img")
        //cheerio map is different from javascript, index goes first
        .map((i, img) => $(img).attr("src"))
        //typescript doesn't recognize the type of img element
        //nor that toArray returns whetever you put in the array instead of CheerioElement
        .toArray()
        //filter out the smileys
        .filter((img) => !IsSmiley_1.isSmiley(img));
    //the first image in a post
    const image = images[0];
    //the postId
    const id = Number($(post).attr("id")?.slice(4));
    //the current url will have threadId#lastpost#postid
    //#lastpost will mess up the linking cause it overrides postId
    let currentUrl = $.currentUrl
        ?.split("#")
        .filter((el) => el !== "lastpost")
        .join("#");
    //use the querySelector
    //find the link to post element on each post
    //and, if it exists, return the link href
    const link = `${currentUrl}${$(post)
        .find('[title="Link to this post"]')
        .attr("href")}`;
    return {
        author,
        body,
        date,
        id,
        image,
        images,
        link,
    };
};
exports.default = getPostContent;
//# sourceMappingURL=index.js.map