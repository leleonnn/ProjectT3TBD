import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { customer } from "@prisma/client";
const prisma = new PrismaClient();


export const POST = async (request: Request) =>{
    const body: customer = await request.json();
    const Customer = await prisma.customer.create({
        data:{
            CustomerID: body.CustomerID,
            CustomerName: body.CustomerName,
            Street: body.Street,
            City: body.City,
            State: body.State,
            Country: body.Country
        }
    });
    return NextResponse.json(Customer, {status: 201});
}