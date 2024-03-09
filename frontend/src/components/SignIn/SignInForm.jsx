import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import { fetchAuth } from "../../redux/slices/authSlice";

const schema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const { payload } = await dispatch(fetchAuth(data));

      const localToken = window.localStorage.getItem("ACCESS_TOKEN");

      if (data.email === payload.email && localToken === payload.token) {
        navigate("/");
        return;
      }

      if (payload.email === "error@test.com") {
        throw new Error();
      }

      setError("root", { message: "User not found." });
    } catch (error) {
      setError("root", { message: "Error from backend." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 f-regular"
    >
      <div className="w-[300px]">
        <input
          {...register("email")}
          className="w-full py-2 px-3 border border-neutral-500 rounded-md"
          placeholder="Email..."
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="w-[300px]">
        <input
          {...register("password")}
          type="password"
          className="w-full py-2 px-3 border border-neutral-500 rounded-md"
          placeholder="Password..."
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className={`border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300 ${
          isSubmitting && "hover:bg-neutral-300 cursor-not-allowed"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Sign in"}
      </Button>

      {errors.root && (
        <p className="self-start text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
};

export default SignInForm;
