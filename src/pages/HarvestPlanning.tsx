import React, { useState } from 'react';
import { 
  CalendarDays, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  AlertTriangle, 
  Wrench, 
  CheckSquare,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StageDetail {
  actions: string[];
  challenges: string[];
  resources: string[];
}

interface Stage {
  name: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  color: string;
  details: StageDetail;
}

const HarvestPlanning: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<number | null>(2); // Default to Flowering (In Progress)

  const stages: Stage[] = [
    { 
      name: 'Sowing', 
      date: '15 Oct 2025', 
      status: 'Completed', 
      color: 'bg-green-500',
      details: {
        actions: ['Prepare fine seed bed', 'Apply basal fertilizer (DAP)', 'Maintain 22.5cm row spacing'],
        challenges: ['Poor germination due to low moisture', 'Soil crusting', 'Bird interference'],
        resources: ['Certified Seeds (HD 2967)', 'DAP & Urea', 'Seed Drill Machine']
      }
    },
    { 
      name: 'Tillering', 
      date: '20 Nov 2025', 
      status: 'Completed', 
      color: 'bg-green-500',
      details: {
        actions: ['First irrigation (CRI stage)', 'Top dressing with Urea', 'Manual/Chemical weeding'],
        challenges: ['Aphid infestation', 'Nitrogen deficiency', 'Water logging in low areas'],
        resources: ['Water pump', 'Urea fertilizer', 'Herbicides']
      }
    },
    { 
      name: 'Flowering', 
      date: '10 Jan 2026', 
      status: 'In Progress', 
      color: 'bg-blue-500',
      details: {
        actions: ['Maintain consistent soil moisture', 'Monitor for Yellow Rust', 'Apply micronutrient spray'],
        challenges: ['Sudden heat waves', 'Yellow rust spread', 'Strong winds causing lodging'],
        resources: ['Fungicides (Propiconazole)', 'Sprayer machine', 'Irrigation']
      }
    },
    { 
      name: 'Grain Filling', 
      date: '25 Feb 2026', 
      status: 'Upcoming', 
      color: 'bg-gray-300',
      details: {
        actions: ['Final light irrigation', 'Protect from bird damage', 'Monitor grain hardness'],
        challenges: ['Terminal heat stress', 'Premature drying', 'Hailstorm risk'],
        resources: ['Bird scaring ribbons', 'Water supply']
      }
    },
    { 
      name: 'Harvesting', 
      date: '20 Mar 2026', 
      status: 'Upcoming', 
      color: 'bg-gray-300',
      details: {
        actions: ['Stop irrigation 10-14 days prior', 'Test grain moisture (<14%)', 'Arrange transport'],
        challenges: ['Unseasonal rain', 'Labor unavailability', 'Machine breakdown'],
        resources: ['Combine Harvester', 'Tractor Trolley', 'Jute Bags']
      }
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center">
          <CalendarDays className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Harvest Planning</h2>
          <p className="text-gray-500 text-sm">Track crop growth and plan your harvest with precision.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Timeline Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-gray-800">Growth Timeline (Wheat)</h3>
              <div className="flex items-center gap-2">
                <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  Day 85 of 150
                </span>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                  <Info className="w-3 h-3" />
                  Click a stage for details
                </div>
              </div>
            </div>

            <div className="relative space-y-8">
              {/* Vertical Line */}
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100"></div>

              {stages.map((stage, i) => (
                <div key={i} className="relative">
                  <button 
                    onClick={() => setSelectedStage(i)}
                    className={`w-full text-left relative flex items-start gap-8 group transition-all duration-300 ${
                      selectedStage === i ? 'scale-[1.02]' : 'hover:translate-x-1'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full border-4 border-white shadow-sm z-10 shrink-0 ${
                      selectedStage === i ? 'ring-4 ring-green-100' : ''
                    } ${stage.color} flex items-center justify-center transition-all`}>
                      {stage.status === 'Completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <div className={`w-2 h-2 rounded-full bg-white ${stage.status === 'In Progress' ? 'animate-pulse' : 'opacity-50'}`} />
                      )}
                    </div>
                    
                    <div className={`flex-1 p-5 rounded-2xl border transition-all flex items-center justify-between ${
                      selectedStage === i 
                        ? 'bg-green-50 border-green-200 shadow-md' 
                        : 'bg-gray-50 border-gray-100 group-hover:bg-white group-hover:border-gray-200'
                    }`}>
                      <div>
                        <h4 className={`font-bold transition-colors ${
                          selectedStage === i ? 'text-green-800' : 'text-gray-800'
                        }`}>{stage.name}</h4>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {stage.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${
                          stage.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                          stage.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {stage.status}
                        </span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${
                          selectedStage === i ? 'rotate-90 text-green-600' : 'text-gray-300'
                        }`} />
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed View for Selected Stage */}
          <AnimatePresence mode="wait">
            {selectedStage !== null && (
              <motion.div
                key={selectedStage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stages[selectedStage].color} text-white`}>
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{stages[selectedStage].name} Details</h3>
                    <p className="text-sm text-gray-500">Comprehensive guide for this growth phase</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Actions */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600 font-bold text-sm uppercase tracking-wider">
                      <CheckSquare className="w-4 h-4" />
                      Recommended Actions
                    </div>
                    <ul className="space-y-2">
                      {stages[selectedStage].details.actions.map((action, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-amber-600 font-bold text-sm uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" />
                      Potential Challenges
                    </div>
                    <ul className="space-y-2">
                      {stages[selectedStage].details.challenges.map((challenge, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
                      <Wrench className="w-4 h-4" />
                      Required Resources
                    </div>
                    <ul className="space-y-2">
                      {stages[selectedStage].details.resources.map((resource, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Section */}
        <div className="space-y-6">
          <div className="bg-rose-600 p-8 rounded-[32px] text-white shadow-xl shadow-rose-100">
            <h3 className="text-xl font-bold mb-4">Harvest Readiness</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl font-black">65%</div>
              <p className="text-sm text-rose-100 leading-tight">Your crop is maturing well. Expected harvest in 45 days.</p>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="w-[65%] h-full bg-white"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">Pre-harvest Checklist</h4>
            <div className="space-y-3">
              {[
                'Clean storage area',
                'Check harvester condition',
                'Contact transport labor',
                'Monitor grain moisture'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-5 h-5 border-2 border-gray-200 rounded flex items-center justify-center"></div>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
            Book Harvester Machine
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HarvestPlanning;
