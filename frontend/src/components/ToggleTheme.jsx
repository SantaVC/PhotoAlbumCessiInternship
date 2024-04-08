import "./ToggleTheme.scss";

const ToggleTheme = ({ handleChange, isChecked }) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="themeToggle"
        checked={isChecked}
        onChange={handleChange}
      />
      <label
        className="flex items-center dark:text-white gap-2 before:bg-sky-400 dark:before:bg-sky-800 after:bg-white dark:after:bg-neutral-200"
        htmlFor="themeToggle"
      >
        Dark Mode
      </label>
    </div>
  );
};

export default ToggleTheme;
