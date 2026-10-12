import React, { useState } from 'react';
import { FlaskConical, Beaker, Info, CheckCircle2, AlertCircle } from 'lucide-react';

const SoilHealth: React.FC = () => {
  const [soilData, setSoilData] = useState({
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: ''
  });

  const [report, setReport] = useState<any>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock analysis
    setReport({
      status: 'Good',
      score: 82,
      recommendations: [
        'Add 20kg/acre of Nitrogen-based fertilizer.',
        'Maintain current irrigation levels.',
        'Consider crop rotation with legumes to improve organic matter.'
      ],
      nutrients: {
        N: 'Low',
        P: 'Optimal',
        K: 'Optimal'
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center">
          <FlaskConical className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Soil Health Analysis</h2>
          <p className="text-gray-500 text-sm">Monitor and improve your soil quality.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Beaker className="w-5 h-5 text-amber-600" />
              Enter Lab Results
            </h3>
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">pH Level</label>
                <input 
                  type="number" step="0.1" placeholder="e.g. 6.5"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  value={soilData.ph}
                  onChange={(e) => setSoilData({...soilData, ph: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">N (mg/kg)</label>
                  <input 
                    type="number" placeholder="N"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    value={soilData.nitrogen}
                    onChange={(e) => setSoilData({...soilData, nitrogen: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">P (mg/kg)</label>
                  <input 
                    type="number" placeholder="P"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    value={soilData.phosphorus}
                    onChange={(e) => setSoilData({...soilData, phosphorus: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">K (mg/kg)</label>
                  <input 
                    type="number" placeholder="K"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    value={soilData.potassium}
                    onChange={(e) => setSoilData({...soilData, potassium: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Organic Matter (%)</label>
                <input 
                  type="number" step="0.1" placeholder="e.g. 2.5"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  value={soilData.organicMatter}
                  onChange={(e) => setSoilData({...soilData, organicMatter: e.target.value})}
                />
              </div>
              <button className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all mt-4">
                Generate Report
              </button>
            </form>
          </div>
        </div>

        {/* Report Section */}
        <div className="lg:col-span-2">
          {!report ? (
            <div className="h-full bg-amber-50/50 border-2 border-dashed border-amber-200 rounded-[32px] flex flex-col items-center justify-center p-12 text-center">
              <FlaskConical className="w-16 h-16 text-amber-200 mb-4" />
              <h4 className="text-xl font-bold text-amber-800/40">No Analysis Data</h4>
              <p className="text-amber-800/40 max-w-xs mt-2">Enter your soil test results to get a detailed health report and fertilizer recommendations.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm text-amber-600 font-bold uppercase tracking-wider">Soil Health Status</p>
                    <h3 className="text-3xl font-black text-gray-900">{report.status}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium mb-1">Health Score</p>
                    <p className="text-4xl font-black text-green-600">{report.score}/100</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {Object.entries(report.nutrients).map(([key, val]: any) => (
                    <div key={key} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                      <p className="text-xs font-bold text-gray-500 mb-1">{key === 'N' ? 'Nitrogen' : key === 'P' ? 'Phosphorus' : 'Potassium'}</p>
                      <p className={`font-bold ${val === 'Low' ? 'text-red-500' : 'text-green-600'}`}>{val}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <Info className="w-5 h-5 text-amber-600" />
                    Key Recommendations
                  </h4>
                  <div className="space-y-3">
                    {report.recommendations.map((rec: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800 leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-amber-600 p-6 rounded-[32px] text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Need a Soil Test?</h4>
                    <p className="text-xs text-amber-100">Book a professional soil testing kit from our shop.</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-white text-amber-600 rounded-xl font-bold hover:bg-amber-50 transition-colors">
                  Order Kit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoilHealth;
