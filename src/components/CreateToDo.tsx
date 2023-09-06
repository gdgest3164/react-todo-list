import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { categoryState, toDoState } from "../atoms";

type IForm = {
  errors: {
    todo: {
      message: string;
    };
  };
  toDo: string;
  extraError?: string;
};

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  // const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>({ defaultValues: { toDo: "" } });

  const onSubmit = ({ toDo }: IForm) => {
    if (toDo === "asdfasdfasdf") {
      setError("toDo", { message: "이스터에그!!" }, { shouldFocus: true });
    }
    setValue("toDo", "");

    setToDos((v: any) => [{ text: toDo, id: Date.now(), category }, ...v]);
    // setError("extraError", {message:"Server offline."});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="here input"
        {...register("toDo", {
          required: "빈 값으로 등록할 수 없어!",
          minLength: { value: 5, message: "10자 이상 입력하삼." },
          pattern: {
            value: /^[A-Za-z0-9._%+-]+$/,
            message: "유효하지 못한다!",
          },
          validate: {
            noValue: (v) =>
              v.includes("testtesttest") ? "어허 안된다." : true,
          },
        })}
      />
      <button>Add</button>
      <div>{errors?.toDo?.message}</div>
    </form>
  );
}

export default CreateToDo;
