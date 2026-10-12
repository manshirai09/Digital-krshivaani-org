import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  ShieldCheck, 
  IndianRupee, 
  PieChart, 
  ArrowRight, 
  FileText, 
  Bell, 
  Calendar, 
  CheckCircle2,
  X
} from 'lucide-react';

const FinancePlan: React.FC = () => {
  const { t } = useTranslation();
  const [reminders, setReminders] = useState<Record<number, boolean>>({});
  const [showToast, setShowToast] = useState<string | null>(null);

  const schemes = [
    { 
      title: 'PM-Kisan Samman Nidhi', 
      desc: 'Direct income support of ₹6,000 per year for small farmers.', 
      status: 'Active',
      deadline: '2026-04-15'
    },
    { 
      title: 'Kisan Credit Card (KCC)', 
      desc: 'Low-interest loans up to ₹3 Lakhs for crop cultivation.', 
      status: 'Apply Now',
      deadline: '2026-03-31'
    },
    { 
      title: 'Crop Insurance (PMFBY)', 
      desc: 'Protect your crops against natural calamities and pests.', 
      status: 'Apply Now',
      deadline: '2026-03-25'
    },
  ];

  const toggleReminder = (index: number, title: string) => {
    const isSetting = !reminders[index];
    setReminders(prev => ({ ...prev, [index]: isSetting }));
    
    if (isSetting) {
      setShowToast(`${t('reminder_set')}: ${title}`);
      setTimeout(() => setShowToast(null), 3000);
    }
  };

  const addToCalendar = (scheme: typeof schemes[0]) => {
    const title = encodeURIComponent(`Deadline: ${scheme.title}`);
    const details = encodeURIComponent(scheme.desc);
    const date = scheme.deadline.replace(/-/g, '');
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${date}/${date}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="font-medium">{showToast}</p>
            <button onClick={() => setShowToast(null)} className="ml-4 opacity-50 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
          <Wallet className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t('finance_insurance')}</h2>
          <p className="text-gray-500 text-sm">Manage your farming finances and government schemes.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Wallet Overview */}
          <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-[40px] p-8 text-white shadow-xl shadow-green-100 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-emerald-100 text-sm font-medium mb-1">Total Savings & Subsidies</p>
              <h3 className="text-5xl font-black mb-8">₹ 24,500</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
                  <p className="text-[10px] opacity-70 uppercase font-bold mb-1">Next Subsidy</p>
                  <p className="font-bold">₹ 2,000 (15 Mar)</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
                  <p className="text-[10px] opacity-70 uppercase font-bold mb-1">Insurance Policy</p>
                  <p className="font-bold">Active (Kharif 2025)</p>
                </div>
              </div>
            </div>
            <IndianRupee className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12" />
          </div>

          {/* Government Schemes */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center justify-between">
              {t('gov_schemes')}
              <button className="text-sm text-green-600 hover:underline">View All</button>
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {schemes.map((scheme, i) => (
                <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      <FileText className="text-green-600 w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${
                        scheme.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {scheme.status}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">{scheme.title}</h4>
                  <p className="text-[10px] text-red-500 font-bold mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {t('deadline')}: {scheme.deadline}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{scheme.desc}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <button className="text-sm font-bold text-green-600 flex items-center gap-1 hover:gap-2 transition-all">
                      Details <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleReminder(i, scheme.title)}
                        className={`p-2 rounded-xl transition-all ${
                          reminders[i] 
                            ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                        }`}
                        title={t('set_reminder')}
                      >
                        <Bell className={`w-4 h-4 ${reminders[i] ? 'animate-bounce' : ''}`} />
                      </button>
                      <button 
                        onClick={() => addToCalendar(scheme)}
                        className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-600 transition-all"
                        title={t('add_to_calendar')}
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              {t('insurance_status')}
            </h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                  <PieChart className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Policy #PMFBY-2025-001</p>
                  <p className="text-xs text-gray-400">Premium Paid: ₹ 1,250</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-500 font-medium mb-2">Coverage Details</p>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Sum Insured</span>
                  <span className="font-bold text-gray-800">₹ 1,50,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Valid Until</span>
                  <span className="font-bold text-gray-800">30 June 2026</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">
              {t('claim_insurance')}
            </button>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">{t('financial_tips')}</h4>
            <div className="space-y-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                Farmers who pay their KCC loans on time are eligible for a 3% interest subvention from the government.
              </p>
              <button className="text-sm font-bold text-green-600">Read More Tips</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePlan;
