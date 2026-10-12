import React, { useState, useEffect } from 'react';
import { CloudSun, Wind, Droplets, CloudRain, Thermometer, MapPin, Loader2 } from 'lucide-react';
import { mockApi } from '../services/api';

const WeatherUpdates: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mockApi.getWeather(28.6139, 77.2090).then(data => {
      setWeather(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Fetching live weather data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center">
            <CloudSun className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Weather Updates</h2>
            <p className="text-gray-500 text-sm">Real-time alerts for your farm location.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
          <MapPin className="w-4 h-4 text-red-500" />
          <span className="text-sm font-bold text-gray-700">Ludhiana, Punjab</span>
        </div>
      </div>

      {/* Current Weather Card */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-[40px] p-8 text-white shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="flex items-center gap-8">
            <div className="text-7xl font-black">{weather.temp}Â°</div>
            <div>
              <h3 className="text-3xl font-bold">{weather.condition}</h3>
              <p className="text-sky-100">Feels like {weather.temp - 2}Â°</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center">
              <Droplets className="w-6 h-6 mx-auto mb-2 opacity-80" />
              <p className="text-xs opacity-70">Humidity</p>
              <p className="font-bold">{weather.humidity}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center">
              <CloudRain className="w-6 h-6 mx-auto mb-2 opacity-80" />
              <p className="text-xs opacity-70">Rain Prob.</p>
              <p className="font-bold">{weather.rainProb}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center">
              <Wind className="w-6 h-6 mx-auto mb-2 opacity-80" />
              <p className="text-xs opacity-70">Wind</p>
              <p className="font-bold">12 km/h</p>
            </div>
          </div>
        </div>
        <CloudSun className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12" />
      </div>

      {/* Forecast Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-gray-800">7-Day Forecast</h3>
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            {weather.forecast.map((day: any, i: number) => (
              <div key={i} className={`flex items-center justify-between p-6 ${i !== weather.forecast.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div className="w-20 font-bold text-gray-700">{day.day}</div>
                <div className="flex items-center gap-3">
                  {day.condition === 'Sunny' && <CloudSun className="w-6 h-6 text-orange-400" />}
                  {day.condition === 'Cloudy' && <CloudSun className="w-6 h-6 text-gray-400" />}
                  {day.condition === 'Rain' && <CloudRain className="w-6 h-6 text-blue-400" />}
                  <span className="text-sm text-gray-500">{day.condition}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-800">{day.temp}Â°</span>
                  <span className="text-gray-400 text-sm">{day.temp - 6}Â°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800">Agriculture Alerts</h3>
          <div className="space-y-4">
            <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 flex gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <Thermometer className="text-orange-600 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-orange-800 text-sm">Heatwave Warning</h4>
                <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                  Temperatures may rise above 40Â°C in the next 48 hours. Ensure proper irrigation for your crops.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <CloudRain className="text-blue-600 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-blue-800 text-sm">Light Rain Expected</h4>
                <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                  Scattered rainfall expected on Wednesday. Postpone any fertilizer application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherUpdates;
