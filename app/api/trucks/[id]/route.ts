import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { truck } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: truck = await request.json();
    const truck = await prisma.truck.update({
        where:{
            TruckID: Number(params.id)
        },
        data:{
            TruckID: body.TruckID,
            DriverName: body.DriverName,
        }
    });
    return NextResponse.json(truck, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const Truck = await prisma.truck.delete({
        where:{
            TruckID: Number(params.id)
        }
    });
    return NextResponse.json(Truck, {status: 200});
}