import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="swap swap-rotate cursor-pointer">
      <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />

      {/* sun icon */}
      <svg
        className="swap-on fill-current w-6 h-6"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
      >
        <path d="M5.64 17l-1.41 1.41L6.05 20l1.41-1.41L5.64 17zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.36 4.64L20 6.05l-1.41-1.41L16.95 7.23l1.41 1.41zM17 18.36l1.41 1.41L20 18.95l-1.41-1.41L17 18.36zM23 11h-3v2h3v-2zm-9 9h2v-3h-2v3zM12 7a5 5 0 100 10 5 5 0 000-10z" />
      </svg>

     {/* moon icon */}
<svg
  className="w-6 h-6"
  xmlns="https://www.svgrepo.com/show/309493/moon.svg"
  viewBox="0 0 24 24"
  fill="black"
>
  <path d="M21.64 13a1 1 0 00-1.05-.14A8 8 0 1111.14 3.41a1 1 0 00-.14-1.05A1 1 0 009.64 2 10 10 0 1022 14.36a1 1 0 00-.36-1.36z" />
</svg>

    </label>
  );
};

export default ThemeToggle;
