"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const CheerioLoad_1 = tslib_1.__importDefault(require("../CheerioLoad"));
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const GetOptions_1 = tslib_1.__importDefault(require("../GetOptions"));
const getSearchablePage = async (url) => {
    const options = GetOptions_1.default();
    const response = await node_fetch_1.default(url, options);
    const responseHTML = await response.text();
    const responseUrl = response.url;
    const $ = CheerioLoad_1.default(responseHTML);
    //store the url of the response in the searchable page object
    //in case we need to use it
    $.currentUrl = responseUrl;
    return $;
};
exports.default = getSearchablePage;
//# sourceMappingURL=index.js.map