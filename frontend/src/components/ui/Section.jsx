import classNames from "classnames";

const Section = ({ className, primary, children }) => {
  const finalClassName = classNames(
    "h-full",
    primary && "dark:text-white p-5 bg-sky-200 dark:bg-neutral-800 rounded-3xl",
    className
  );

  return <section className={finalClassName}>{children}</section>;
};

export default Section;
