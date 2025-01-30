"use client";

import { qa } from "@/utils/ai";
import { useState } from "react";
import NewEntryCard from "./NewEntryCard";

const Question = ({ entries }) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await qa(value, entries);
    setResult(result);
    setIsLoading(false);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask an question"
            className="border border-black py-2 mr-2 rounded-lg px-2 outline-blue-400"
          />
          <button
            className="px-4 sm:px-6 py-1 sm:py-2 rounded-lg text-base mt-2 sm:mt-0 sm:text-lg bg-blue-400"
            onClick={handleSubmit}
          >
            Ask
          </button>
        </div>
        <div className="mb-2">
          <NewEntryCard />
        </div>
      </div>
      <div>
        {isLoading && <div>...Loading</div>}
        {result}
      </div>
    </div>
  );
};

export default Question;
