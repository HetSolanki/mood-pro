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

  const getTextColor = (bgColor) => {
    // Convert hex color to RGB
    const rgb = parseInt(bgColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return white for dark backgrounds and black for light backgrounds
    return luminance > 0.5 ? "black" : "white";
  };

  const handleClick = () => {
    router.push(`/journal/${entry.id}`);
  };

  const handleCheck = () => {
      
  };

  const { createdAt, mood, summary, color } = entry.analyse[0];
  const textColor = getTextColor(color);
  const date = new Date(createdAt);

  const formattedDate = `${date.getDate()} - ${
    months[date.getUTCMonth()]
  } - ${date.getFullYear()}`;

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg text-black border border-black/10 shadow-md shadow-purple-300">
      <div
        className="px-4 py-5 sm:px-6 bg-opacity-15 flex justify-between items-center"
        style={{ backgroundColor: `${color}`, color: `${textColor}` }}
      >
        <h1>{formattedDate}</h1>
        <input
          type="checkbox"
          name="delete"
          id="delete"
          onChange={() => handleCheck()}
        />
      </div>
      <div onClick={handleClick}>
        <div className="px-4 py-5 sm:p-6 border-b-2 border-black/10 border-dashed">
          {summary.substring(0, 80) + "..."}
        </div>
        <div className="px-4 py-4 sm:px-6">{mood}</div>
      </div>
    </div>
  );
};
