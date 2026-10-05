import { useState } from 'react';
import { Phone, MapPin, AlertTriangle, Users, Share2, Compass, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Emergency = () => {
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // In a real app, this would load from Supabase
  const emergencyContact = null; // { name: 'Wife', phone: '9876543210' }

  const handleShareLocation = () => {
    setLoadingLocation(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoadingLocation(false);
        // Here you would typically trigger the Web Share API or send an SMS
        if (navigator.share) {
          navigator.share({
            title: 'Emergency Location',
            text: 'I need help. My current location is:',
            url: `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`
          }).catch(console.error);
        } else {
          alert(`Your location: https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`);
        }
      },
      (error) => {
        setLoadingLocation(false);
        setLocationError("Location permission denied or unavailable.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      <div className="flex items-center mb-4">
        <Link to="/" className="text-slate-500 hover:text-primary transition-colors">
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="bg-red-600 rounded-2xl p-8 text-white shadow-lg text-center relative overflow-hidden">
        <AlertTriangle className="h-24 w-24 absolute -right-4 -top-4 opacity-10" />
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <AlertTriangle className="h-10 w-10" /> EMERGENCY
        </h1>
        <p className="text-red-100 text-lg max-w-xl mx-auto font-medium">
          If you believe this is an emergency, contact emergency services immediately. VisionoMed cannot diagnose or provide emergency care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Official Emergency Services */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-red-100 p-6 flex flex-col items-center justify-center text-center space-y-4 hover:border-red-300 transition-colors">
          <div className="bg-red-100 p-4 rounded-full text-red-600">
            <Phone className="h-10 w-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">National Emergency Number</h2>
            <p className="text-slate-500 mt-1">Police, Fire, Ambulance</p>
          </div>
          <a 
            href="tel:112"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
          >
            <Phone className="h-5 w-5" /> Call 112
          </a>
        </div>

        {/* Personal Emergency Contact */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="bg-slate-100 p-4 rounded-full text-slate-600">
            <Users className="h-10 w-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Emergency Contact</h2>
            <p className="text-slate-500 mt-1">
              {emergencyContact ? `Call ${emergencyContact.name}` : 'No contact configured'}
            </p>
          </div>
          
          {emergencyContact ? (
            <a 
              href={`tel:${emergencyContact.phone}`}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" /> Call Contact
            </a>
          ) : (
            <button disabled className="w-full bg-slate-100 text-slate-400 font-bold py-4 rounded-xl cursor-not-allowed">
              Phone number unavailable
            </button>
          )}
        </div>

        {/* Location Sharing */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:col-span-2">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-blue-50 p-4 rounded-full text-blue-600 shrink-0">
              <Compass className="h-8 w-8" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-bold text-slate-900">Share Current Location</h2>
              <p className="text-slate-500 text-sm mt-1 mb-4">Send your exact GPS coordinates to emergency contacts or services.</p>
              
              {locationError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2 text-left border border-red-100">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  {locationError}
                </div>
              )}

              <button 
                onClick={handleShareLocation}
                disabled={loadingLocation}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loadingLocation ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                    Acquiring GPS...
                  </>
                ) : location ? (
                  <>
                    <Share2 className="h-4 w-4" /> Share Location Again
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4" /> Get & Share Location
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
