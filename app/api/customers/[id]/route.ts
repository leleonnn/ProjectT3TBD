import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { customer } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: customer = await request.json();
    const customer = await prisma.customer.update({
        where:{
            CustomerID: Number(params.id)
        },
        data:{
            CustomerID: body.CustomerID,
            CustomerName: body.CustomerName,
            Street: body.Street,
            City: body.City,
            State: body.State,
            Country: body.Country,
        }
    });
    return NextResponse.json(customer, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const Customer = await prisma.customer.delete({
        where:{
            CustomerID: Number(params.id)
        }
    });
    return NextResponse.json(Customer, {status: 200});
}