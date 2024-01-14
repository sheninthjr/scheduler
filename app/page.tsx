"use client";
import { useState, useEffect } from "react";
import { trpc } from "./trpc/client";
import { useRecoilValue } from "recoil";
import { userID } from "./store/atoms/userId";
import Post from "./components/Post";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CheckedItems {
  [key: string]: boolean;
}
interface Data {
  _id?: string;
  title?: string;
  day?: string;
  done?: boolean;
}

export default function Home() {
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const doneStatusMutation = trpc.schedule.doneStatus.useMutation();
  const userId = useRecoilValue(userID);
  const { data, refetch } = trpc.schedule.queryPost.useQuery({
    userId: userId.id || "",
  });
  const router = useRouter()
  const { data: session } = useSession();

  useEffect(() => {
    refetch();
  }, [refetch, checkedItems]);

  const handleCheckboxChange = async (
    index: number,
    valueId: string,
    isChecked: boolean
  ) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [valueId]: isChecked,
    }));

    await doneStatusMutation.mutate({
      _id: valueId,
      done: isChecked,
    });
  };

  if(!session){
    return(
      <>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white text-black p-2 rounded-lg flex flex-col space-y-4">
          <div className="text-xl">
            Welcome to Jr Scheduler
          </div>
          <div className="text-red-600">
            *Please Click the button for Signin
          </div>
          <div className="text-white flex justify-center">
          <button
                className="flex justify-center items-center w-fit h-8 bg-slate-800 pl-2 pr-2 rounded-lg"
                onClick={() => signIn()}
              >
                Sigin
              </button>
          </div>
        </div>
      </div>
      </>
    )
  }
  const sortedData = data?.sort((a, b) => {
    const dateA = new Date(a?.day);
    const dateB = new Date(b?.day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateA.toISOString().substring(0, 10) === today.toISOString().substring(0, 10)) return -1; 
    if (dateB.toISOString().substring(0, 10) === today.toISOString().substring(0, 10)) return 1;  
    if (a.done === 'true' && b.done === 'false') return 1;
    if (a.done === 'false' && b.done === 'true') return -1;
    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return 0;
  });
  return (
    <>
      <div className="flex justify-center text-white h-screen items-center">
        <div className="flex flex-col space-y-4 w-full  md:w-1/2 lg:bg-slate-900 lg:w-1/2 xl:bg-slate-900 xl:w-1/2 h-screen pt-20 p-4 overflow-y-auto custom-scrollbar">
          {sortedData?.map((value, index) => (
            <div key={index}>
              <div className="flex bg-white text-black font-serif text-lg rounded-lg p-2 w-fit">
                {value.day}
              </div>
              <div className="p-2">
                <div
                  className={`font-medium text-lg ${
                    JSON.parse(value.done) ? "line-through text-slate-400" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={JSON.parse(value.done) || false}
                    onChange={(e) =>
                      handleCheckboxChange(index, value._id, e.target.checked)
                    }
                    className="mr-2"
                  />
                  {value.title}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Post />
      </div>
    </>
  );

}
