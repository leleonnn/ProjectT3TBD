import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { book } from "@prisma/client";
const prisma = new PrismaClient();


export const POST = async (request: Request) =>{
    const body: book = await request.json();
    const Book = await prisma.book.create({
        data:{
            BookID: body.BookID,
            BookName: body.BookName,
            PublicationYear: body.PublicationYear,
            Pages: body.Pages
        }
    });
    return NextResponse.json(Book, {status: 201});
}