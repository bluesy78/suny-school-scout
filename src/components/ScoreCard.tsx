
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Check, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ScoreCardProps {
  title: string;
  description: string;
  onScoreChange: (scores: { cobleskill: number; oswego: number }) => void;
}

const ScoreCard = ({ title, description, onScoreChange }: ScoreCardProps) => {
  const [cobleskillScore, setCobleskillScore] = useState(50);
  const [oswegoScore, setOswegoScore] = useState(50);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCobleskillChange = (value: number[]) => {
    setCobleskillScore(value[0]);
    onScoreChange({ cobleskill: value[0], oswego: oswegoScore });
  };

  const handleOswegoChange = (value: number[]) => {
    setOswegoScore(value[0]);
    onScoreChange({ cobleskill: cobleskillScore, oswego: value[0] });
  };

  const markAsComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-gray-400 hover:text-gray-600">
                  <Info size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <button 
          onClick={markAsComplete}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
            isCompleted 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isCompleted && <Check size={14} />}
          {isCompleted ? 'Completed' : 'Mark complete'}
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-cobleskill">SUNY Cobleskill</label>
            <span className="text-sm text-gray-600 font-medium">{cobleskillScore}/100</span>
          </div>
          <Slider 
            defaultValue={[50]} 
            max={100} 
            step={1} 
            onValueChange={handleCobleskillChange}
            className="[&_[role=slider]]:bg-cobleskill [&_[role=slider]]:border-cobleskill [&_[role=slider]]:hover:bg-cobleskill-dark [&_[data-orientation=horizontal]]:bg-cobleskill/20 [&_[data-orientation=horizontal][data-disabled]]:bg-cobleskill/20"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-oswego">SUNY Oswego</label>
            <span className="text-sm text-gray-600 font-medium">{oswegoScore}/100</span>
          </div>
          <Slider 
            defaultValue={[50]} 
            max={100} 
            step={1}
            onValueChange={handleOswegoChange}
            className="[&_[role=slider]]:bg-oswego [&_[role=slider]]:border-oswego [&_[role=slider]]:hover:bg-oswego-dark [&_[data-orientation=horizontal]]:bg-oswego/20 [&_[data-orientation=horizontal][data-disabled]]:bg-oswego/20"
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
