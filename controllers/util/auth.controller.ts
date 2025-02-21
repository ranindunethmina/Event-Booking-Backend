import dotenv from 'dotenv';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {generateAccessToken} from "./token.controller";
import Admin from "../../model/Admin";
import {createAdminUser, verifyAdminCredentials} from "../../database/admin-client";

dotenv.config();

export const registerAdmin = async (req: Request, res: Response): Promise<any> => {
    const { username, email, password, phone, role } = req.body;

    const admin: Admin = { username, email, password, phone, role };

    try {
        let registration = await verifyAdminCredentials(admin.email);

        if (registration != null) {
            return res.status(401).json({ message: 'User already exists' });
        }

        admin.password = await bcrypt.hash(admin.password, 10);

        // Create new admin
        const newAdmin = await createAdminUser(admin);

        return res.status(201).json({
            message: 'Admin registered successfully',
            admin: newAdmin,
        });

    } catch (err) {
        console.error("Error in registerAdmin:", err);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: err,
        });
    }
};


export const adminLogin = async (req: Request, res: Response): Promise<any> => {
    const {email , password} = req.body

    try {

        let isAdmin = await verifyAdminCredentials(email);
        if (!isAdmin) {
            return res
                .status(400)
                .json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, isAdmin.password)

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(isAdmin.adminId,isAdmin.name,isAdmin.email, isAdmin.role,isAdmin.phone);
        return res.status(200).json({
            userId: isAdmin.adminId,
            name: isAdmin.name,
            email: isAdmin.email,
            role: isAdmin.role,
            token: accessToken,

        });

    }catch (err){
        return res.status(500).json({ message: "Internal Server Error" });
    }
}