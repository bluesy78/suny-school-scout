
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin } from 'lucide-react';

const SchoolDistanceMap = () => {
  const [homeAddress, setHomeAddress] = useState('');
  
  // These would typically come from a geolocation service
  const schoolLocations = [
    {
      name: 'SUNY Cobleskill',
      address: '126 Schenectady Ave, Cobleskill, NY 12043',
      distanceHours: 'Approximately 3 hours from NYC'
    },
    {
      name: 'SUNY Oswego',
      address: '7060 NY-104, Oswego, NY 13126',
      distanceHours: 'Approximately 4 hours from NYC'
    }
  ];

  const handleCheck = () => {
    // In a real implementation, this would call a mapping/distance API
    alert(`In a full implementation, this would calculate the distance from "${homeAddress}" to both schools.`);
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-4 mb-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Distance Comparison</h3>
      
      <div className="mb-6">
        <div className="space-y-2 mb-4">
          <Label htmlFor="home-address">Your Home Address</Label>
          <div className="flex space-x-2">
            <Input
              id="home-address"
              placeholder="Enter your home address"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleCheck}>Check</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {schoolLocations.map((school) => (
            <div key={school.name} className="border rounded-md p-3 bg-gray-50">
              <div className="flex items-start space-x-2">
                <MapPin className={school.name.includes('Cobleskill') ? 'text-cobleskill' : 'text-oswego'} />
                <div>
                  <h4 className="font-medium">{school.name}</h4>
                  <p className="text-sm text-gray-600">{school.address}</p>
                  <p className="text-xs text-gray-500 mt-1">{school.distanceHours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-sm text-blue-700">
        <p>💡 <strong>Tip:</strong> Consider how travel time affects your college experience - especially for weekend trips home, holiday breaks, and internship opportunities.</p>
      </div>
    </div>
  );
};

export default SchoolDistanceMap;
