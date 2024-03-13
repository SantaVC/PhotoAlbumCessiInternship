export const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
);

export const nicknameRegex = new RegExp(/^[a-zA-Z0-9]{4,}$/);
