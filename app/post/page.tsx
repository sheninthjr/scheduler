"use client";
import React from "react";
import { trpc } from "../trpc/client";

const page = () => {
  const { data } = trpc.getTodos.useQuery();

  return <div>{data}</div>;
};

export default page;
