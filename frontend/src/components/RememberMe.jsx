import { useEffect, useState } from "react";

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    localStorage.setItem("persist", isChecked);
  }, [isChecked]);

  return (
    <div className="self-start">
      <input
        className="cursor-pointer absolute opacity-0"
        type="checkbox"
        id="persist"
        onChange={() => setIsChecked((prev) => !prev)}
        checked={isChecked}
      />

      <label
        className="flex items-center justify-center gap-2 cursor-pointer"
        htmlFor="persist"
      >
        Remember me
      </label>
    </div>
  );
};

export default Checkbox;
