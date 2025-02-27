import prisma from "../database/prismaClient";
import Customer from "../model/Customer";

export async function CustomerAdd(c: Customer) {
    try {
        const newCustomer = await prisma.customer.create({
            data: {
                Name: c.Name,
                Email: c.Email,
                Phone: c.Phone,
                Password: c.Password
            }
        })
        console.log('Customer Added :', newCustomer);
        return newCustomer;
    } catch (err) {
        console.log("Error adding customer:", err);
    }
}

export async function CustomerUpdate(id: number, c: Customer) {
    try {
        const updatedCustomer = await prisma.customer.update({
            where: { CustomerId: id },
            data: {
                Name: c.Name,
                Email: c.Email,
                Phone: c.Phone,
                Password: c.Password
            }
        })
        console.log('Customer updated :', updatedCustomer);
        return updatedCustomer;
    } catch (err) {
        console.log("error updating customer", err);
    }
}

export async function CustomerDelete(id: number) {
    try {
        const deletedCustomer = await prisma.customer.delete({
            where: { CustomerId: id }
        });
        console.log('Customer deleted :', id);
        return deletedCustomer;
    } catch (err) {
        console.log("error deleting customer", err);
    }
}

export async function getAllCustomers() {
    try {
        return await prisma.customer.findMany();
    } catch (err) {
        console.log("error getting customers", err);
    }
}
