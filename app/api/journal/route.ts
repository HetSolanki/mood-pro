import { analyse } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user?.id as string,
      content: "Write about your day!" as string,
    },
  });

  const result = await analyse(entry.content);

  await prisma.analyse.create({
    data: {
      entryId: entry.id,
      userId: user.id,
      ...result,
    },
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
};
