import classname from "classnames";

const Button = ({ className, children, type = "button", ...rest }) => {
  const finalClassName = classname(
    "flex items-center justify-center",
    className
  );

  return (
    <button type={type} className={finalClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
