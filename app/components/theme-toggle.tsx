import { LuMoon, LuSun } from 'react-icons/lu';
import { Button } from './ui/button';
export default function ThemeToggle() {
  function toggleTheme() {
    if (
      document.documentElement.classList.contains('dark') ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  }
  return (
    <Button variant="outline" size="icon" type="button" onClick={toggleTheme}>
      <LuSun className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
      <LuMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
