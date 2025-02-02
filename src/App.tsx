import { Copy, Eye, EyeOff, Moon, Sun, RefreshCw } from "lucide-react";
import { usePasswordGenerator } from "./usePasswordGenerator";
import AnimatedPassword from "./AnimatedPassword";

function App() {
  const {
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
  } = usePasswordGenerator();

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
              PassPalette Gen
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
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg text-nowrap hidden sm:block">
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
              <AnimatedPassword
                password={password}
                showPassword={showPassword}
                darkMode={darkMode}
              />
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
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap hidden sm:block">
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
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg text-nowrap hidden sm:block">
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
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg text-nowrap hidden sm:block">
                      {copySuccess ? "Copied!" : "Copy to clipboard"}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <label
              className={`block text-sm sm:text-base font-medium mb-3 transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Character Types
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => toggleCharType("uppercase")}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  charTypes.uppercase
                    ? darkMode
                      ? "bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/40"
                      : "bg-blue-100 text-blue-700 ring-2 ring-blue-500/40"
                    : darkMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                Uppercase (A-Z)
              </button>
              <button
                onClick={() => toggleCharType("lowercase")}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  charTypes.lowercase
                    ? darkMode
                      ? "bg-green-500/20 text-green-400 ring-2 ring-green-500/40"
                      : "bg-green-100 text-green-700 ring-2 ring-green-500/40"
                    : darkMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                Lowercase (a-z)
              </button>
              <button
                onClick={() => toggleCharType("numbers")}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  charTypes.numbers
                    ? darkMode
                      ? "bg-purple-500/20 text-purple-400 ring-2 ring-purple-500/40"
                      : "bg-purple-100 text-purple-700 ring-2 ring-purple-500/40"
                    : darkMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                Numbers (0-9)
              </button>
              <button
                onClick={() => toggleCharType("special")}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  charTypes.special
                    ? darkMode
                      ? "bg-orange-500/20 text-orange-400 ring-2 ring-orange-500/40"
                      : "bg-orange-100 text-orange-700 ring-2 ring-orange-500/40"
                    : darkMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                Special (!@#$%^&*)
              </button>
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
                  box-shadow: 0;
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
            <p className="font-medium">Your password will contain:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {charTypes.uppercase && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Uppercase letters (A-Z)
                </li>
              )}
              {charTypes.lowercase && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Lowercase letters (a-z)
                </li>
              )}
              {charTypes.numbers && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Numbers (0-9)
                </li>
              )}
              {charTypes.special && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Special characters (!@#$%^&*)
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
