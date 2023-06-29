import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { shelf } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    const body: shelf = await request.json();
    const Shelf = await prisma.shelf.create({
        data:{
            ShelfID: body.ShelfID,
            CategoryName: body.CategoryName,
        }
    });
    return NextResponse.json(Shelf, {status: 201});
}