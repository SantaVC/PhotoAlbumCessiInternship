import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { changePassword } from "../../redux/thunks/userThunks";
import { passwordRegex } from "../../constants";
import { Button } from "../index";

const schema = z
  .object({
    oldPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(passwordRegex, "Invalid password."),
    newPassword_confirmation: z.string(),
  })
  .refine((data) => data.newPassword === data.newPassword_confirmation, {
    message: "Passwords must match.",
    path: ["newPassword_confirmation"],
  });

const ChangePasswordForm = ({ setIsOpen }) => {
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
  const [isConfirmHidden, setIsConfirmHidden] = useState(true);

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
      await dispatch(changePassword(data)).unwrap();

      reset();

      setIsOpen(false);
    } catch (error) {
      setError("root", { message: error.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 f-regular"
    >
      <div className="w-[300px]">
        <input
          {...register("oldPassword")}
          type="password"
          className="w-full py-2 pl-3 pr-8 border border-neutral-500 rounded-md"
          placeholder="Old Password..."
        />

        {errors.oldPassword && (
          <p className="px-1 text-red-500">{errors.oldPassword.message}</p>
        )}
      </div>

      <div className="w-[300px]">
        <div className="relative">
          <input
            {...register("newPassword")}
            type={isNewPasswordHidden ? "password" : "text"}
            className="w-full py-2 pl-3 pr-8 border border-neutral-500 rounded-md"
            placeholder="New Password..."
          />
          <div
            onClick={() => setIsNewPasswordHidden((current) => !current)}
            className="absolute bottom-1/2 right-3 p-1 translate-y-1/2 cursor-pointer"
          >
            {isNewPasswordHidden ? (
              <FaEyeSlash size={18} />
            ) : (
              <FaEye size={18} />
            )}
          </div>
        </div>

        {errors.newPassword && (
          <p className="px-1 text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="w-[300px]">
        <div className="relative">
          <input
            {...register("newPassword_confirmation")}
            type={isConfirmHidden ? "password" : "text"}
            className="w-full py-2 pl-3 pr-8 border border-neutral-500 rounded-md"
            placeholder="Confirm Password..."
          />
          <div
            onClick={() => setIsConfirmHidden((current) => !current)}
            className="absolute bottom-1/2 right-3 p-1 translate-y-1/2 cursor-pointer"
          >
            {isConfirmHidden ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </div>
        </div>

        {errors.newPassword_confirmation && (
          <p className="px-1 text-red-500">
            {errors.newPassword_confirmation.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-5 mt-8">
        <Button type="submit" primary disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Submit"}
        </Button>

        <Button primary onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>

      {errors.root && (
        <p className="self-start px-1 text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
};

export default ChangePasswordForm;
