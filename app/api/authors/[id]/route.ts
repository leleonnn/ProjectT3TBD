import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { author } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: author = await request.json();
    
    const author = await prisma.author.update({
        where:{
            AuthorID: Number(params.id)
        },
        data:{
            AuthorID: body.AuthorID,
            AuthorName: body.AuthorName,
            YearBorn: body.YearBorn,
            YearDied: body.YearDied,
        }
    });
    return NextResponse.json(author, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const Author = await prisma.author.delete({
        where:{
            AuthorID: Number(params.id)
        }
    });
    return NextResponse.json(Author, {status: 200});
}