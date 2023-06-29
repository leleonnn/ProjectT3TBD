import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { truck } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    const body: truck = await request.json();
    const Truck = await prisma.truck.create({
        data:{
            TruckID: body.TruckID,
            DriverName: body.DriverName,
        }
    });
    return NextResponse.json(Truck, {status: 201});
}