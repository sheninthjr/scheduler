"use client";
import Link from "next/link";
import React from "react";

const Post = () => {
  return (
    <>
      <div className="flex bottom-0 justify-end items-end pb-8 fixed">
        <button className="bg-blue-500 p-2 rounded-lg">
          <Link href={"/post"}>Create</Link>
        </button>
      </div>
    </>
  );
};

export default Post;
