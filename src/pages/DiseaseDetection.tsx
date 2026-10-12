import React, { useState, useRef } from 'react';
import { Bug, Camera, Upload, X, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

const DiseaseDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Mock AI analysis
    setTimeout(() => {
      setResult({
        disease: 'Late Blight',
        crop: 'Potato',
        confidence: 94,
        severity: 'Moderate',
        treatment: [
          'Apply Mancozeb or Chlorothalonil fungicide immediately.',
          'Remove and destroy infected leaves to prevent spread.',
          'Improve air circulation by proper spacing.'
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center">
          <Bug className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Disease Detection</h2>
          <p className="text-gray-500 text-sm">Identify crop diseases instantly using AI.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Upload Crop Photo</h3>
          
          {!selectedImage ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-[32px] p-12 flex flex-col items-center justify-center cursor-pointer hover:border-red-300 hover:bg-red-50/30 transition-all group"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Camera className="w-10 h-10 text-gray-300 group-hover:text-red-400" />
              </div>
              <p className="font-bold text-gray-500">Click to capture or upload</p>
              <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG (Max 5MB)</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-[32px] overflow-hidden border-4 border-white shadow-lg aspect-video">
                <img src={selectedImage} alt="Selected crop" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-100 hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <Bug className="w-5 h-5" />
                    Detect Disease
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          {!result && !isAnalyzing && (
            <div className="h-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Bug className="w-10 h-10 text-gray-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-400">Analysis Result</h4>
              <p className="text-gray-400 max-w-xs mt-2">Upload a photo of your crop's leaves or stem to see the diagnosis.</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="h-full bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl flex flex-col items-center justify-center text-center">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-red-100 rounded-full animate-ping absolute inset-0"></div>
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center relative z-10">
                  <Bug className="w-12 h-12 text-red-500 animate-pulse" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mt-8">Scanning for Pests</h4>
              <p className="text-gray-500 mt-2">Our AI is comparing your photo with thousands of disease patterns...</p>
            </div>
          )}

          {result && (
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="text-red-600 w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-sm text-red-600 font-bold uppercase tracking-wider">Diagnosis Result</p>
                    <h3 className="text-3xl font-black text-gray-900">{result.disease}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium mb-1">Confidence</p>
                  <p className="text-2xl font-black text-red-600">{result.confidence}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium mb-1">Affected Crop</p>
                  <p className="text-lg font-bold text-gray-800">{result.crop}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium mb-1">Severity Level</p>
                  <p className="text-lg font-bold text-orange-600">{result.severity}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Recommended Treatment
                </h4>
                <div className="space-y-3">
                  {result.treatment.map((step: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-400 shrink-0 mt-0.5 border border-gray-100">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                <button className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors">
                  Buy Fungicide
                </button>
                <button className="flex-1 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                  Save Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
