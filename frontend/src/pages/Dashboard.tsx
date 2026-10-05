import React from 'react';
import { Camera, Upload, Pill, FileText, AlertCircle, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome to VisionoMed</h1>
        <p className="text-slate-500">Scan, verify, and understand your medical prescriptions.</p>
      </div>

      {/* Primary Action Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-semibold mb-4 text-slate-800">Scan Prescription</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/scan?camera=true" className="flex flex-col items-center justify-center p-8 bg-primary/5 rounded-xl border border-primary/20 hover:bg-primary/10 transition-colors text-primary cursor-pointer">
            <Camera className="h-10 w-10 mb-3" />
            <span className="font-medium">Use Camera</span>
          </Link>
          <Link to="/scan" className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors text-slate-600 cursor-pointer">
            <Upload className="h-10 w-10 mb-3" />
            <span className="font-medium">Upload Image or PDF</span>
          </Link>
        </div>
      </div>

      {/* Emergency Card */}
      <div className="bg-danger/10 border border-danger/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-danger text-white p-3 rounded-full">
            <Phone className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-danger mb-1">Need Emergency Help?</h2>
            <p className="text-danger/80 mb-4 text-sm">If you're experiencing a medical emergency, seek professional care immediately.</p>
            <Link to="/emergency" className="inline-block bg-danger hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Get Emergency Help
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Medicines */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4 flex items-center justify-between text-slate-800">
            <span>Today's Medicines</span>
            <Link to="/reminders" className="text-primary text-sm font-medium hover:underline">View All</Link>
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Pill className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Amoxicillin</p>
                  <p className="text-xs text-slate-500">500mg • After Food</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-800">09:00 AM</p>
                <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">Taken</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Prescriptions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4 flex items-center justify-between text-slate-800">
            <span>Recent Prescriptions</span>
            <Link to="/history" className="text-primary text-sm font-medium hover:underline">View History</Link>
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 p-3 rounded-lg text-slate-500">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Dr. Sharma's Clinic</p>
                  <p className="text-sm text-slate-500">Oct 4, 2026 • 3 Medicines</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Review Recommended
                </span>
                <button className="text-primary font-medium text-sm hover:underline">View Analysis</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Healthcare Near Me */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-semibold mb-4 text-slate-800">Healthcare Near Me</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <Link to="/healthcare" className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
             <MapPin className="h-6 w-6 text-slate-600 mb-2" />
             <span className="text-sm font-medium text-slate-700">Hospitals</span>
           </Link>
           <Link to="/healthcare" className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
             <MapPin className="h-6 w-6 text-slate-600 mb-2" />
             <span className="text-sm font-medium text-slate-700">Pharmacies</span>
           </Link>
        </div>
      </div>
    </div>
  );
};
