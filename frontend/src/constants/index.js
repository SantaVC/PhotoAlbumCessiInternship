import { z } from "zod";

export const BASE_URL = "http://localhost:8000/api";
export const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
);
export const nicknameRegex = new RegExp(/^[a-zA-Z0-9]{4,}$/);
export const nameRegex = new RegExp(/^[a-zA-Z]+$/);
export const genderVariants = ["male", "female", "other"];
export const TOKEN_KEY = "ACCESS_TOKEN";
export const USER_DATA_KEY = "USER_DATA";
export const postValidationSchema = z.object({
  description: z
    .string()
    .max(255, "Description must be maximum 255 characters long")
    .optional()
    .or(z.literal("")),
});
