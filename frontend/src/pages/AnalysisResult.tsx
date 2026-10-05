import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Search, Info, ShieldAlert, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnalysisResult = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="text-slate-500 hover:text-primary transition-colors">
          &larr; Back to Dashboard
        </Link>
        <Link to="/visionoverify" className="flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium px-4 py-2 rounded-lg transition-colors border border-indigo-200">
          <ShieldAlert className="h-4 w-4" /> Run Authenticity Screening
        </Link>
      </div>

      <div className="bg-amber-100 border border-amber-300 rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold text-amber-900 mb-2 flex items-center justify-center gap-2">
          <AlertTriangle className="h-6 w-6" /> Review Recommended
        </h1>
        <p className="text-amber-800 font-medium">VisionoMed Analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Safety Checks Dashboard */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Safety Checks</h2>
          
          <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div>
              <p className="font-semibold text-slate-800 text-sm">OCR Confidence</p>
              <p className="text-slate-500 text-xs mt-0.5">Overall text extraction quality</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
              <CheckCircle2 className="h-4 w-4" /> 92%
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-amber-50 border border-amber-100">
            <div>
              <p className="font-semibold text-amber-900 text-sm">Prescription Completeness</p>
              <p className="text-amber-700 text-xs mt-0.5">Missing duration for some medicines</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-200 px-2.5 py-1 text-xs font-semibold text-amber-800">
              <AlertTriangle className="h-4 w-4" /> Review
            </span>
          </div>
          
          <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div>
              <p className="font-semibold text-slate-800 text-sm">Drug Interaction Check</p>
              <p className="text-slate-500 text-xs mt-0.5">Verified against known databases</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">
              <Info className="h-4 w-4" /> Verified
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div>
              <p className="font-semibold text-slate-800 text-sm">Duplicate Medication</p>
              <p className="text-slate-500 text-xs mt-0.5">Checking active ingredients</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
              <CheckCircle2 className="h-4 w-4" /> None Detected
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div>
              <p className="font-semibold text-slate-800 text-sm">Allergy Screening</p>
              <p className="text-slate-500 text-xs mt-0.5">Based on user profile data</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
              <CheckCircle2 className="h-4 w-4" /> No Conflict
            </span>
          </div>
        </div>

        {/* Medicines Detected */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Medicines Detected</h2>
          
          <div className="space-y-4">
            {/* Med 1 */}
            <div className="border border-slate-200 rounded-xl p-4 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Pill className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Amoxicillin</h3>
                    <p className="text-slate-500 text-sm">500 mg • Tablet</p>
                  </div>
                </div>
                <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-medium">94% match</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 text-xs block">Dose</span>
                  <span className="font-medium text-slate-700">1 tablet</span>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 text-xs block">Frequency</span>
                  <span className="font-medium text-slate-700">Twice daily</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-sm text-slate-600 mb-1"><strong>Used for:</strong> Bacterial infections</p>
                <p className="text-sm text-slate-600 mb-2"><strong>Precaution:</strong> Complete the full course even if feeling better.</p>
                <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                  <Info className="h-4 w-4" /> View Full Details
                </button>
              </div>
            </div>

            {/* Med 2 */}
            <div className="border border-amber-200 bg-amber-50/30 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                    <Pill className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Paracetamol</h3>
                    <p className="text-slate-500 text-sm">650 mg • Tablet</p>
                  </div>
                </div>
                <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-medium">48% match</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 text-xs block">Dose</span>
                  <span className="font-medium text-slate-700">1 tablet</span>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-500 text-xs block">Frequency</span>
                  <span className="font-medium text-slate-700">As needed</span>
                </div>
              </div>

              <div className="mt-3 p-2 bg-amber-100 text-amber-800 text-xs rounded border border-amber-200 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <p>The dosage information could not be confidently verified. Please confirm the instructions with your doctor or pharmacist.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Next Steps</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <Link to="/reminders" className="flex-1 md:flex-none text-center bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium py-2 px-6 rounded-xl transition-colors">
            Set Reminders
          </Link>
          <Link to="/healthcare" className="flex-1 md:flex-none text-center bg-primary hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-xl transition-colors">
            Find Pharmacy
          </Link>
        </div>
      </div>

    </div>
  );
};
