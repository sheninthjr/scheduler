import { atom } from "recoil";

export const userID = atom({
  key: "userID",
  default: {
    id: null as string | null,
  },
});
