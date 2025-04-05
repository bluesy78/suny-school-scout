
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  priority?: 'high' | 'medium' | 'low';
  label: string;
  className?: string;
}

const CustomCheckbox = ({ 
  checked, 
  onChange, 
  priority, 
  label,
  className
}: CustomCheckboxProps) => {
  const getPriorityColor = () => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-400';
      case 'low': return 'bg-green-500';
      default: return 'hidden';
    }
  };

  return (
    <label className={cn("flex items-center space-x-2 cursor-pointer group", className)}>
      <div className="relative">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={onChange} 
          className="sr-only" 
        />
        <div className={cn(
          "w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200",
          checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300 group-hover:border-blue-400"
        )}>
          {checked && <Check className="h-3.5 w-3.5 text-white" />}
        </div>
      </div>
      {priority && (
        <div className={cn("w-2.5 h-2.5 rounded-full", getPriorityColor())}></div>
      )}
      <span className={cn("text-sm transition-colors", 
        checked ? "text-gray-500 line-through" : "text-gray-700"
      )}>
        {label}
      </span>
    </label>
  );
};

export default CustomCheckbox;
