import { Handler, Request, Response } from "express";
import { serializeError } from "serialize-error";
import { ZodError } from "zod";

export const httpHandler = (simpleHandler: SimpleHandler): Handler => {
    return async (req, res) => {
        try {
            await simpleHandler(req, res);
        } catch (error) {
            console.log(serializeError(error));
            res.status(500).json({ error: error instanceof ZodError ? error.issues : error instanceof Error ? error.message : "unknown error" });
        }
    };
};


type SimpleHandler = (req: Request, res: Response) => Promise<void>