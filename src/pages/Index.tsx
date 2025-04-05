
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ProgressBar from '@/components/ProgressBar';
import CustomCheckbox from '@/components/CustomCheckbox';
import ComparisonSection from '@/components/ComparisonSection';
import ScoreCard from '@/components/ScoreCard';
import CostComparison from '@/components/CostComparison';
import SchoolDistanceMap from '@/components/SchoolDistanceMap';
import DecisionTracker from '@/components/DecisionTracker';

const Index = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [checklistItems, setChecklistItems] = useState<Record<string, boolean>>({
    'academics': false,
    'housing': false,
    'campusLife': false,
    'location': false,
    'cost': false,
  });
  
  const [scores, setScores] = useState({
    cobleskill: {
      academics: 50,
      housing: 50,
      campusLife: 50,
      location: 50,
      cost: 50
    },
    oswego: {
      academics: 50,
      housing: 50,
      campusLife: 50,
      location: 50,
      cost: 50
    }
  });
  
  // Calculate total scores for visualization
  const cobleskillTotalScore = Object.values(scores.cobleskill).reduce((a, b) => a + b, 0);
  const oswegoTotalScore = Object.values(scores.oswego).reduce((a, b) => a + b, 0);

  useEffect(() => {
    // Calculate progress based on checked items
    const totalItems = Object.keys(checklistItems).length;
    const completedItems = Object.values(checklistItems).filter(Boolean).length;
    const calculatedProgress = (completedItems / totalItems) * 100;
    setProgress(calculatedProgress);
  }, [checklistItems]);
  
  const toggleChecklistItem = (key: string) => {
    setChecklistItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleScoreChange = (category: string, scores: { cobleskill: number; oswego: number }) => {
    setScores(prev => ({
      cobleskill: {
        ...prev.cobleskill,
        [category]: scores.cobleskill
      },
      oswego: {
        ...prev.oswego,
        [category]: scores.oswego
      }
    }));
  };
  
  const handleSave = () => {
    // In a full implementation, this would save to localStorage or a backend
    toast({
      title: "Progress saved!",
      description: "Your checklist and comparisons have been saved.",
    });
  };
  
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      setChecklistItems(Object.fromEntries(
        Object.keys(checklistItems).map(key => [key, false])
      ));
      
      setScores({
        cobleskill: {
          academics: 50,
          housing: 50,
          campusLife: 50,
          location: 50,
          cost: 50
        },
        oswego: {
          academics: 50,
          housing: 50,
          campusLife: 50,
          location: 50,
          cost: 50
        }
      });
      
      toast({
        title: "Reset complete",
        description: "All data has been reset to default values.",
      });
    }
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container max-w-5xl py-8 px-4 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cobleskill to-oswego bg-clip-text text-transparent">
          SUNY College Comparison Checklist
        </h1>
        <p className="text-gray-500 mb-6">Your guide to comparing SUNY Cobleskill and SUNY Oswego</p>
        <ProgressBar progress={progress} />
      </header>

      <div className="space-y-6">
        <ComparisonSection
          id="academics"
          title="Academic Programs"
          icon="📚"
          priority="high"
          checked={checklistItems.academics}
          onCheckChange={() => toggleChecklistItem('academics')}
          cobleskillData={{
            title: "SUNY Cobleskill",
            description: "Known for outstanding programs in Agricultural Business, Culinary Arts, and Wildlife Management with a practical, hands-on approach.",
            subItems: [
              {
                id: "agBusiness",
                title: "Agricultural Business Management",
                description: "Direct connections to New York state agribusiness industry; 96% job placement rate after graduation."
              },
              {
                id: "culinary",
                title: "Culinary Arts",
                description: "American Culinary Federation accredited with opportunities to work in campus restaurant open to public."
              },
              {
                id: "wildlife",
                title: "Wildlife Management",
                description: "Hands-on conservation training with 782-acre campus serving as outdoor classroom."
              }
            ]
          }}
          oswegoData={{
            title: "SUNY Oswego",
            description: "Recognized for strong programs in Meteorology, Business, Education and Media studies with 110+ undergraduate and graduate programs.",
            subItems: [
              {
                id: "meteorology",
                title: "Meteorology",
                description: "Only SUNY school offering this major; unique Lake Ontario weather systems provide exceptional study opportunities."
              },
              {
                id: "business",
                title: "Business Administration",
                description: "AACSB accredited with strong investment management program and Bloomberg Terminal access."
              },
              {
                id: "broadcasting",
                title: "Broadcasting & Mass Communication",
                description: "Award-winning WTOP-TV student television station and WNYO radio station for hands-on media experience."
              }
            ]
          }}
        />
        
        <ComparisonSection
          id="housing"
          title="Housing Options"
          icon="🏠"
          priority="high"
          checked={checklistItems.housing}
          onCheckChange={() => toggleChecklistItem('housing')}
          animationDelay="animate-delay-100"
          cobleskillData={{
            title: "SUNY Cobleskill",
            description: "Five residence halls with options from traditional dorms to suite-style living in a rural setting with close-knit community feel.",
            subItems: [
              {
                id: "traditional",
                title: "Traditional Residence Halls",
                description: "Pearson, Fake, and Dix Halls offer standard double rooms with shared bathrooms and community lounges."
              },
              {
                id: "suite",
                title: "Suite-Style Living",
                description: "Vroman Hall features four-person suites with shared living areas and semi-private bathrooms."
              },
              {
                id: "commons",
                title: "Alumni Commons",
                description: "Apartment-style housing with full kitchens for upperclassmen; limited availability requires early application."
              }
            ]
          }}
          oswegoData={{
            title: "SUNY Oswego",
            description: "13 residence halls including themed living communities and lakeside residence halls with stunning views of Lake Ontario.",
            subItems: [
              {
                id: "lakeside",
                title: "Lakeside Halls",
                description: "Scales, Waterbury, and Johnson Halls offer premium views of Lake Ontario with modern amenities."
              },
              {
                id: "themed",
                title: "Themed Living Communities",
                description: "Special interest housing for honors, global studies, arts, STEM, and first-year experience programs."
              },
              {
                id: "village",
                title: "The Village Townhouses",
                description: "Modern apartment-style units with private bedrooms, full kitchens, and in-unit laundry for upperclassmen."
              }
            ]
          }}
        />
        
        <ComparisonSection
          id="campusLife"
          title="Campus Life"
          icon="🎭"
          priority="medium"
          checked={checklistItems.campusLife}
          onCheckChange={() => toggleChecklistItem('campusLife')}
          animationDelay="animate-delay-200"
          cobleskillData={{
            title: "SUNY Cobleskill",
            description: "Intimate rural campus with strong agriculture and nature-focused activities and traditions.",
            subItems: [
              {
                id: "clubs",
                title: "Student Clubs",
                description: "Over 50 clubs and organizations, with strong emphasis on agricultural, outdoor, and professional development clubs."
              },
              {
                id: "events",
                title: "Campus Events",
                description: "Annual Ag High School Day, Culinary Competitions, and Fall Livestock Show are signature events."
              },
              {
                id: "athletics",
                title: "Athletics",
                description: "NCAA Division III athletics with 19 varsity teams; known for equestrian and woodsmen teams."
              }
            ]
          }}
          oswegoData={{
            title: "SUNY Oswego",
            description: "Vibrant lakeside campus with diverse cultural events and strong school spirit traditions.",
            subItems: [
              {
                id: "clubs",
                title: "Student Clubs",
                description: "Over 200 clubs and organizations covering diverse interests from cultural groups to academic societies."
              },
              {
                id: "events",
                title: "Campus Events",
                description: "ALANA Cultural Festival, OzFest spring celebration, and Division III hockey games draw large crowds."
              },
              {
                id: "athletics",
                title: "Athletics",
                description: "NCAA Division III athletics with 24 varsity teams; strong hockey and basketball programs with dedicated fan bases."
              }
            ]
          }}
        />
        
        <ComparisonSection
          id="location"
          title="Location & Environment"
          icon="🌎"
          priority="medium"
          checked={checklistItems.location}
          onCheckChange={() => toggleChecklistItem('location')}
          animationDelay="animate-delay-300"
          cobleskillData={{
            title: "SUNY Cobleskill",
            description: "Rural setting in the Schoharie Valley with a close-knit community atmosphere and natural surroundings.",
            subItems: [
              {
                id: "setting",
                title: "Campus Setting",
                description: "782-acre campus with farm facilities, agricultural lands, and woodland areas perfect for hands-on learning."
              },
              {
                id: "surroundings",
                title: "Surrounding Area",
                description: "Small town environment with easy access to outdoor recreation; about 45 minutes from Albany and Cooperstown."
              },
              {
                id: "weather",
                title: "Weather",
                description: "Four distinct seasons with cold, snowy winters and mild summers; picturesque fall foliage season."
              }
            ]
          }}
          oswegoData={{
            title: "SUNY Oswego",
            description: "Lakeside campus with beautiful water views and a mix of suburban and small-city environment.",
            subItems: [
              {
                id: "setting",
                title: "Campus Setting",
                description: "700-acre campus on the shores of Lake Ontario with over a mile of shoreline and stunning sunset views."
              },
              {
                id: "surroundings",
                title: "Surrounding Area",
                description: "Small city environment with shopping, dining, and entertainment options; about 40 minutes from Syracuse."
              },
              {
                id: "weather",
                title: "Weather",
                description: "Four seasons with significant lake-effect snow in winter (100+ inches annually); mild summer temperatures moderated by the lake."
              }
            ]
          }}
        />
        
        <ComparisonSection
          id="cost"
          title="Cost & Financial Aid"
          icon="💰"
          priority="high"
          checked={checklistItems.cost}
          onCheckChange={() => toggleChecklistItem('cost')}
          animationDelay="animate-delay-400"
          cobleskillData={{
            title: "SUNY Cobleskill",
            description: "State tuition rates with various scholarship options focused on agricultural and technical fields.",
            subItems: [
              {
                id: "tuition",
                title: "Tuition & Fees",
                description: "Standard SUNY in-state tuition ($7,070/year) plus fees; out-of-state tuition approximately $17,320/year."
              },
              {
                id: "housing",
                title: "Housing & Meals",
                description: "Housing costs range from $7,800-$8,600 per year; meal plans average $5,000 per year."
              },
              {
                id: "aid",
                title: "Financial Aid",
                description: "95% of students receive some form of financial aid; strong agricultural and technical scholarship opportunities."
              }
            ]
          }}
          oswegoData={{
            title: "SUNY Oswego",
            description: "Standard SUNY tuition with variety of merit and need-based scholarships and strong alumni support.",
            subItems: [
              {
                id: "tuition",
                title: "Tuition & Fees",
                description: "Standard SUNY in-state tuition ($7,070/year) plus fees; out-of-state tuition approximately $17,320/year."
              },
              {
                id: "housing",
                title: "Housing & Meals",
                description: "Housing costs range from $8,800-$9,700 per year depending on hall; meal plans average $5,500 per year."
              },
              {
                id: "aid",
                title: "Financial Aid",
                description: "80% of students receive financial aid; Presidential Scholarships offer up to $6,670/year for top applicants."
              }
            ]
          }}
        />
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Your School Ratings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreCard 
            title="Academic Program Quality" 
            description="Rate each school based on program quality, faculty expertise, and academic resources that align with your goals."
            onScoreChange={(scores) => handleScoreChange('academics', scores)}
          />
          <ScoreCard 
            title="Housing Quality" 
            description="Rate each school based on housing options, amenities, and overall living conditions."
            onScoreChange={(scores) => handleScoreChange('housing', scores)}
          />
          <ScoreCard 
            title="Campus Life & Activities" 
            description="Rate each school based on clubs, events, traditions, and social opportunities that interest you."
            onScoreChange={(scores) => handleScoreChange('campusLife', scores)}
          />
          <ScoreCard 
            title="Location & Environment" 
            description="Rate each school based on campus setting, surrounding area, and proximity to home or desired locations."
            onScoreChange={(scores) => handleScoreChange('location', scores)}
          />
          <ScoreCard 
            title="Cost & Financial Aid" 
            description="Rate each school based on overall cost and available financial aid packages for your situation."
            onScoreChange={(scores) => handleScoreChange('cost', scores)}
          />
        </div>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Additional Decision Factors</h2>
        
        <CostComparison />
        <SchoolDistanceMap />
        
        <DecisionTracker 
          schools={[
            { name: "SUNY Cobleskill", color: "#036936", score: cobleskillTotalScore },
            { name: "SUNY Oswego", color: "#003f87", score: oswegoTotalScore }
          ]}
        />
        
        <div className="flex flex-wrap justify-center gap-4 mt-10 mb-16">
          <Button onClick={handleSave} size="lg" className="bg-gradient-to-r from-cobleskill to-oswego hover:shadow-md">
            Save Progress
          </Button>
          <Button onClick={handlePrint} variant="outline" size="lg">
            Print Comparison
          </Button>
          <Button onClick={handleReset} variant="destructive" size="lg">
            Reset All Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
