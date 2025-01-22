import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewUser = async () => {
  const user = await currentUser();

  await prisma.user.create({
    data: {
      email: user?.emailAddresses[0].emailAddress as string,
      clerkId: user?.id as string,
    },
  });

  redirect("/journal");
};

export default NewUser;
