import { atom } from "recoil";

export const userDetails = atom({
  key: "userDetails",
  default: {
    email: null as string | null,
    name: null as string | null,
    image: null as string | null,
  },
});
