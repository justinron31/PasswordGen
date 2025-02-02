import { useState, useEffect, useCallback } from "react";

// Define the possible character types in the password generator.
type CharTypes = "uppercase" | "lowercase" | "numbers" | "special";

// Define the structure of the charTypes state.
interface CharTypesState {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  special: boolean;
}

export const usePasswordGenerator = () => {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(16);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<string>("");
  const [charTypes, setCharTypes] = useState<CharTypesState>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
  });

  // Define the character sets for each character type
  const chars: Record<CharTypes, string> = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    special: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  // Password generation logic
  const generatePassword = useCallback(() => {
    // Filter the selected character types
    const selectedTypes = Object.entries(charTypes).filter(
      ([_, value]) => value
    );

    // If no character type is selected, set error message
    if (selectedTypes.length === 0) {
      setPassword("Please select at least one character type");
      return;
    }

    // Build a string with all available characters based on selected types
    const allChars = selectedTypes
      .map(([type]) => chars[type as CharTypes]) // Type assertion to CharTypes
      .join("");

    // Generate password using the available characters
    let result = Array.from({ length }, () =>
      allChars.charAt(Math.floor(Math.random() * allChars.length))
    ).join("");

    // Shuffle the result to ensure randomness
    result = result
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(result);
  }, [charTypes, length]);

  // Toggle character type selection
  const toggleCharType = useCallback((type: keyof CharTypesState) => {
    setCharTypes((prev) => {
      const updatedTypes = { ...prev, [type]: !prev[type] };
      // Only update if at least one type is still selected
      return Object.values(updatedTypes).some((value) => value)
        ? updatedTypes
        : prev;
    });
  }, []);

  // Copy the password to clipboard
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset copy success after 2 seconds
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  }, [password]);

  // Toggle dark mode theme
  const toggleTheme = useCallback(() => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  }, []);

  // Regenerate password when length or charTypes change
  useEffect(() => {
    generatePassword();
  }, [length, charTypes, generatePassword]);

  return {
    password,
    length,
    setLength,
    showPassword,
    setShowPassword,
    darkMode,
    copySuccess,
    showTooltip,
    setShowTooltip,
    charTypes,
    generatePassword,
    toggleCharType,
    copyToClipboard,
    toggleTheme,
  };
};
