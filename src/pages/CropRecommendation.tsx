import React, { useState } from 'react';
import { Sprout, MapPin, Calendar, Layers, Search, Loader2, CheckCircle2 } from 'lucide-react';
import { mockApi } from '../services/api';

const CropRecommendation: React.FC = () => {
  const [formData, setFormData] = useState({
    soilType: '',
    season: '',
    region: '',
    waterAvailability: 'High'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await mockApi.getCropRecommendation(formData);
    setResult(data);
    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
          <Sprout className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Crop Recommendation</h2>
          <p className="text-gray-500 text-sm">AI-powered suggestions for your farm.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Farm Details</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-green-600" /> Soil Type
                </label>
                <select 
                  required
                  value={formData.soilType}
                  onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Soil</option>
                  <option value="Alluvial">Alluvial Soil</option>
                  <option value="Black">Black Soil</option>
                  <option value="Red">Red Soil</option>
                  <option value="Laterite">Laterite Soil</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-600" /> Season
                </label>
                <select 
                  required
                  value={formData.season}
                  onChange={(e) => setFormData({...formData, season: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Season</option>
                  <option value="Kharif">Kharif (June-Oct)</option>
                  <option value="Rabi">Rabi (Nov-March)</option>
                  <option value="Zaid">Zaid (March-June)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" /> Region / State
              </label>
              <input 
                type="text"
                required
                placeholder="e.g. Punjab, Maharashtra"
                value={formData.region}
                onChange={(e) => setFormData({...formData, region: e.target.value})}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Water Availability</label>
              <div className="grid grid-cols-3 gap-3">
                {['Low', 'Medium', 'High'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({...formData, waterAvailability: level})}
                    className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${
                      formData.waterAvailability === level 
                        ? 'border-green-600 bg-green-50 text-green-700' 
                        : 'border-gray-100 text-gray-500 hover:border-green-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Get Recommendation
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          {!result && !isLoading && (
            <div className="h-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Sprout className="w-10 h-10 text-gray-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-400">No Recommendation Yet</h4>
              <p className="text-gray-400 max-w-xs mt-2">Fill out the form to see which crop is best for your farm.</p>
            </div>
          )}

          {isLoading && (
            <div className="h-full bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl flex flex-col items-center justify-center text-center">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
              <h4 className="text-xl font-bold text-gray-800">Analyzing Your Data</h4>
              <p className="text-gray-500 mt-2">Our AI is processing soil and climate patterns...</p>
            </div>
          )}

          {result && (
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="text-green-600 w-10 h-10" />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-bold uppercase tracking-wider">Top Recommendation</p>
                  <h3 className="text-3xl font-black text-gray-900">{result.recommendedCrop}</h3>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                  <h4 className="font-bold text-green-800 mb-2">Why this crop?</h4>
                  <p className="text-green-700 text-sm leading-relaxed">{result.reason}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium mb-1">Confidence Score</p>
                    <p className="text-xl font-bold text-gray-800">{result.confidence}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium mb-1">Expected Yield</p>
                    <p className="text-xl font-bold text-gray-800">25-30 Qtl/Ac</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="w-full py-3 border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-colors">
                    View Cultivation Guide
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;
