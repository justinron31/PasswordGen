import React from "react";

interface PasswordStrengthMeterProps {
  strength: number; // 0-4
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ strength }) => {
  return (
    <div className="flex items-center gap-2 mt-4">
      <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex gap-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`flex-1 h-full transition-all duration-500 ease-out rounded-full ${
              index < strength
                ? strength === 1
                  ? "bg-red-500"
                  : strength === 2
                  ? "bg-orange-500"
                  : strength === 3
                  ? "bg-yellow-500"
                  : "bg-emerald-500"
                : "bg-transparent opacity-0"
            }`}
          />
        ))}
      </div>
      <span className={`text-xs font-semibold uppercase tracking-wider ${
          strength === 0 ? "text-gray-400" :
          strength === 1 ? "text-red-500" :
          strength === 2 ? "text-orange-500" :
          strength === 3 ? "text-yellow-500" :
          "text-emerald-500"
      }`}>
        {strength === 0 ? "Empty" :
         strength === 1 ? "Weak" :
         strength === 2 ? "Fair" :
         strength === 3 ? "Good" :
         "Strong"}
      </span>
    </div>
  );
};

export default PasswordStrengthMeter;
