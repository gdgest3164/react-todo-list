import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categorys, categoryState, toDoSelector, toDoState } from "../atoms";
import ToDo from "./ToDo";
import React from "react";

function ToDoList() {
  const toDo = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (e: React.FormEvent<HTMLSelectElement>) =>
    setCategory(e.currentTarget.value as any);

  return (
    <>
      <h1>ToDoList</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categorys.TO_DO}>To Do</option>
        <option value={Categorys.DOING}>Doing</option>
        <option value={Categorys.DONE}>Done</option>
      </select>
      <CreateToDo />
      <hr />
      {toDo?.map((aTodo) => (
        <ToDo key={aTodo.id} {...aTodo} />
      ))}
    </>
  );
}

export default ToDoList;
