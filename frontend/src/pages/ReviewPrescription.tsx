import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, Edit2, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ReviewPrescription = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock extracted data
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Amoxicillin', strength: '500 mg', dose: '1 tablet', frequency: 'Twice daily', confidence: 94 },
    { id: 2, name: 'Paraceta...', strength: '650 mg', dose: '1 tablet', frequency: 'As needed', confidence: 48 },
  ]);

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate AI verification
    setTimeout(() => {
      navigate('/analysis-result');
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Review Extracted Data</h1>
        <p className="text-slate-500">Please verify the extracted medicine information before we analyze it for safety.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <ShieldAlert className="h-6 w-6 text-amber-600 mt-1 shrink-0" />
          <div>
            <h3 className="font-bold text-amber-800 mb-1">CRITICAL MEDICAL SAFETY RULE</h3>
            <p className="text-amber-700 text-sm mb-2">
              VisionoMed is an AI-assisted healthcare information system, <strong>NOT a doctor</strong>. 
              We do not guarantee that a prescription is safe or diagnose diseases. 
              Always consult a qualified healthcare professional.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Extracted Medicines</h2>
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">2 items detected</span>
        </div>
        
        <div className="divide-y divide-slate-100">
          {medicines.map((med) => (
            <div key={med.id} className="p-6 transition-colors hover:bg-slate-50">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <input 
                         type="text" 
                         value={med.name} 
                         className="font-bold text-lg text-slate-800 bg-transparent border-b border-dashed border-slate-300 focus:border-primary focus:outline-none focus:bg-white rounded px-1 -ml-1"
                         onChange={(e) => {
                           const newMeds = [...medicines];
                           const idx = newMeds.findIndex(m => m.id === med.id);
                           newMeds[idx].name = e.target.value;
                           setMedicines(newMeds);
                         }}
                       />
                       <Edit2 className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                    {med.confidence < 80 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                        <AlertTriangle className="h-3 w-3" /> Low Confidence ({med.confidence}%)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
                        <CheckCircle2 className="h-3 w-3" /> OCR {med.confidence}%
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Strength</label>
                      <input type="text" value={med.strength} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" onChange={() => {}} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Dose</label>
                      <input type="text" value={med.dose} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" onChange={() => {}} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Frequency</label>
                      <input type="text" value={med.frequency} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" onChange={() => {}} />
                    </div>
                  </div>
                  
                  {med.confidence < 80 && (
                    <div className="bg-amber-50 rounded-lg p-3 text-sm text-amber-700 flex items-start gap-2 border border-amber-100">
                      <Info className="h-4 w-4 shrink-0 mt-0.5" />
                      <p>Please verify this medicine name manually. The OCR confidence is low.</p>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/scan" className="text-slate-600 font-medium hover:text-slate-900 px-4 py-2">
            Retake Photo
          </Link>
          <button 
            onClick={handleVerify}
            disabled={isVerifying}
            className={`w-full sm:w-auto py-3 px-8 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-colors ${
              isVerifying ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-blue-800'
            }`}
          >
            {isVerifying ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                Analyzing Safety...
              </>
            ) : (
              'Confirm & Analyze'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
