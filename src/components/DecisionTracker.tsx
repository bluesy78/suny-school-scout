
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useToast } from "@/components/ui/use-toast";

interface School {
  name: string;
  color: string;
  score: number;
}

interface DecisionTrackerProps {
  schools: School[];
}

const DecisionTracker = ({ schools }: DecisionTrackerProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [prosCobleskill, setProsCobleskill] = useState('');
  const [prosOswego, setProsOswego] = useState('');
  const [consCobleskill, setConsCobleskill] = useState('');
  const [consOswego, setConsOswego] = useState('');
  const { toast } = useToast();

  const chartData = schools.map(school => ({
    name: school.name,
    value: school.score
  }));

  const saveDecision = () => {
    // In a full implementation, this would save to localStorage or a backend
    toast({
      title: "Decision saved!",
      description: "Your decision notes and pros/cons have been saved.",
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Decision Tracker</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Decision Deadline</h4>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
            />
            
            {date && (
              <div className="mt-2 text-center">
                <Badge variant="outline" className="bg-gray-50">
                  {date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Badge>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                </p>
              </div>
            )}
          </div>
          
          <div className="border rounded-md p-4 bg-gray-50">
            <h4 className="font-medium mb-3">Decision Visualization</h4>
            
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={schools[index].color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} points`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-3">Pros and Cons</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="text-sm font-medium text-cobleskill mb-1">SUNY Cobleskill Pros</h5>
                <Textarea
                  placeholder="List the pros..."
                  value={prosCobleskill}
                  onChange={(e) => setProsCobleskill(e.target.value)}
                  className="h-[80px]"
                />
              </div>
              <div>
                <h5 className="text-sm font-medium text-oswego mb-1">SUNY Oswego Pros</h5>
                <Textarea
                  placeholder="List the pros..."
                  value={prosOswego}
                  onChange={(e) => setProsOswego(e.target.value)}
                  className="h-[80px]"
                />
              </div>
              <div>
                <h5 className="text-sm font-medium text-cobleskill mb-1">SUNY Cobleskill Cons</h5>
                <Textarea
                  placeholder="List the cons..."
                  value={consCobleskill}
                  onChange={(e) => setConsCobleskill(e.target.value)}
                  className="h-[80px]"
                />
              </div>
              <div>
                <h5 className="text-sm font-medium text-oswego mb-1">SUNY Oswego Cons</h5>
                <Textarea
                  placeholder="List the cons..."
                  value={consOswego}
                  onChange={(e) => setConsOswego(e.target.value)}
                  className="h-[80px]"
                />
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4 flex justify-end">
            <Button onClick={saveDecision}>Save Decision Notes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionTracker;
