import { analyse } from "@/utils/ai";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user = await auth();
  const href = user.userId ? "/journal" : "/new-user";

  const result = await analyse("Write about your day");

  console.log(result);
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <div className="text-white w-[50%]">
        <h1 className="text-5xl font-semibold mb-4">
          Write, Reflect, and Discover
        </h1>
        <p className="text-2xl text-slate-200/80 mb-4">
          Let your journaling habits reveal the emotions that shape your days
          and the insights that guide your journey.
        </p>
        <Link href={href}>
          <button className="bg-blue-500 px-6 py-2 text-white font-semibold text-xl rounded-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
