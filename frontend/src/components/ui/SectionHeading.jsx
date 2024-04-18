import classNames from "classnames";

const SectionHeading = ({ className, children }) => {
  const finalClassname = classNames("text-2xl text-center", className);

  return <h1 className={finalClassname}>{children}</h1>;
};

export default SectionHeading;
