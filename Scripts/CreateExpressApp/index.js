"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const app_root_path_1 = tslib_1.__importDefault(require("app-root-path"));
const createExpressApp = () => 
//instantiates express
express_1.default()
    //deal with CORS
    .use(cors_1.default())
    //@ts-ignore
    .use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
    next();
})
    //it's called a body parser because it parses bodies, avi
    .use(body_parser_1.default.urlencoded({ extended: true }))
    .use(body_parser_1.default.json())
    .use((req, res, next) => {
    //req is typed as
    //Request<ParamsDictionary, any, any, QueryString.ParsedQs>
    //it doesn't have .base property
    //@ts-ignore
    req.base = `${req.protocol}://${req.get("host")}`;
    return next();
})
    .use(express_1.default.static(app_root_path_1.default.path + "/Scripts"))
    //use the router created from the api folder
    //@ts-ignore
    .use((error, req, res, next) => {
    res.status(error.status || 500).json({ error });
});
exports.default = createExpressApp;
//# sourceMappingURL=index.js.map