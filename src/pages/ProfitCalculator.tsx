import React, { useState } from 'react';
import { Calculator, IndianRupee, PieChart, TrendingUp, Wallet, ArrowRight } from 'lucide-react';

const ProfitCalculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    crop: 'Wheat',
    landArea: '',
    seedCost: '',
    fertilizerCost: '',
    laborCost: '',
    expectedYield: '',
    expectedPrice: ''
  });

  const [results, setResults] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const totalCost = Number(inputs.seedCost) + Number(inputs.fertilizerCost) + Number(inputs.laborCost);
    const totalRevenue = Number(inputs.expectedYield) * Number(inputs.expectedPrice);
    const profit = totalRevenue - totalCost;
    const roi = (profit / totalCost) * 100;

    setResults({
      totalCost,
      totalRevenue,
      profit,
      roi: roi.toFixed(1)
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center">
          <Calculator className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Profit Calculator</h2>
          <p className="text-gray-500 text-sm">Plan your finances and estimate your earnings.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-600" />
            Investment Details
          </h3>
          <form onSubmit={calculate} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Crop Name</label>
                <select 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={inputs.crop}
                  onChange={(e) => setInputs({...inputs, crop: e.target.value})}
                >
                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Mustard</option>
                  <option>Cotton</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Land Area (Acres)</label>
                <input 
                  type="number" placeholder="e.g. 5"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={inputs.landArea}
                  onChange={(e) => setInputs({...inputs, landArea: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-700">Cost per Acre (â‚¹)</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Seeds</label>
                  <input 
                    type="number" placeholder="2000"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={inputs.seedCost}
                    onChange={(e) => setInputs({...inputs, seedCost: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Fertilizer</label>
                  <input 
                    type="number" placeholder="5000"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={inputs.fertilizerCost}
                    onChange={(e) => setInputs({...inputs, fertilizerCost: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Labor</label>
                  <input 
                    type="number" placeholder="3000"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={inputs.laborCost}
                    onChange={(e) => setInputs({...inputs, laborCost: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-700">Expected Returns</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Yield (Qtl/Acre)</label>
                  <input 
                    type="number" placeholder="25"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={inputs.expectedYield}
                    onChange={(e) => setInputs({...inputs, expectedYield: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Price (â‚¹/Qtl)</label>
                  <input 
                    type="number" placeholder="2125"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={inputs.expectedPrice}
                    onChange={(e) => setInputs({...inputs, expectedPrice: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 mt-4">
              <Calculator className="w-5 h-5" />
              Calculate Profit
            </button>
          </form>
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          {!results ? (
            <div className="h-full bg-emerald-50/50 border-2 border-dashed border-emerald-200 rounded-[32px] flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <PieChart className="w-10 h-10 text-emerald-200" />
              </div>
              <h4 className="text-xl font-bold text-emerald-800/40">Financial Summary</h4>
              <p className="text-emerald-800/40 max-w-xs mt-2">Enter your costs and expected yield to see your potential profit and ROI.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-8">Profit Analysis</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Total Investment</p>
                    <p className="text-2xl font-black text-gray-800">â‚¹ {results.totalCost.toLocaleString()}</p>
                  </div>
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <p className="text-xs text-emerald-600 font-bold uppercase mb-1">Expected Profit</p>
                    <p className="text-2xl font-black text-emerald-700">â‚¹ {results.profit.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-bold text-gray-700">Return on Investment (ROI)</span>
                    </div>
                    <span className="text-lg font-black text-emerald-600">{results.roi}%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <IndianRupee className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-bold text-gray-700">Total Revenue</span>
                    </div>
                    <span className="text-lg font-black text-blue-600">â‚¹ {results.totalRevenue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-emerald-600 rounded-2xl text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="font-bold mb-1">Need a Loan?</h4>
                    <p className="text-xs text-emerald-100 mb-4">Get low-interest farming loans based on your crop plan.</p>
                    <button className="px-5 py-2 bg-white text-emerald-600 rounded-lg text-xs font-bold flex items-center gap-2">
                      Apply Now <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <IndianRupee className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
