
import React from 'react';
import { Lead } from '../types';

interface ResultsViewProps {
  leads: Lead[];
  onBack: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ leads, onBack }) => {
  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-8 pt-6 pb-4 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-secondary transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Search
        </button>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {leads.length} Leads Found
        </div>
      </div>

      <div className="p-4 overflow-y-auto max-h-[500px] flex flex-col gap-4">
        {leads.map((lead) => (
          <div key={lead.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-primary/30 transition-all group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{lead.businessName}</h3>
              <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
                {lead.score}% MATCH
              </span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
              {lead.description}
            </p>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <div className="flex items-center gap-1 text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                <span className="material-symbols-outlined text-xs">mail</span>
                {lead.email}
              </div>
              <div className="flex items-center gap-1 text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                <span className="material-symbols-outlined text-xs">public</span>
                {lead.website}
              </div>
              {lead.contactPerson && (
                <div className="flex items-center gap-1 text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                  <span className="material-symbols-outlined text-xs">person</span>
                  {lead.contactPerson}
                </div>
              )}
            </div>
            <button className="mt-4 w-full py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              View Profile
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white border-t border-gray-100 mt-auto">
        <button className="w-full h-12 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">download</span>
          Export as CSV
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
