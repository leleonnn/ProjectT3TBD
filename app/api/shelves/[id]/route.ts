import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import type { shelf } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: shelf = await request.json();
    const shelf = await prisma.shelf.update({
        where:{
            ShelfID: Number(params.id)
        },
        data:{
            ShelfID: body.ShelfID,
            CategoryName: body.CategoryName,
        }
    });
    return NextResponse.json(shelf, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const Shelf = await prisma.shelf.delete({
        where:{
            ShelfID: Number(params.id)
        }
    });
    return NextResponse.json(Shelf, {status: 200});
}