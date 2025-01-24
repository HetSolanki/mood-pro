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
            className="px-6 py-2 rounded-lg text-lg bg-blue-400"
            onClick={handleSubmit}
          >
            Ask
          </button>
        </div>
        <div className="mb-2 flex items-center gap-x-3">
          <NewEntryCard />
          <button
            className={`border border-white rounded-lg px-4 py-2 text-black font-semibold cursor-pointer flex justify-between items-center gap-x-3 bg-red-400`}
          >
            delete
          </button>
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
