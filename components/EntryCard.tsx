"use client";

import { useRouter } from "next/navigation";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const EntryCard = ({ entry }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/journal/${entry.id}`);
  };

  const { createdAt, mood, summary } = entry.analyse[0];
  const date = new Date(createdAt);

  const formattedDate = `${date.getDate()} - ${
    months[date.getUTCMonth()]
  } - ${date.getFullYear()}`;

  return (
    <div
      className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-black/90 text-white border border-white shadow-md shadow-purple-300"
      onClick={handleClick}
    >
      <div className="px-4 py-5 sm:px-6 text-white">
        <h1>{formattedDate}</h1>
      </div>
      <div className="px-4 py-5 sm:p-6">{summary.substring(0, 80) + "..."}</div>
      <div className="px-4 py-4 sm:px-6">{mood}</div>
    </div>
  );
};
