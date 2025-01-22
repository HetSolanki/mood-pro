"use client";

import { useRouter } from "next/navigation";

export const EntryCard = ({ entry }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/journal/${entry.id}`);
  };

  return (
    <div
      className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-black/90 text-white border border-white shadow-md shadow-purple-300"
      onClick={handleClick}
    >
      <div className="px-4 py-5 sm:px-6">date</div>
      <div className="px-4 py-5 sm:p-6">summary</div>
      <div className="px-4 py-4 sm:px-6">mood</div>
    </div>
  );
};
