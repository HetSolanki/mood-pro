import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export const getUserByClerkId = async () => {
  const user = await currentUser();

  const newUser = await prisma.user.findFirst({
    where: {
      clerkId: user?.id,
    },
  });

  if (!newUser) {
    await auth.protect();
  }

  return newUser;
};
