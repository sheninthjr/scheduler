"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { trpc } from "../trpc/client";
import { useSetRecoilState } from "recoil";
import { userID } from "../store/atoms/userId";

const NavBar = () => {
  const { data: session } = useSession();
  const userSignin = trpc.user.signIn.useMutation();
  const setUserId = useSetRecoilState(userID);

  useEffect(() => {
    const updateUser = async () => {
      if (
        session &&
        session.user?.email &&
        session.user.image &&
        session.user.name
      ) {
        try {
          if (
            session &&
            session.user?.email &&
            session.user.image &&
            session.user.name
          ) {
            userSignin.mutate({
              email: session.user?.email,
              image: session.user?.image,
              name: session.user?.name,
            });
          }
        } catch (error) {
          console.error("Error during mutation:", error);
        }
      }
    };
    updateUser();
  }, [session?.user?.email,userSignin]);

  useEffect(() => {
    if (userSignin.data?.userId) {
      setUserId({ id: userSignin.data.userId });
    }
  }, [userSignin]);

  if (!session) {
    return (
      <div>
        <div className="bg-black h-16 p-4 fixed top-0 w-full z-10 shadow-md shadow-slate-700">
          <div className="flex justify-between">
            <div className="flex font-semibold text-lg">
              <a href="/">Sheninth Jr Scheduler</a>
            </div>
            <div className="flex space-x-5 justify-center items-center">
              <button
                className="flex justify-center items-center w-full h-8 bg-slate-800 pl-2 pr-2 rounded-lg"
                onClick={() => signIn()}
              >
                Sigin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-black h-16 p-4 fixed top-0 w-full z-10 shadow-md shadow-slate-700">
        <div className="flex justify-between">
          <div className="flex font-semibold text-lg">
            <a href="/">Sheninth Jr Scheduler</a>
          </div>
          <div className="flex space-x-5 justify-center items-center">
            <div className="hidden sm:block md:block lg:block xl:block text-xl font-semibold whitespace-nowrap">
              {session?.user?.name}
            </div>
            <img
              className="w-8 h-8 rounded-full"
              src={session?.user?.image || ""}
              alt="Profile"
            />
            <button
              className="flex justify-center items-center w-full h-8 bg-slate-800 pl-2 pr-2 rounded-lg"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
