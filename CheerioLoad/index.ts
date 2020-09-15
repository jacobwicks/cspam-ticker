import * as cheerio from 'cheerio';

//new interface for the cheerio object lets us define some convenience features
export interface CheerioStatic2 extends CheerioStatic {
    //currentUrl lets us store the url of the current webpage
    //because cheerio doesn't let you access the location property
    currentUrl?: string;

    //exists- just a function that tells you if the element exists or not
    exists: (selector: string) => boolean;
}

const cheerioLoad = (element: string | Buffer): CheerioStatic2 => {
    const $ = cheerio.load(element) as CheerioStatic2;
    $.exists = (selector): boolean => $(selector)?.length > 0;

    return $;
};

export default cheerioLoad;
