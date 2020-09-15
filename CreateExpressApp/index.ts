import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import appRoot from "app-root-path";

const createExpressApp = () =>
  //instantiates express
  express()
    //deal with CORS
    .use(cors())
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
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())

    .use((req: Request, res: Response, next: NextFunction) => {
      //req is typed as
      //Request<ParamsDictionary, any, any, QueryString.ParsedQs>
      //it doesn't have .base property
      //@ts-ignore
      req.base = `${req.protocol}://${req.get("host")}`;
      return next();
    })
    .use(express.static(appRoot.path + "/Scripts"))
    //use the router created from the api folder
    //@ts-ignore
    .use((error, req, res, next) => {
      res.status(error.status || 500).json({ error });
    });

export default createExpressApp;
