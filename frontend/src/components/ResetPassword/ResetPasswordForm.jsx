import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../index";

const schema = z.object({
  email: z.string().email("Invalid email."),
});

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 f-regular"
    >
      <div>
        <input
          {...register("email")}
          className="min-w-[300px] w-full py-2 px-3 border border-neutral-500 rounded-md"
          placeholder="Email..."
        />
        {errors.email && (
          <p className="px-1 text-red-500">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="border border-neutral-500 px-5 py-2 f-bold hover:bg-sky-300 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Reset"}
      </Button>

      {errors.root && (
        <p className="self-start px-1 text-red-500">{errors.root.message}</p>
      )}
    </form>
  );
};

export default ResetPasswordForm;
