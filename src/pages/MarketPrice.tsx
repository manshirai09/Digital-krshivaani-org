import React, { useState, useEffect } from 'react';
import { TrendingUp, Search, MapPin, ArrowUpRight, ArrowDownRight, Minus, LineChart as ChartIcon } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { mockApi } from '../services/api';

const MarketPrice: React.FC = () => {
  const [prices, setPrices] = useState<any[]>([]);
  const [trends, setTrends] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTrendLoading, setIsTrendLoading] = useState(true);

  useEffect(() => {
    mockApi.getMarketPrices().then(data => {
      setPrices(data);
      setIsLoading(false);
    });
    mockApi.getMarketTrends().then(data => {
      setTrends(data);
      setIsTrendLoading(false);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Market Price</h2>
            <p className="text-gray-500 text-sm">Live mandi rates across India.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-100 shadow-sm w-full md:w-auto">
          <Search className="w-5 h-5 text-gray-400 ml-2" />
          <input 
            type="text" 
            placeholder="Search crop or mandi..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-green-600 w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+4.2%</span>
          </div>
          <h4 className="text-gray-500 text-sm font-medium">Wheat (Avg Price)</h4>
          <p className="text-2xl font-bold text-gray-800">â‚¹ 2,125 / Qtl</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-red-600 w-5 h-5 rotate-180" />
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">-2.1%</span>
          </div>
          <h4 className="text-gray-500 text-sm font-medium">Onion (Avg Price)</h4>
          <p className="text-2xl font-bold text-gray-800">â‚¹ 1,850 / Qtl</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <MapPin className="text-blue-600 w-5 h-5" />
            </div>
          </div>
          <h4 className="text-gray-500 text-sm font-medium">Nearest Mandi</h4>
          <p className="text-2xl font-bold text-gray-800">Azadpur, Delhi</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Top Crop Prices</h3>
          <button className="text-sm text-green-600 font-bold hover:underline">View All Mandis</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Crop Name</th>
                <th className="px-6 py-4 font-bold">Mandi</th>
                <th className="px-6 py-4 font-bold">Price (â‚¹/Qtl)</th>
                <th className="px-6 py-4 font-bold">Trend</th>
                <th className="px-6 py-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                  </tr>
                ))
              ) : (
                prices.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800">{item.crop}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Azadpur Mandi</td>
                    <td className="px-6 py-4 font-bold text-gray-800">â‚¹ {item.price}</td>
                    <td className="px-6 py-4">
                      {item.trend === 'up' && <ArrowUpRight className="w-5 h-5 text-green-500" />}
                      {item.trend === 'down' && <ArrowDownRight className="w-5 h-5 text-red-500" />}
                      {item.trend === 'stable' && <Minus className="w-5 h-5 text-gray-400" />}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Trend Chart */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
            <ChartIcon className="text-indigo-600 w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Weekly Price Trend</h3>
            <p className="text-xs text-gray-400">Price variation for top crops over the last 7 days.</p>
          </div>
        </div>

        <div className="h-[300px] w-full">
          {isTrendLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl animate-pulse">
              <p className="text-sm text-gray-400">Loading trend data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  dx={-10}
                  domain={['auto', 'auto']}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }} 
                />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Wheat" 
                  stroke="#22c55e" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Rice" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Corn" 
                  stroke="#f59e0b" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketPrice;
