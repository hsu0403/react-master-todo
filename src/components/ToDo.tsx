import React from "react";
import { useRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    const targetIndex = toDos.findIndex((toDo) => toDo.id === id);
    if (Categories.DELETE === name) {
      const newData = [
        ...toDos.slice(0, targetIndex),
        ...toDos.slice(targetIndex + 1),
      ];
      setToDos(newData);
      localStorage.setItem("toDos", JSON.stringify(newData));
    } else {
      const newToDo = { text, id, category: name as any };
      const currentData = [
        ...toDos.slice(0, targetIndex),
        newToDo,
        ...toDos.slice(targetIndex + 1),
      ];
      setToDos(currentData);
      localStorage.setItem("toDos", JSON.stringify(currentData));
    }
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button name={Categories.DELETE} onClick={onClick}>
        ❌
      </button>
    </li>
  );
}

export default ToDo;
