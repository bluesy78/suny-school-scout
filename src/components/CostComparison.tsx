
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Cost {
  tuition: number;
  housing: number;
  meals: number;
  books: number;
  personal: number;
  financial: number;
}

const CostComparison = () => {
  const [cobleskill, setCobleskill] = useState<Cost>({
    tuition: 7070,
    housing: 8200,
    meals: 5000,
    books: 1200,
    personal: 1800,
    financial: 0
  });
  
  const [oswego, setOswego] = useState<Cost>({
    tuition: 7070,
    housing: 9250,
    meals: 5500,
    books: 1200,
    personal: 1800,
    financial: 0
  });

  const handleCobleskillChange = (field: keyof Cost, value: number) => {
    setCobleskill(prev => ({ ...prev, [field]: value }));
  };

  const handleOswegoChange = (field: keyof Cost, value: number) => {
    setOswego(prev => ({ ...prev, [field]: value }));
  };

  const getCobleskillTotal = () => {
    return cobleskill.tuition + cobleskill.housing + cobleskill.meals + 
           cobleskill.books + cobleskill.personal - cobleskill.financial;
  };

  const getOswegoTotal = () => {
    return oswego.tuition + oswego.housing + oswego.meals + 
           oswego.books + oswego.personal - oswego.financial;
  };

  const data = [
    {
      name: 'Tuition',
      Cobleskill: cobleskill.tuition,
      Oswego: oswego.tuition,
    },
    {
      name: 'Housing',
      Cobleskill: cobleskill.housing,
      Oswego: oswego.housing,
    },
    {
      name: 'Meals',
      Cobleskill: cobleskill.meals,
      Oswego: oswego.meals,
    },
    {
      name: 'Books',
      Cobleskill: cobleskill.books,
      Oswego: oswego.books,
    },
    {
      name: 'Personal',
      Cobleskill: cobleskill.personal,
      Oswego: oswego.personal,
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Cost Comparison</h3>
      
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Bar dataKey="Cobleskill" fill="#036936" />
            <Bar dataKey="Oswego" fill="#003f87" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-cobleskill border-b pb-2">SUNY Cobleskill</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="cobleskill-tuition">Tuition</Label>
              <Input
                id="cobleskill-tuition"
                type="number"
                value={cobleskill.tuition}
                onChange={(e) => handleCobleskillChange('tuition', Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cobleskill-housing">Housing</Label>
              <Input
                id="cobleskill-housing"
                type="number"
                value={cobleskill.housing}
                onChange={(e) => handleCobleskillChange('housing', Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cobleskill-meals">Meals</Label>
              <Input
                id="cobleskill-meals"
                type="number"
                value={cobleskill.meals}
                onChange={(e) => handleCobleskillChange('meals', Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cobleskill-books">Books</Label>
              <Input
                id="cobleskill-books"
                type="number"
                value={cobleskill.books}
                onChange={(e) => handleCobleskillChange('books', Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cobleskill-personal">Personal</Label>
              <Input
                id="cobleskill-personal"
                type="number"
                value={cobleskill.personal}
                onChange={(e) => handleCobleskillChange('personal', Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cobleskill-financial" className="text-green-600">Financial Aid</Label>
              <Input
                id="cobleskill-financial"
                type="number"
                value={cobleskill.financial}
                onChange={(e) => handleCobleskillChange('financial', Number(e.target.value))}
                className="mt-1 border-green-300 focus:border-green-500"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between text-sm">
              <span>Estimated Total:</span>
              <span className="font-semibold text-cobleskill">{formatCurrency(getCobleskillTotal())}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-oswego border-b pb-2">SUNY Oswego</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="oswego-tuition">Tuition</Label>
              <Input
                id="oswego-tuition"
                type="number"
                value={oswego.tuition}
                onChange={(e) => handleOswegoChange('tuition', Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="oswego-housing">Housing</Label>
              <Input
                id="oswego-housing"
                type="number"
                value={oswego.housing}
                onChange={(e) => handleOswegoChange('housing', Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="oswego-meals">Meals</Label>
              <Input
                id="oswego-meals"
                type="number"
                value={oswego.meals}
                onChange={(e) => handleOswegoChange('meals', Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="oswego-books">Books</Label>
              <Input
                id="oswego-books"
                type="number"
                value={oswego.books}
                onChange={(e) => handleOswegoChange('books', Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="oswego-personal">Personal</Label>
              <Input
                id="oswego-personal"
                type="number"
                value={oswego.personal}
                onChange={(e) => handleOswegoChange('personal', Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="oswego-financial" className="text-green-600">Financial Aid</Label>
              <Input
                id="oswego-financial"
                type="number"
                value={oswego.financial}
                onChange={(e) => handleOswegoChange('financial', Number(e.target.value))}
                className="mt-1 border-green-300 focus:border-green-500"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between text-sm">
              <span>Estimated Total:</span>
              <span className="font-semibold text-oswego">{formatCurrency(getOswegoTotal())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostComparison;
