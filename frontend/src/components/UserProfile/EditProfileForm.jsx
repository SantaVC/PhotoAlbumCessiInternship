import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { genderVariants, nameRegex } from "../../constants";
import { Button } from "../index";
import { updateProfile } from "../../redux/thunks/userThunks";
import useUserAuth from "../../hooks/useUserAuth";

const schema = z
  .object({
    first_name: z
      .string()
      .max(255, "First name is too long")
      .regex(nameRegex, "First name must contain only english letters."),
    last_name: z
      .string()
      .max(255, "Last name is too long")
      .regex(nameRegex, "Last name must contain only english letters."),
    gender: z.string(),
  })
  .refine((data) => genderVariants.includes(data.gender), {
    message: "kek",
    path: ["gender"],
  });

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useUserAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await dispatch(updateProfile(data)).unwrap();
    } catch (error) {
      console.log("Update profile failed.");
      setError("root", { message: error.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 f-regular"
      noValidate
    >
      <div className="w-[300px]">
        <input
          {...register("first_name")}
          type="text"
          className="w-full py-2 px-3 border border-neutral-500 rounded-md"
          placeholder="First name..."
          defaultValue={user?.first_name}
        />
        {errors.first_name && (
          <p className="px-1 text-red-500">{errors.first_name.message}</p>
        )}
      </div>

      <div className="w-[300px]">
        <input
          {...register("last_name")}
          className="w-full py-2 px-3 border border-neutral-500 rounded-md"
          type="text"
          defaultValue={user?.last_name}
          placeholder="Last name..."
        />
        {errors.last_name && (
          <p className="px-1 text-red-500">{errors.last_name.message}</p>
        )}
      </div>

      <div className="w-[300px]">
        <select {...register("gender")} defaultValue={user?.gender || "other"}>
          {genderVariants.map((gender, index) => (
            <option value={gender} key={index}>
              {gender}
            </option>
          ))}
        </select>
        {errors.gender && (
          <p className="px-1 text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Update Profile"}
      </Button>

      {errors.root && (
        <p className="self-start px-1 text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
};

export default EditProfileForm;
