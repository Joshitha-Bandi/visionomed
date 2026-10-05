import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, Info, ScanLine, FileWarning, Search, Building2, UserCircle2, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

export const VisionoVerify = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      <div className="flex items-center gap-4 mb-4">
        <Link to="/analysis-result" className="text-slate-500 hover:text-primary transition-colors">
          &larr; Back to Analysis Results
        </Link>
      </div>

      <div className="bg-gradient-to-r from-primary to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-8 w-8 text-blue-200" />
            <h1 className="text-3xl font-bold">VisionoVerify</h1>
          </div>
          <p className="text-blue-100 max-w-xl">Prescription Authenticity & Suspicion Screening</p>
        </div>
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          <Shield className="h-64 w-64" />
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <Info className="h-6 w-6 text-amber-600 mt-1 shrink-0" />
          <div>
            <h3 className="font-bold text-amber-900 mb-1">Important Authenticity Notice</h3>
            <p className="text-amber-800 text-sm">
              VisionoVerify performs automated screening to identify potentially suspicious or altered prescriptions. 
              <strong> An AI cannot conclusively establish legal or medical authenticity from an image alone.</strong> 
              We do not declare prescriptions "100% Genuine" or "Fake".
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border-2 border-amber-200 bg-amber-50/50">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Authenticity Assessment</p>
            <h2 className="text-2xl font-bold text-amber-700 flex items-center gap-2">
              <ShieldAlert className="h-6 w-6" /> Verification Recommended
            </h2>
          </div>
          <p className="text-sm text-slate-600 md:text-right max-w-sm">
            Potential inconsistencies detected in the document structure and missing verification identifiers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Tampering Detection */}
          <div className="border border-slate-100 rounded-xl p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                <ScanLine className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-800">Tampering Detection</h3>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Analyzes fonts, alignment, compression artifacts, and spacing.
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <ShieldCheck className="h-4 w-4 text-success" />
              No obvious signs of digital editing detected.
            </div>
          </div>

          {/* Document Structure */}
          <div className="border border-amber-200 bg-amber-50/30 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                <FileWarning className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-800">Structure & Consistency</h3>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Checks for required fields, date formatting, and dosage consistency.
            </p>
            <div className="inline-flex items-start gap-2 text-sm font-medium text-amber-800 bg-amber-100 px-3 py-2 rounded-lg border border-amber-200">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              Patient and hospital details found. Missing signature. Dosage information for one medicine requires review.
            </div>
          </div>

          {/* Doctor Verification */}
          <div className="border border-slate-100 rounded-xl p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                  <UserCircle2 className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800">Doctor Information</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">Name</span>
                <span className="font-medium text-slate-800">Dr. Sharma</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">Registration</span>
                <span className="font-medium text-slate-400">Not detected</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Info className="h-4 w-4 text-slate-400" />
              Unable to verify registration
            </div>
          </div>

          {/* Hospital / Clinic */}
          <div className="border border-slate-100 rounded-xl p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800">Hospital / Clinic</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">Name</span>
                <span className="font-medium text-slate-800">City Care Hospital</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
              <Search className="h-4 w-4" />
              Information match unverified
            </div>
          </div>

          {/* Digital Signature & QR */}
          <div className="border border-slate-100 rounded-xl p-5 hover:border-primary/20 transition-colors md:col-span-2">
            <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Digital Verification Identifiers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="block text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">Physical Signature</span>
                <span className="font-bold text-slate-700">Not Detected</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="block text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">Digital Signature</span>
                <span className="font-bold text-slate-700">Not Detected</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col items-center justify-center">
                <span className="block text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">Verification QR/Barcode</span>
                <div className="flex items-center gap-1 font-bold text-slate-700">
                  <QrCode className="h-4 w-4 text-slate-400" />
                  Not Detected
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};
