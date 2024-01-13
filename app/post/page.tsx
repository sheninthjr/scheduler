"use client";
import React, { useState } from "react";
import { trpc } from "../trpc/client";
import { useRecoilValue } from "recoil";
import { userID } from "../store/atoms/userId";
import { redirect } from "next/navigation";

const page = () => {
  const mutation = trpc.schedule.schedulePost.useMutation();
  if(mutation.data?.id){
    redirect('/')
  }
  const userId = useRecoilValue(userID);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const id = userId.id;
  const parsedDate = new Date(day);
  const options = { month: "long", day: "numeric", year: "numeric" };
  //@ts-ignore
  const formattedDate = parsedDate.toLocaleDateString("en-US", options);
  const handlePosting = async({ title }: any) => {
    try {
      await mutation.mutate({ title, day: formattedDate, userId: id || "" });
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <>
      <div className="flex justify-center text-white h-screen items-center">
        <div className="flex flex-col space-y-4 bg-slate-900 w-1/2 h-screen pt-20 p-4">
          <div className="h-screen flex text-black flex-col space-y-4 justify-center items-center">
            <input
              className="text-black h-10 rounded-lg p-2"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name=""
              id=""
            />
            <input
              type="date"
              className="rounded-lg p-2"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <button
              className="text-white bg-green-600 p-2 rounded-lg"
              onClick={() => handlePosting({ title })}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
