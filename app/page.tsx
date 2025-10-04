import { analyse } from "@/utils/ai";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user = await auth();
  const href = user.userId ? "/journal" : "/new-user";

  const result = await analyse("Write about your day");

  console.log(result);
  return (
    <div className="h-screen sm:w-screen flex justify-center items-center bg-black">
      <div className="text-white w-full p-5 sm:py-0 sm:w-[50%]">
        <h1 className="text-3xl sm:text-5xl font-semibold mb-4">
          Write, Reflect, and Discover more
        </h1>
        <p className="text-xl sm:text-2xl text-slate-200/80 mb-4">
          Let your journaling habits reveal the emotions that shape your days
          and the insights that guide your journey.
        </p>
        <Link href={href}>
          <button className="bg-blue-500 px-4 sm:px-6 py-2 text-white font-semibold text-lg sm:text-xl rounded-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
