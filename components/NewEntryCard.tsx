"use client";

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewEntryCard = () => {
  const router = useRouter();

  const handleNewEntry = async () => {
    const entry = await createNewEntry();
    await entry.json();

    console.log(entry);
    router.refresh();
  };
  return (
    <div
      className="border border-white rounded-lg h-40 p-4 bg-black text-white cursor-pointer"
      onClick={handleNewEntry}
    >
      <h1 className="text-3xl">New Entry</h1>
    </div>
  );
};

export default NewEntryCard;
