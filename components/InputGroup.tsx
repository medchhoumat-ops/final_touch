
import React from 'react';

interface InputGroupProps {
  label: string;
  icon: string;
  placeholder: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, icon, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>
      <div className="relative flex items-center group">
        <div className="absolute left-4 text-gray-400 group-focus-within:text-primary transition-colors">
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </div>
        <input
          className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 placeholder:text-gray-400"
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputGroup;
