import React from 'react';
import { Cpu, Droplets, Thermometer, Wind, Zap, Power, Settings } from 'lucide-react';

const IoTMonitoring: React.FC = () => {
  const sensors = [
    { label: 'Soil Moisture', value: '42%', status: 'Optimal', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Air Temp', value: '28Â°C', status: 'Normal', icon: Thermometer, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Humidity', value: '65%', status: 'Normal', icon: Wind, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Battery', value: '85%', status: 'Good', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">IoT Monitoring</h2>
            <p className="text-gray-500 text-sm">Real-time sensor data from your farm.</p>
          </div>
        </div>
        <button className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 hover:bg-gray-50">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sensors.map((sensor, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${sensor.bg} rounded-2xl flex items-center justify-center`}>
                <sensor.icon className={`w-6 h-6 ${sensor.color}`} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {sensor.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{sensor.label}</p>
            <p className="text-3xl font-black text-gray-800 mt-1">{sensor.value}</p>
          </div>
        ))}
      </div>

      {/* Irrigation Control */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-800">Irrigation System</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs font-bold text-gray-400 uppercase">System Online</span>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { name: 'Main Pump', status: 'Off', lastRun: '2h ago' },
              { name: 'Drip Zone A', status: 'On', lastRun: 'Active' },
              { name: 'Drip Zone B', status: 'Off', lastRun: '5h ago' },
            ].map((pump, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${pump.status === 'On' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'} rounded-xl flex items-center justify-center`}>
                    <Power className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{pump.name}</h4>
                    <p className="text-xs text-gray-400">Last run: {pump.lastRun}</p>
                  </div>
                </div>
                <button className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
                  pump.status === 'On' 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-100'
                }`}>
                  {pump.status === 'On' ? 'Stop' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 p-8 rounded-[32px] text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4">Device Health</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Gateway Connectivity</span>
                  <span className="text-green-400 font-bold">98%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-green-400"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Sensor Sync Rate</span>
                  <span className="text-blue-400 font-bold">92%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-blue-400"></div>
                </div>
              </div>
            </div>
            <div className="mt-12 p-4 bg-slate-700 rounded-2xl border border-slate-600">
              <p className="text-xs text-slate-400 leading-relaxed">
                All 12 sensors are reporting correctly. Next scheduled maintenance in 15 days.
              </p>
            </div>
          </div>
          <Cpu className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default IoTMonitoring;
