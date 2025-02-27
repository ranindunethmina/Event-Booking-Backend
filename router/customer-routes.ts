// import express from "express";
// import * as CustomerAuthController from "../controllers/customer.controller"
// import {refreshToken} from "../controllers/util/token.controller";
// import {authenticateUser, authorizeAdmin} from "../middleware/auth.middleware";
//
//
// const router = express.Router();
//
//
// router.post('/customerRegister',CustomerAuthController.registerCustomer);
// router.post("/customerLogin", CustomerAuthController.customerLogin);
// router.post("/refresh-token",refreshToken);
//
// router.get("/",authenticateUser,authorizeAdmin,CustomerAuthController.getAllCustomer);
// router.get("/:customerId",authenticateUser,authorizeAdmin,CustomerAuthController.getCustomerById);
// router.put("/:customerId",authenticateUser,authorizeAdmin,CustomerAuthController.updateCustomer);
// router.delete("/:customerId",authenticateUser,authorizeAdmin,CustomerAuthController.deleteCustomer);
//
// export default router;

import express from "express";
import Customer from "../model/Customer";
import { CustomerAdd, CustomerDelete, CustomerUpdate, getAllCustomers } from "../services/customer-service";

const router = express.Router();

router.post("/add", async (req, res) => {
    const customer: Customer = req.body;
    try {
        const addedCustomer = await CustomerAdd(customer);
        res.status(201).json(addedCustomer);
    } catch (err) {
        console.log("error adding customer", err);
        res.status(500).send("error adding customer");
    }
})

router.put("/update/:id", async (req, res) => {
    const id: number = parseInt(req.params.id);
    const customer: Customer = req.body;

    try {
        const updatedCustomer = await CustomerUpdate(id, customer);
        res.status(200).json(updatedCustomer);
    } catch (err) {
        console.log("error updating customer", err);
        res.status(400).send("error updating customer");
    }
})

router.delete("/delete/:id", async (req, res) => {
    const id: number = parseInt(req.params.id);
    try {
        const deletedCustomer = await CustomerDelete(id);
        res.status(200).json(deletedCustomer);
    } catch (err) {
        console.log("error deleting customer", err);
        res.status(400).send("error deleting customer");
    }
})

router.get("/view", async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.status(200).json(customers);
    } catch (err) {
        console.log("error getting customers", err);
        res.status(400).send("error getting customers");
    }
})

export default router;
