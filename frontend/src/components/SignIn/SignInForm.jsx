import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import { userLogin } from "../../redux/slices/userSlice";
import { passwordRegex } from "../../constants";

const schema = z.object({
  email: z.string().email("Invalid email."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(passwordRegex, "Invalid password."),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user, error, loading } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmitLogin = async (data) => {
    await dispatch(userLogin(data));

    if (!user) {
      if (error) {
        setError("root", { message: error });
        return;
      }
    }

    navigate("/");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitLogin)}
      className="flex flex-col items-center gap-4 f-regular"
    >
      <div className="w-[300px]">
        <input
          {...register("email")}
          className="w-full py-2 px-3 border border-neutral-500 rounded-md"
          placeholder="Email..."
        />
        {errors.email && (
          <p className="px-1 text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="w-[300px]">
        <input
          {...register("password")}
          type="password"
          className="w-full py-2 px-3 border border-neutral-500 rounded-md"
          placeholder="Password..."
        />
        {errors.password && (
          <p className="px-1 text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className={`border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300 ${
          isSubmitting && "hover:bg-neutral-300 cursor-not-allowed"
        }`}
        disabled={isSubmitting}
      >
        {loading ? "Loading..." : "Sign in"}
      </Button>

      {errors.root && (
        <p className="self-start px-1 text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
};

export default SignInForm;
