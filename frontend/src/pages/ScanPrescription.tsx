import { useState, useEffect } from 'react';
import { Camera, Upload, AlertCircle, FileImage, FileText, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { VisionoCameraScanner } from '../components/VisionoCameraScanner';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const ScanPrescription = () => {
  const [selectedFile, setSelectedFile] = useState<File | Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('camera') === 'true') {
      setShowScanner(true);
    }
  }, [location]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid JPG, PNG, or PDF file.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setError('File size must be less than 10MB.');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleCameraCapture = (blob: Blob) => {
    setSelectedFile(blob);
    setPreviewUrl(URL.createObjectURL(blob));
    setShowScanner(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      if (isSupabaseConfigured && supabase) {
        const fileExt = 'name' in selectedFile ? selectedFile.name.split('.').pop() : 'jpg';
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `prescriptions/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('prescriptions')
          .upload(filePath, selectedFile);
          
        if (uploadError) throw uploadError;
        
        // TODO: Call Edge Function or FastAPI for OCR
      }
      
      // Navigate to review step (simulated for now until Edge Function handles OCR response)
      setTimeout(() => {
        setIsProcessing(false);
        navigate('/review-prescription');
      }, 2000);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to upload prescription. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {showScanner && (
        <VisionoCameraScanner 
          onCapture={handleCameraCapture} 
          onClose={() => setShowScanner(false)} 
        />
      )}

      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="text-slate-500 hover:text-primary transition-colors">
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Scan Prescription</h1>
        <p className="text-slate-500">Upload an image or PDF of your medical prescription for AI analysis.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        {error && (
          <div className="mb-6 p-4 bg-danger/10 text-danger rounded-xl flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {!selectedFile ? (
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-primary/50 transition-colors bg-slate-50">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-4 rounded-full shadow-sm">
                <Upload className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Upload or Drag & Drop</h3>
            <p className="text-slate-500 text-sm mb-6">Supports JPG, PNG, and PDF (Max 10MB)</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <label className="cursor-pointer bg-primary hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-colors w-full sm:w-auto text-center">
                Browse Files
                <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} />
              </label>
              <button 
                onClick={() => setShowScanner(true)}
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium py-3 px-6 rounded-xl transition-colors w-full sm:w-auto"
              >
                <Camera className="h-5 w-5" />
                Open Camera
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
              {selectedFile.type?.includes('pdf') ? (
                <FileText className="h-10 w-10 text-primary" />
              ) : previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-slate-200" />
              ) : (
                <FileImage className="h-10 w-10 text-primary" />
              )}
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 truncate">
                  {'name' in selectedFile ? (selectedFile as File).name : 'captured_image.jpg'}
                </p>
                <p className="text-sm text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button 
                onClick={() => {
                  setSelectedFile(null);
                  if (previewUrl) URL.revokeObjectURL(previewUrl);
                  setPreviewUrl(null);
                }}
                className="text-slate-400 hover:text-danger p-2 font-medium"
                disabled={isProcessing}
              >
                Remove
              </button>
            </div>

            <button
              onClick={handleUpload}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-colors ${
                isProcessing ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-blue-800'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                  Uploading & Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Process Prescription
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
