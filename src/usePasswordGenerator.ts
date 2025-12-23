import { useState, useCallback } from "react";
import { wordList } from "./utils/wordlist";

// Define the possible character types in the password generator.
type CharTypes = "uppercase" | "lowercase" | "numbers" | "special";

export type PasswordMode = "random" | "passphrase";

// Define the structure of the charTypes state.
interface CharTypesState {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  special: boolean;
}

export const usePasswordGenerator = () => {
  const [password, setPassword] = useState<string>("");
  const [mode, setMode] = useState<PasswordMode>("random");
  const [length, setLength] = useState<number>(16);
  const [wordCount, setWordCount] = useState<number>(4);
  const [separator, setSeparator] = useState<string>("-");
  const [capitalize, setCapitalize] = useState<boolean>(false);
  const [includeNumber, setIncludeNumber] = useState<boolean>(false);


  const [strength, setStrength] = useState<number>(0); // 0-4 score

  const [showPassword, setShowPassword] = useState<boolean>(false); // Default to false, can represent "blind" mode if needed, but usually true for generator
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

  const calculateStrength = useCallback((pwd: string) => {
    if (!pwd) return 0;

    // Simple entropy estimation
    let poolSize = 0;
    if (mode === 'random') {
      if (charTypes.lowercase) poolSize += 26;
      if (charTypes.uppercase) poolSize += 26;
      if (charTypes.numbers) poolSize += 10;
      if (charTypes.special) poolSize += 30; // Approx
      if (poolSize === 0) return 0;

      const entropy = pwd.length * Math.log2(poolSize);

      if (entropy < 28) return 0; // Very Weak
      if (entropy < 36) return 1; // Weak
      if (entropy < 60) return 2; // Fair
      if (entropy < 128) return 3; // Strong
      return 4; // Very Strong
    } else {
      // Passphrase entropy
      // ~2500 words -> ~11.3 bits per word.
      // 4 words -> ~45 bits (Fair/Strong)
      let entropy = wordCount * Math.log2(wordList.length);
      if (capitalize) entropy += wordCount; // +1 bit per word roughly
      if (includeNumber) entropy += Math.log2(10); // + 3.3 bits

      if (entropy < 28) return 0;
      if (entropy < 36) return 1;
      if (entropy < 45) return 2;
      if (entropy < 60) return 3;
      return 4;
    }
  }, [mode, charTypes, wordCount, capitalize, includeNumber]);



  // Password generation logic
  const generatePassword = useCallback(() => {
    let result = "";

    if (mode === "random") {
      // Filter the selected character types
      const selectedTypes = Object.entries(charTypes).filter(
        ([_, value]) => value
      );

      // If no character type is selected, set error message
      if (selectedTypes.length === 0) {
        setPassword("");
        return;
      }

      // Build a string with all available characters based on selected types
      const allChars = selectedTypes
        .map(([type]) => chars[type as CharTypes])
        .join("");

      // Generate password using the available characters
      result = Array.from({ length }, () =>
        allChars.charAt(Math.floor(Math.random() * allChars.length))
      ).join("");

      // Shuffle the result to ensure randomness (simple shuffle)
      // Note: A true cryptographic shuffle is better, but this is simple enough for this demo
      // Actually simply picking random chars from pool is fine.
      // Ensuring at least one of each type is often desired but can make it predictable if not careful.
      // We'll stick to simple random selection which is statistically likely to contain variety for sufficient lengths.

    } else {
      // Passphrase mode
      const words = [];
      for (let i = 0; i < wordCount; i++) {
        let word = wordList[Math.floor(Math.random() * wordList.length)];
        if (capitalize) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        words.push(word);
      }

      if (includeNumber) {
        // Append a random number to one random word or at the end
        const num = Math.floor(Math.random() * 100); // 0-99
        words[words.length - 1] += num;
      }

      result = words.join(separator);
    }

    setPassword(result);
    setStrength(calculateStrength(result));


  }, [length, charTypes, mode, wordCount, separator, capitalize, includeNumber, calculateStrength]);

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
  const copyToClipboard = useCallback(async (text?: string) => {
    const textToCopy = text || password;
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
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

  // Regenerate password when dependencies change (debounced could be better but immediate is snappy)
  // We'll not auto-regenerate on every settings change to avoid "flash" of passwords?
  // Actually commonly generators do regenerate.
  /* Removed auto-generation effect */

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
    // New exports
    mode,
    setMode,
    wordCount,
    setWordCount,
    separator,
    setSeparator,
    capitalize,
    setCapitalize,
    includeNumber,
    setIncludeNumber,

    strength
  };
};
