// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "@utils/ApiError";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err.stack);

    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
