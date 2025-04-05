
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import CustomCheckbox from './CustomCheckbox';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ComparisonSubItem {
  id: string;
  title: string;
  description: string;
}

interface ComparisonCardProps {
  title: string;
  description: string;
  type: 'cobleskill' | 'oswego';
  subItems?: ComparisonSubItem[];
}

const ComparisonCard = ({ 
  title, 
  description, 
  type, 
  subItems = [] 
}: ComparisonCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const [notes, setNotes] = useState('');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const bgColor = type === 'cobleskill' ? 'bg-cobleskill-light' : 'bg-oswego-light';
  const borderColor = type === 'cobleskill' ? 'border-cobleskill' : 'border-oswego';
  const textColor = type === 'cobleskill' ? 'text-cobleskill' : 'text-oswego';

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={cn(
      "rounded-lg border overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md",
      bgColor,
      borderColor,
      "border-l-4"
    )}>
      <div className={cn(
        "px-4 py-3 font-semibold flex justify-between items-center",
        textColor
      )}>
        <h3>{title}</h3>
        {subItems.length > 0 && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-full hover:bg-gray-200/50"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        )}
      </div>
      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <p className="text-gray-600 text-sm">{description}</p>
        
        {subItems.length > 0 && expanded && (
          <div className="mt-3 space-y-2 pt-2 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Notable Features:</h4>
            {subItems.map((item) => (
              <div key={item.id} className="ml-2">
                <CustomCheckbox
                  checked={!!checkedItems[item.id]}
                  onChange={() => toggleItem(item.id)}
                  label={item.title}
                />
                <p className="text-xs text-gray-500 italic ml-7 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-3 pt-2">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes..."
            className="w-full p-2 text-sm border border-gray-200 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default ComparisonCard;
