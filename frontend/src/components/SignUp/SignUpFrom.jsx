import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import { fetchAuth } from "../../redux/slices/authSlice";
import { passwordRegex } from "../../constants";
import instance from "../../axios";

const schema = z
  .object({
    email: z.string().email("Invalid email."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(
        passwordRegex,
        "Password must contain one uppercase, one lowercase, one number and no special characters."
      ),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match.",
    path: ["password_confirmation"],
  });

const SignUpForm = () => {
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
    console.log(data);
    try {
      const response = await instance.post("/signup", {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation
      });

      // const { payload } = await dispatch(fetchAuth(data));
      //
      // if (payload.email === "test@test.com") {
      //   window.localStorage.setItem("ACCESS_TOKEN", payload.token);
      //   navigate("/");
      //   return;
      // }
    } catch (error) {
      console.log(error);
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

      <div className="w-[300px]">
        <input
          {...register("password_confirmation")}
          type="password"
          className="w-full py-2 px-3 border border-neutral-500 rounded-md"
          placeholder="Confirm password..."
        />
        {errors.password_confirmation && (
          <p className="px-1 text-red-500">{errors.password_confirmation.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className={`border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300 ${
          isSubmitting && "hover:bg-neutral-300 cursor-not-allowed"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Sign up"}
      </Button>

      {errors.root && (
        <p className="self-start px-1 text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
};

export default SignUpForm;
