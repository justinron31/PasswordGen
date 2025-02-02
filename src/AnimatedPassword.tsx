import { useState, useEffect } from "react";

// Define types for props
interface AnimatedPasswordProps {
  password: string;
  showPassword: boolean;
  darkMode: boolean;
}

const AnimatedPassword: React.FC<AnimatedPasswordProps> = ({
  password,
  showPassword,
  darkMode,
}) => {
  const [animatingChars, setAnimatingChars] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  useEffect(() => {
    if (!password) return;

    // Use correct types for the browser
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    const intervalIds: ReturnType<typeof setInterval>[] = [];
    setIsAnimating(true);
    setAnimatingChars(Array(password.length).fill(""));

    // Animate each character with a staggered start
    [...password].forEach((char, index) => {
      const staggerDelay = 50;
      const maxCycles = 10;
      const intervalDelay = 50;

      const timeoutId = setTimeout(() => {
        let cycles = 0;
        const intervalId = setInterval(() => {
          setAnimatingChars((prev) => {
            const newChars = [...prev];
            newChars[index] =
              characters[Math.floor(Math.random() * characters.length)];
            return newChars;
          });
          cycles++;

          if (cycles >= maxCycles) {
            clearInterval(intervalId);
            // Finalize the character with the actual password character
            setAnimatingChars((prev) => {
              const newChars = [...prev];
              newChars[index] = password[index];
              return newChars;
            });
            // If this is the last character, mark the animation as complete
            if (index === password.length - 1) {
              setIsAnimating(false);
            }
          }
        }, intervalDelay);
        intervalIds.push(intervalId);
      }, index * staggerDelay);

      timeoutIds.push(timeoutId);
    });

    // Cleanup any pending timeouts and intervals on unmount or prop change
    return () => {
      timeoutIds.forEach(clearTimeout);
      intervalIds.forEach(clearInterval);
    };
  }, [password, characters]);

  return (
    <div className="flex flex-wrap">
      {(isAnimating ? animatingChars : [...password]).map((char, index) => (
        <span
          key={index}
          className={`font-mono text-lg sm:text-xl transition-all duration-150 ${
            showPassword ? "" : "blur-md select-none"
          } ${darkMode ? "text-gray-200" : "text-gray-800"}`}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default AnimatedPassword;
