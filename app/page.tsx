"use client";
import { useState, useEffect } from "react"; // Import useEffect
import { trpc } from "./trpc/client";
import { useRecoilValue } from "recoil";
import { userID } from "./store/atoms/userId";
import Post from "./components/Post";

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

  return (
    <>
      <div className="flex justify-center text-white h-screen items-center">
        <div className="flex flex-col space-y-4 bg-slate-900 w-1/2 h-screen pt-20 p-4 overflow-y-auto custom-scrollbar">
          {data?.map((value, index) => (
            <div key={index}>
              <div className="flex bg-gray-950 h-10 rounded-lg p-2 w-fit">
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
