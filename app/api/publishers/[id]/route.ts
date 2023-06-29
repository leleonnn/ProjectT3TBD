import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { publisher } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: publisher = await request.json();
    const publisher = await prisma.publisher.update({
        where:{
            PublisherID: Number(params.id)
        },
        data:{
            PublisherID: body.PublisherID,
            PublisherName: body.PublisherName,
            City: body.City,
            Country: body.Country,
            Telephone: body.Telephone,
            YearFounded: body.YearFounded,
        }
    });
    return NextResponse.json(publisher, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const Publisher = await prisma.publisher.delete({
        where:{
            PublisherID: Number(params.id)
        }
    });
    return NextResponse.json(Publisher, {status: 200});
}