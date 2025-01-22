import { analyse } from "@/utils/ai";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const { id } = await params;

  const { content } = await request.json();

  const updated = await prisma.journalEntry.update({
    where: {
      id,
    },
    data: {
      content,
    },
    include: {
      analyse: true,
    },
  });

  const result = await analyse(updated.content);

  console.log(result);
  const analyseResult = await prisma.analyse.update({
    where: {
      id_entryId: {
        id: updated.analyse[0].id,
        entryId: updated.id,
      },
    },
    data: {
      ...result,
    },
  });

  return NextResponse.json({ data: updated, analyseResult });
};
