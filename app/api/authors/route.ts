import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { author } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    const body: author = await request.json();
    const Author = await prisma.author.create({
        data:{
            AuthorID: body.AuthorID,
            AuthorName: body.AuthorName,
            YearBorn: body.YearBorn,
            YearDied: body.YearDied
        }
    });
    return NextResponse.json(Author, {status: 201});
}