import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv, {config} from "dotenv";

dotenv.config();

export enum UserRole {
    ADMIN = "ADMIN",
    ADMINISTRATIVE = "ADMINISTRATIVE",
    CUSTOMER = "CUSTOMER"
}

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.ADMINISTRATIVE) {
        res.status(403).json({ message: "Access denied, admin privileges required." });
    }
    next();
};

export const authorizeCustomer = (req: Request, res: Response, next: NextFunction) :void=> {
    if (!req.user || req.user.role !== "CUSTOMER") {
        res.status(403).json({ message: "Access Denied: Customers only" });
    }
    next();
};

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    let token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    token = token.replace("Bearer ", "");

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};