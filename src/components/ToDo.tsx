import React from "react";
import { Categorys, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setTodo = useSetRecoilState(toDoState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;

    setTodo((v) => {
      const targetIndex = v.findIndex((toDo) => toDo.id === id);
      const newTodo = { text, id, category: name as any };
      return [...v.slice(0, targetIndex), newTodo, ...v.slice(targetIndex + 1)];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categorys.DOING && (
        <button name={Categorys.DOING} onClick={onClick}>
          DOING
        </button>
      )}

      {category !== Categorys.TO_DO && (
        <button name={Categorys.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}

      {category !== Categorys.DONE && (
        <button name={Categorys.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
