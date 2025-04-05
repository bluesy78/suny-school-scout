
import React from 'react';
import { cn } from '@/lib/utils';
import CustomCheckbox from './CustomCheckbox';
import ComparisonCard from './ComparisonCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SubItem {
  id: string;
  title: string;
  description: string;
}

interface SchoolData {
  title: string;
  description: string;
  subItems?: SubItem[];
}

interface ComparisonSectionProps {
  id: string;
  title: string;
  icon: string;
  priority?: 'high' | 'medium' | 'low';
  checked: boolean;
  onCheckChange: () => void;
  cobleskillData: SchoolData;
  oswegoData: SchoolData;
  animationDelay?: string;
}

const ComparisonSection = ({
  id,
  title,
  icon,
  priority,
  checked,
  onCheckChange,
  cobleskillData,
  oswegoData,
  animationDelay = ''
}: ComparisonSectionProps) => {
  return (
    <div className={cn(
      "rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden mb-6 animate-fade-in opacity-0",
      animationDelay
    )}>
      <Accordion type="single" collapsible defaultValue={id}>
        <AccordionItem value={id} className="border-0">
          <div className="px-5 py-4 flex items-center justify-between bg-gray-50">
            <div className="flex items-center space-x-3">
              <span className="text-xl">{icon}</span>
              <CustomCheckbox
                checked={checked}
                onChange={onCheckChange}
                priority={priority}
                label={title}
                className="font-medium"
              />
            </div>
            <AccordionTrigger className="pb-0" />
          </div>
          
          <AccordionContent className="px-6 pt-4 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ComparisonCard
                title="SUNY Cobleskill"
                description={cobleskillData.description}
                type="cobleskill"
                subItems={cobleskillData.subItems}
              />
              
              <ComparisonCard
                title="SUNY Oswego"
                description={oswegoData.description}
                type="oswego"
                subItems={oswegoData.subItems}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ComparisonSection;
