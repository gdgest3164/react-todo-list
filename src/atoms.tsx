import { atom, selector } from "recoil";

export enum Categorys {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export type IToDo = {
  text: string;
  id: number;
  category: Categorys;
};

export const categoryState = atom<Categorys>({
  key: "category",
  default: Categorys.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
