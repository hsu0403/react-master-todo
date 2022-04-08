import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    const newData = { text: toDo, category, id: Date.now() };
    setToDos((oldToDos) => [newData, ...oldToDos]);
    setValue("toDo", "");
    localStorage.setItem("toDos", JSON.stringify([newData, ...toDos]));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", { required: "Please Write a To Do" })}
        placeholder="Write a to do"
      ></input>
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
