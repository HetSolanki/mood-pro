"use client";

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { useState } from "react";
import plusImage from "@/public/plus.svg";
import Image from "next/image";

const NewEntryCard = () => {
  const router = useRouter();
  const [isloading, setLoading] = useState(false);

  const handleNewEntry = async () => {
    setLoading(true);
    const entry = await createNewEntry();
    setLoading(false);
    await entry.json();

    console.log(entry);
    router.refresh();
  };
  return (
    <button
      className={`border border-white rounded-lg px-4 py-2 text-black font-semibold cursor-pointer flex justify-between items-center gap-x-3 ${
        isloading ? `bg-blue-400/40` : `bg-blue-400`
      }  `}
      onClick={handleNewEntry}
    >
      {isloading && <Spinner color="text-black-400" size="size-4" />}
      <span className="hidden sm:block">New Entry</span>
      <Image
        src={plusImage}
        alt="New Entry"
        className={`sm:hidden ${isloading ? "hidden" : "block"}`}
        width={35}
        height={35}
      />
    </button>
  );
};

export default NewEntryCard;
