import { useState } from 'react';
import { MapPin, Phone, Navigation, Search, AlertCircle, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HealthcareNearMe = () => {
  const [activeTab, setActiveTab] = useState<'hospitals' | 'pharmacies'>('pharmacies');
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // In a real app, this comes from env vars
  const isMapsApiConfigured = false; 

  const requestLocation = () => {
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
      },
      (error) => {
        setLoadingLocation(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location permission denied. Please allow location access to find nearby facilities.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("The request to get user location timed out.");
            break;
          default:
            setLocationError("An unknown error occurred getting location.");
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="text-slate-500 hover:text-primary transition-colors">
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Healthcare Near Me</h1>
        <p className="text-slate-500">Find nearby pharmacies, hospitals, and clinics.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex bg-slate-200/50 p-1 rounded-xl w-full sm:w-auto">
            <button 
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'pharmacies' ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              onClick={() => setActiveTab('pharmacies')}
            >
              Pharmacies
            </button>
            <button 
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'hospitals' ? 'bg-white text-primary shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              onClick={() => setActiveTab('hospitals')}
            >
              Hospitals
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
            />
          </div>
        </div>

        <div className="p-6">
          {!location ? (
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 bg-blue-50 flex items-center justify-center rounded-full mb-4">
                <Compass className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Location Required</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">We need your location to find {activeTab} near you. Your location is not saved or shared.</p>
              
              {locationError && (
                <div className="mb-6 p-4 bg-danger/10 text-danger rounded-xl flex items-start gap-3 max-w-md mx-auto text-left">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{locationError}</p>
                </div>
              )}

              <button 
                onClick={requestLocation}
                disabled={loadingLocation}
                className="bg-primary hover:bg-blue-800 text-white font-medium py-3 px-8 rounded-xl transition-colors disabled:opacity-70 flex items-center gap-2 mx-auto"
              >
                {loadingLocation ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                    Getting Location...
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4" /> Use My Location
                  </>
                )}
              </button>
            </div>
          ) : !isMapsApiConfigured ? (
             <div className="text-center py-12 bg-amber-50 rounded-xl border border-amber-200">
               <AlertCircle className="h-10 w-10 text-amber-600 mx-auto mb-3" />
               <h3 className="font-bold text-amber-900 mb-1">Nearby search is not configured yet.</h3>
               <p className="text-amber-700 text-sm max-w-md mx-auto">
                 The Maps/Places API provider is not configured. Please add the required API key in the environment variables to enable real-world facility search.
               </p>
             </div>
          ) : (
             <div className="text-center py-12 text-slate-500">
               Searching for {activeTab} near {location.lat.toFixed(4)}, {location.lng.toFixed(4)}...
             </div>
          )}
        </div>

      </div>
    </div>
  );
};
