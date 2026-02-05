
import React, { useState, useCallback, useMemo } from 'react';
import { PrecisionLevel, LeadSearchParams, Lead } from './types';
import { generateLeads } from './services/geminiService';
import InputGroup from './components/InputGroup';
import ResultsView from './components/ResultsView';

const App: React.FC = () => {
  const [params, setParams] = useState<LeadSearchParams>({
    category: '',
    location: '',
    quantity: 100,
    precision: PrecisionLevel.HIGH_ACCURACY,
  });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamic banner image based on the category or a high-quality default B2B image
  const bannerImageUrl = useMemo(() => {
    const defaultImg = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"; // Business Analytics
    if (!params.category) return defaultImg;
    
    // We use a high-quality curated collection for lead gen / business / technology
    return `https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000`; // Professional networking
  }, [params.category]);

  const handleGenerate = async () => {
    if (!params.category || !params.location) {
      setError("Please fill in both category and location.");
      return;
    }
    
    setError(null);
    setIsGenerating(true);
    try {
      const results = await generateLeads(params);
      setLeads(results);
      setShowResults(true);
    } catch (err) {
      setError("Failed to generate leads. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = useCallback(() => {
    setShowResults(false);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-6 bg-[#fcfafa]">
      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Widget Container */}
      <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden min-h-[600px] flex flex-col transition-all duration-500">
        
        {/* Header Section with Dynamic Image */}
        {!showResults && (
          <div className="relative h-56 w-full overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent z-10"></div>
            <img 
              src={bannerImageUrl}
              alt="Lead Generation"
              className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-[2000ms] ease-out"
            />
            <div className="absolute top-4 right-4 z-20">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                AI Powered v2.5
              </span>
            </div>
            <div className="absolute bottom-6 left-8 z-20">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary text-xl">hub</span>
                <h2 className="text-white text-2xl font-extrabold tracking-tight">LeadGen AI</h2>
              </div>
              <p className="text-white/70 text-sm font-medium leading-tight max-w-[280px]">
                Smart B2B targeting and automated business discovery dashboard.
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {showResults ? (
            <ResultsView leads={leads} onBack={handleBack} />
          ) : (
            <div className="p-8 flex flex-col gap-6">
              <InputGroup 
                label="Business Category or Name" 
                icon="corporate_fare" 
                placeholder="e.g. Marketing Agencies in London" 
                value={params.category}
                onChange={(val) => setParams(prev => ({ ...prev, category: val }))}
              />

              <InputGroup 
                label="Target Location" 
                icon="location_on" 
                placeholder="San Francisco, USA" 
                value={params.location}
                onChange={(val) => setParams(prev => ({ ...prev, location: val }))}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputGroup 
                  label="Lead Quantity" 
                  icon="numbers" 
                  placeholder="100" 
                  type="number"
                  value={params.quantity}
                  onChange={(val) => setParams(prev => ({ ...prev, quantity: parseInt(val) || 0 }))}
                />

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Precision Level</label>
                  <div className="relative">
                    <select 
                      className="w-full px-4 h-14 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900 appearance-none cursor-pointer pr-10"
                      value={params.precision}
                      onChange={(e) => setParams(prev => ({ ...prev, precision: e.target.value as PrecisionLevel }))}
                    >
                      {Object.values(PrecisionLevel).map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-500 font-bold px-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </div>
              )}

              {/* Action Button */}
              <div className="mt-2 group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                <button 
                  disabled={isGenerating}
                  onClick={handleGenerate}
                  className="relative w-full h-14 bg-gray-900 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  {isGenerating ? (
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Extracting Intelligence...</span>
                    </div>
                  ) : (
                    <div className="relative z-10 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                      <span>Generate Leads</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Footer / Status Section */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Engine: Gemini 3 Flash</span>
                </div>
                <button className="text-[11px] font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors uppercase tracking-tight">
                  View Generation Logs
                  <span className="material-symbols-outlined text-[16px]">history</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
