import React from 'react';
import { Map, TrendingUp, MapPin, ArrowUpRight, Info, Phone } from 'lucide-react';

const MarketGuidance: React.FC = () => {
  const recommendations = [
    { crop: 'Wheat', bestMarket: 'Azadpur Mandi', predictedPrice: '2,250', confidence: 'High', action: 'Hold' },
    { crop: 'Mustard', bestMarket: 'Jaipur Mandi', predictedPrice: '5,800', confidence: 'Medium', action: 'Sell' },
    { crop: 'Rice', bestMarket: 'Karnal Mandi', predictedPrice: '2,100', confidence: 'High', action: 'Hold' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center">
          <Map className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Market Guidance</h2>
          <p className="text-gray-500 text-sm">Expert advice on when and where to sell.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-bold text-gray-800">Selling Recommendations</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <th className="px-6 py-4">Crop</th>
                    <th className="px-6 py-4">Best Market</th>
                    <th className="px-6 py-4">Predicted Price</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recommendations.map((rec, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-6">
                        <p className="font-bold text-gray-800">{rec.crop}</p>
                        <p className="text-[10px] text-gray-400">Confidence: {rec.confidence}</p>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-red-400" />
                          {rec.bestMarket}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <p className="font-bold text-gray-800">â‚¹ {rec.predictedPrice}</p>
                        <p className="text-[10px] text-green-500 flex items-center gap-0.5">
                          <ArrowUpRight className="w-3 h-3" /> +â‚¹150 expected
                        </p>
                      </td>
                      <td className="px-6 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          rec.action === 'Sell' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {rec.action}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-cyan-50 p-8 rounded-[32px] border border-cyan-100 flex items-start gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
              <TrendingUp className="text-cyan-600 w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-cyan-900 mb-2">Market Outlook</h4>
              <p className="text-cyan-800 text-sm leading-relaxed">
                Wheat prices are expected to peak in the second week of March due to increased export demand. 
                We recommend holding your stock for 2 more weeks to maximize profit.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-600" />
              Expert Insights
            </h4>
            <div className="space-y-6">
              {[
                { title: 'Logistics Tip', desc: 'Book transport 3 days in advance to save 10% on freight costs.' },
                { title: 'Quality Control', desc: 'Ensure grain moisture is below 12% for better market rates.' },
              ].map((insight, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider">{insight.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{insight.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-[32px] text-white">
            <h4 className="font-bold mb-4">Talk to Market Expert</h4>
            <p className="text-xs text-gray-400 mb-6">Get personalized selling strategy from our certified farming economists.</p>
            <button className="w-full py-3 bg-cyan-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-700 transition-all">
              <Phone className="w-4 h-4" />
              Request Callback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketGuidance;
