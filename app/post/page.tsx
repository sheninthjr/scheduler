"use client";
import React, { useState } from "react";
import { trpc } from "../trpc/client";

const page = () => {
  const mutation = trpc.schedulePost.useMutation();
  const [ title,setTitle ] = useState('')
  const handlePosting = ({title}:any)=>{
    const data = title
    mutation.mutate({ title })
  }
  return <>
  <div>
    <input className="text-black" value={title} onChange={(e)=> setTitle(e.target.value)} type="text" name="" id="" />
    <button onClick={()=>handlePosting({title})}>Submit</button>

  </div>
  </>;
};

export default page;
