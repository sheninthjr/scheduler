"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className="flex justify-center text-white h-screen items-center">
        <div className="flex flex-col space-y-4 bg-slate-900 w-1/2 h-screen pt-20 p-4">
          <div className="flex bg-gray-950 h-10 rounded-lg p-2 w-fit">
            January 1
          </div>
          <div className="p-2">
            <div
              className={`font-medium text-lg ${
                isChecked ? "line-through text-slate-400" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mr-2"
              />
              Video Transcoder
            </div>
          </div>
          <div className="flex flex-col h-screen justify-end items-center">
            <button className="bg-blue-500 p-2 rounded-lg">
              <Link href={"/post"}>Create</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
