import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordRegex } from "../../constants";
import { loginUser } from "../../redux/thunks/authThunks";
import { Button } from "../index";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(passwordRegex, "Invalid password."),
});

const SignInForm = () => {
  const [isHidden, setIsHidden] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmitLogin = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();

      console.log("Login success");

      // navigates user to where they wanted to go
      // for expample to Profile page if they clicked on Profile icon
      navigate(from, { replace: true });
      reset();
    } catch (error) {
      console.log("Login failed", error);
      setError("root", { message: error.message });
    }
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
        <div className="relative">
          <input
            {...register("password")}
            type={isHidden ? "password" : "text"}
            className="w-full py-2 pl-3 pr-8 border border-neutral-500 rounded-md"
            placeholder="Password..."
          />
          <div
            onClick={() => setIsHidden((current) => !current)}
            className="absolute bottom-1/2 right-3 translate-y-1/2 cursor-pointer"
          >
            {isHidden ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </div>
        </div>

        {errors.password && (
          <p className="px-1 text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Sign in"}
      </Button>

      {errors.root && (
        <p className="self-start px-1 text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
};

export default SignInForm;
