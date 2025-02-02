import { useState, useEffect } from "react";
import { Copy, Eye, EyeOff, Moon, Sun, RefreshCw } from "lucide-react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showTooltip, setShowTooltip] = useState("");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let result = "";
    result += uppercaseChars.charAt(
      Math.floor(Math.random() * uppercaseChars.length)
    );
    result += lowercaseChars.charAt(
      Math.floor(Math.random() * lowercaseChars.length)
    );
    result += numberChars.charAt(
      Math.floor(Math.random() * numberChars.length)
    );
    result += specialChars.charAt(
      Math.floor(Math.random() * specialChars.length)
    );

    const allChars =
      uppercaseChars + lowercaseChars + numberChars + specialChars;
    for (let i = 4; i < length; i++) {
      result += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    result = result
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        darkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <div className="w-full max-w-xl px-4 py-4 sm:py-8">
        <div
          className={`rounded-2xl shadow-2xl backdrop-blur-sm p-4 sm:p-6 md:p-8 transition-all duration-300 ${
            darkMode
              ? "bg-gray-800/90 shadow-gray-900/30"
              : "bg-white/90 shadow-gray-200/50"
          }`}
        >
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h1
              className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${
                darkMode
                  ? "from-blue-400 to-purple-400"
                  : "from-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              Password Generator
            </h1>
            <div className="relative">
              <button
                onClick={toggleTheme}
                onMouseEnter={() => setShowTooltip("theme")}
                onMouseLeave={() => setShowTooltip("")}
                className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {showTooltip === "theme" && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg text-nowrap">
                  Toggle theme
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                </div>
              )}
            </div>
          </div>

          <div
            className={`relative mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl transition-all duration-300 ${
              darkMode ? "bg-gray-700/50" : "bg-gray-50"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span
                className={`font-mono text-lg sm:text-xl break-all ${
                  showPassword ? "" : "blur-md select-none"
                } ${darkMode ? "text-gray-200" : "text-gray-800"}`}
              >
                {password}
              </span>
              <div className="flex gap-2 sm:gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseEnter={() => setShowTooltip("visibility")}
                    onMouseLeave={() => setShowTooltip("")}
                    className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-600 hover:bg-gray-500 text-gray-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {showTooltip === "visibility" && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap">
                      {showPassword ? "Hide password" : "Show password"}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={generatePassword}
                    onMouseEnter={() => setShowTooltip("generate")}
                    onMouseLeave={() => setShowTooltip("")}
                    className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-600 hover:bg-gray-500 text-gray-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    <RefreshCw size={18} />
                  </button>
                  {showTooltip === "generate" && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg text-nowrap">
                      Generate new
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={copyToClipboard}
                    onMouseEnter={() => setShowTooltip("copy")}
                    onMouseLeave={() => setShowTooltip("")}
                    className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                      copySuccess
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : darkMode
                        ? "bg-gray-600 hover:bg-gray-500 text-gray-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Copy size={18} />
                  </button>
                  {showTooltip === "copy" && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg text-nowrap">
                      {copySuccess ? "Copied!" : "Copy to clipboard"}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between mb-3">
              <label
                className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password Length: {length}
              </label>
            </div>
            <div className="relative py-4">
              <input
                type="range"
                min="12"
                max="32"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className={`w-full h-1 rounded-lg appearance-none cursor-pointer ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
                style={{
                  background: `linear-gradient(to right,
                    ${darkMode ? "#818cf8" : "#4f46e5"} 0%,
                    ${darkMode ? "#818cf8" : "#4f46e5"} ${
                    ((length - 12) / 20) * 100
                  }%,
                    ${darkMode ? "#374151" : "#e5e7eb"} ${
                    ((length - 12) / 20) * 100
                  }%,
                    ${darkMode ? "#374151" : "#e5e7eb"} 100%)`,
                }}
              />
              <style>{`
                input[type='range']::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: ${darkMode ? "#818cf8" : "#4f46e5"};
                  cursor: pointer;
                  transition: all 0.2s ease-in-out;
                  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                input[type='range']::-webkit-slider-thumb:hover {
                  transform: scale(1.1);
                  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
                }
                input[type='range']::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  border: none;
                  border-radius: 50%;
                  background: ${darkMode ? "#818cf8" : "#4f46e5"};
                  cursor: pointer;
                  transition: all 0.2s ease-in-out;
                  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                }
                input[type='range']::-moz-range-thumb:hover {
                  transform: scale(1.1);
                  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
                }
              `}</style>
            </div>
            <div className="flex justify-between mt-2">
              <span
                className={`text-xs sm:text-sm transition-colors duration-300 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                12
              </span>
              <span
                className={`text-xs sm:text-sm transition-colors duration-300 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                32
              </span>
            </div>
          </div>

          <div
            className={`space-y-3 text-xs sm:text-sm transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p className="font-medium">
              Your password is guaranteed to contain:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Uppercase letters (A-Z)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Lowercase letters (a-z)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Numbers (0-9)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Special characters (!@#$%^&*)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
