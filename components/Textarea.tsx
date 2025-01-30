"use client";

import { useState } from "react";
import Spinner from "./Spinner";
import { Autosave } from "react-autosave";
import { updateEntry } from "@/utils/api";

const Textarea = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analyse, setAnalyse] = useState(entry.analyse[0]);

  const { subject, mood, negative, summary, color } = analyse;

  const analysis = [
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
    { name: "Summary", value: summary },
  ];

  Autosave({
    data: value,
    onSave: async (_value) => {
      const obj = {
        id: entry.id,
        content: _value,
      };

      setIsLoading(true);
      const { data, analyseResult } = await updateEntry(obj);
      setIsLoading(false);

      setValue(data.content);
      setAnalyse(analyseResult);
    },
  });
  return (
    <div className="h-full sm:h-[calc(100vh-10vh)] w-full flex flex-col-reverse sm:flex-row">
      <div className="w-full sm:w-[70%] border border-t-black border-dashed sm:border-0">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-screen w-full text-lg sm:text-xl p-4 sm:p-6 outline-none"
        />
      </div>
      <aside className="w-full sm:w-[30%] border-l border-black/10">
        <h2
          className={`text-3xl font-semibold py-8 px-4 flex justify-between items-center`}
          style={{ backgroundColor: `${color}` }}
        >
          Analysis
          {isLoading && <Spinner color="text-black" size="size-6" />}
        </h2>
        <div className="p-2 sm:p-4">
          <table className="w-full">
            <tbody>
              {analysis.map((item) => (
                <tr
                  key={item.name}
                  className="flex justify-between items-start py-2"
                >
                  <td className="w-[25%]">
                    <span className="text-lg font-semibold">{item.name}</span>
                  </td>
                  <td className="text-justify w-[72%] sm:w-[74%]">
                    <span className="">{item.value}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  );
};

export default Textarea;
