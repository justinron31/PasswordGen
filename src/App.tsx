import { Copy, Moon, Sun, KeyRound } from "lucide-react";
import { usePasswordGenerator } from "./usePasswordGenerator";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter";


function App() {
  const {
    password,
    length,
    setLength,
    // showPassword, // We'll always show password in this new design, maybe just mask it? Nah, generators usually show it.
    darkMode,
    copySuccess,
    charTypes,
    generatePassword,
    toggleCharType,
    copyToClipboard,
    toggleTheme,
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
  } = usePasswordGenerator();

  return (
    <div className={`min-h-screen font-['Outfit'] transition-colors duration-300 flex items-center justify-center p-4 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-gray-900"
    }`}>
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-start justify-center gap-6">

            {/* Main Card */}
            <div className={`flex-1 w-full rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300 ${
                darkMode ? "bg-slate-900 border border-slate-800" : "bg-white border border-gray-100"
            }`}>

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${darkMode ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}>
                            <KeyRound size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">PassGen</h1>
                            <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-400"}`}>Secure & Premium</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className={`p-3 rounded-2xl transition-all ${
                            darkMode
                            ? "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                            : "bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                        }`}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Display Area */}
                <div className="relative mb-8 group">
                    <div className={`w-full min-h-[5rem] flex items-center justify-center py-6 px-16 rounded-2xl text-center break-all transition-all border-2 border-dashed ${
                        darkMode
                        ? "bg-slate-950 border-slate-800 text-3xl font-mono text-white"
                        : "bg-gray-50 border-gray-200 text-3xl font-mono text-gray-800"
                    }`}>
                        {password || <span className="text-gray-400 text-lg">Click generate...</span>}
                    </div>

                    <div className="absolute top-0 right-0 h-full flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity">

                        <button
                            onClick={() => copyToClipboard()}
                            className={`p-3 rounded-xl transition-all ${
                                copySuccess
                                ? "bg-emerald-500 text-white"
                                : darkMode ? "bg-slate-800 hover:bg-indigo-600 text-white" : "bg-white hover:bg-indigo-500 hover:text-white shadow-md text-gray-600"
                            }`}
                            title="Copy"
                        >
                            <Copy size={20} />
                        </button>
                    </div>
                </div>

                <PasswordStrengthMeter strength={strength} />

                {/* Controls */}
                <div className="mt-10">
                    {/* Tabs */}
                    <div className={`flex p-1 rounded-xl mb-8 ${darkMode ? "bg-slate-800" : "bg-gray-100"}`}>
                        <button
                         onClick={() => setMode("random")}
                         className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                             mode === "random"
                             ? (darkMode ? "bg-slate-700 text-white shadow-lg" : "bg-white text-gray-900 shadow-sm")
                             : (darkMode ? "text-slate-400 hover:text-white" : "text-gray-500 hover:text-gray-900")
                         }`}
                        >
                            Random Characters
                        </button>
                        <button
                         onClick={() => setMode("passphrase")}
                         className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                             mode === "passphrase"
                             ? (darkMode ? "bg-slate-700 text-white shadow-lg" : "bg-white text-gray-900 shadow-sm")
                             : (darkMode ? "text-slate-400 hover:text-white" : "text-gray-500 hover:text-gray-900")
                         }`}
                        >
                            Passphrase (Memorable)
                        </button>
                    </div>

                    {/* Settings */}
                    <div className="space-y-6">
                        {mode === "random" ? (
                            <>
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label className={`font-medium ${darkMode ? "text-slate-300" : "text-gray-700"}`}>Password Length</label>
                                        <span className={`font-mono ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>{length}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="8"
                                        max="64"
                                        value={length}
                                        onChange={(e) => setLength(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { id: 'uppercase', label: 'ABC Uppercase', state: charTypes.uppercase },
                                        { id: 'lowercase', label: 'abc Lowercase', state: charTypes.lowercase },
                                        { id: 'numbers', label: '123 Numbers', state: charTypes.numbers },
                                        { id: 'special', label: '#$& Symbols', state: charTypes.special },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => toggleCharType(item.id as any)}
                                            className={`p-4 rounded-xl border text-left transition-all ${
                                                item.state
                                                ? (darkMode
                                                    ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-300"
                                                    : "bg-indigo-50 border-indigo-200 text-indigo-700")
                                                : (darkMode
                                                    ? "bg-slate-800/50 border-slate-700 text-slate-500 hover:bg-slate-800"
                                                    : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50")
                                            }`}
                                        >
                                            <div className="font-semibold text-sm">{item.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label className={`font-medium ${darkMode ? "text-slate-300" : "text-gray-700"}`}>Word Count</label>
                                        <span className={`font-mono ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>{wordCount}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="3"
                                        max="10"
                                        value={wordCount}
                                        onChange={(e) => setWordCount(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-500"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-white border-gray-200"}`}>
                                        <span className={`text-sm font-medium ${darkMode ? "text-slate-300" : "text-gray-700"}`}>Separator</span>
                                        <select
                                            value={separator}
                                            onChange={(e) => setSeparator(e.target.value)}
                                            className={`bg-transparent border-none focus:ring-0 text-right font-mono font-bold cursor-pointer ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
                                        >
                                            <option value="-">-</option>
                                            <option value=".">.</option>
                                            <option value="_">_</option>
                                            <option value=" ">Space</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => setCapitalize(!capitalize)}
                                        className={`p-4 rounded-xl border text-left transition-all ${
                                            capitalize
                                            ? (darkMode
                                                ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-300"
                                                : "bg-indigo-50 border-indigo-200 text-indigo-700")
                                            : (darkMode
                                                ? "bg-slate-800/50 border-slate-700 text-slate-500 hover:bg-slate-800"
                                                : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50")
                                        }`}
                                    >
                                        <span className="text-sm font-medium">Capitalize</span>
                                    </button>
                                     <button
                                        onClick={() => setIncludeNumber(!includeNumber)}
                                        className={`p-4 rounded-xl border text-left transition-all sm:col-span-2 ${
                                            includeNumber
                                            ? (darkMode
                                                ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-300"
                                                : "bg-indigo-50 border-indigo-200 text-indigo-700")
                                            : (darkMode
                                                ? "bg-slate-800/50 border-slate-700 text-slate-500 hover:bg-slate-800"
                                                : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50")
                                        }`}
                                    >
                                        <span className="text-sm font-medium">Include Number</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={generatePassword}
                        className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide shadow-lg transition-transform active:scale-95 ${
                            darkMode
                            ? "bg-white text-slate-900 hover:bg-indigo-50"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                    >
                        Generate Password
                    </button>
                </div>

            </div>



        </div>
    </div>
  );
}

export default App;
