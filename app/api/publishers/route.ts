import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { publisher } from "@prisma/client";
const prisma = new PrismaClient();


export const POST = async (request: Request) =>{
    const body: publisher = await request.json();
    const Publisher = await prisma.publisher.create({
        data:{
            PublisherID: body.PublisherID,
            PublisherName: body.PublisherName,
            City: body.City,
            Country: body.Country,
            Telephone: body.Telephone,
            YearFounded: body.YearFounded,
        }
    });
    return NextResponse.json(Publisher, {status: 201});
}