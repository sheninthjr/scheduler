"use client";
import React, { useState } from "react";
import { trpc } from "../trpc/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Init from "../components/Init";
import { useRecoilValue } from "recoil";
import { userID } from "../store/atoms/userId";

const page = () => {
  const mutation = trpc.schedule.schedulePost.useMutation();
  const userId = useRecoilValue(userID);
  const [title, setTitle] = useState("");
  const id = userId.id
  const handlePosting = ({ title }: any) => {
    mutation.mutate({ title, userId:id || "" });
  };

  return (
    <>
      <div>
        <input
          className="text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name=""
          id=""
        />
        <button onClick={() => handlePosting({ title })}>Submit</button>
      </div>
    </>
  );
};

export default page;
