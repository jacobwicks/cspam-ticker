"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cheerio = tslib_1.__importStar(require("cheerio"));
const cheerioLoad = (element) => {
    const $ = cheerio.load(element);
    $.exists = (selector) => $(selector)?.length > 0;
    return $;
};
exports.default = cheerioLoad;
//# sourceMappingURL=index.js.map