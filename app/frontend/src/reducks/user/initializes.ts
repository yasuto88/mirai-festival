import { Item, User, UserState } from "./types";

export const initialItemState: Item[] = [
  {
    item_id: 1,
    name: "勇者の剣",
    quantity: 1,
  },
  {
    item_id: 2,
    name: "魔法の杖",
    quantity: 2,
  },
];

export const initialUserState: User = {
  student_id: null,
  balance: 0,
  is_admin: false,
  items: [
    {
      item_id: 1,
      name: "勇者の剣",
      quantity: 1,
    },
    {
      item_id: 2,
      name: "魔法の杖",
      quantity: 2,
    },
  ],
};

export const initialFetchUserState: UserState = {
  user: initialUserState,
  loading: false,
  error: null,
};
