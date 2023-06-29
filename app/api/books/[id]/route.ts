import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { book } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: book = await request.json();
    const book = await prisma.book.update({
        where:{
            BookID: Number(params.id)
        },
        data:{
            BookID: body.BookID,
            BookName: body.BookName,
            PublicationYear: body.PublicationYear,
            Pages: body.Pages,
        }
    });
    return NextResponse.json(book, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const Book = await prisma.book.delete({
        where:{
            BookID: Number(params.id)
        }
    });
    return NextResponse.json(Book, {status: 200});
}