import classname from "classnames";

const Button = ({ className, primary, children, type = "button", ...rest }) => {
  const finalClassName = classname(
    "flex items-center justify-center",
    className,
    primary &&
      "border border-neutral-500 px-5 py-2 f-bold bg-sky-300 hover:bg-sky-400 disabled:cursor-not-allowed"
  );

  return (
    <button type={type} className={finalClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
