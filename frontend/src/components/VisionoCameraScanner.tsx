import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, SwitchCamera, X, Zap, ZapOff, Check, RotateCcw } from 'lucide-react';

interface VisionoCameraScannerProps {
  onCapture: (blob: Blob) => void;
  onClose: () => void;
}

export const VisionoCameraScanner: React.FC<VisionoCameraScannerProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  
  // Torch/Flash state
  const [supportsTorch, setSupportsTorch] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const startCamera = useCallback(async (mode: 'environment' | 'user') => {
    stopCamera();
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: mode } },
        audio: false,
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      // Check for torch support
      const track = mediaStream.getVideoTracks()[0];
      const capabilities = track.getCapabilities?.() || {};
      // @ts-ignore
      if (capabilities.torch) {
        setSupportsTorch(true);
      } else {
        setSupportsTorch(false);
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow access in your browser settings.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else if (err.name === 'NotReadableError') {
        setError('Camera is already in use by another application.');
      } else {
        setError(`Camera error: ${err.message || 'Unknown error'}`);
      }
    }
  }, [stopCamera]);

  useEffect(() => {
    if (window.isSecureContext === false && location.hostname !== 'localhost') {
      setError('Camera access requires HTTPS context.');
      return;
    }
    startCamera(facingMode);
    return () => {
      stopCamera();
    };
  }, [facingMode]); // Intentionally not including startCamera to avoid loops

  const toggleTorch = async () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    try {
      const newTorchState = !torchOn;
      // @ts-ignore
      await track.applyConstraints({ advanced: [{ torch: newTorchState }] });
      setTorchOn(newTorchState);
    } catch (e) {
      console.error('Failed to toggle torch', e);
    }
  };

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video source
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(dataUrl);
    
    canvas.toBlob((blob) => {
      if (blob) {
        setCapturedBlob(blob);
      }
    }, 'image/jpeg', 0.9);
    
    stopCamera();
  };

  const retake = () => {
    setCapturedImage(null);
    setCapturedBlob(null);
    startCamera(facingMode);
  };

  const handleUseImage = () => {
    if (capturedBlob) {
      onCapture(capturedBlob);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="flex justify-between items-center p-4 bg-black text-white">
        <button onClick={() => { stopCamera(); onClose(); }} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
          <X className="h-6 w-6" />
        </button>
        <span className="font-semibold text-lg">Scan Prescription</span>
        <div className="w-10"></div> {/* Placeholder to center text */}
      </div>

      <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
        {error ? (
          <div className="text-center p-6 text-white max-w-sm">
            <div className="bg-red-500/20 text-red-200 p-4 rounded-lg border border-red-500/50 mb-6">
              {error}
            </div>
            <button onClick={() => { stopCamera(); onClose(); }} className="bg-white text-black px-6 py-2 rounded-lg font-medium mr-3">
              Close
            </button>
            <button onClick={() => startCamera(facingMode)} className="bg-primary text-white px-6 py-2 rounded-lg font-medium">
              Try Again
            </button>
          </div>
        ) : capturedImage ? (
          <img src={capturedImage} alt="Captured prescription" className="max-h-full max-w-full object-contain" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute min-w-full min-h-full object-cover"
          />
        )}
        
        {/* Hidden canvas for capturing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {!error && (
        <div className="bg-black p-6 pb-safe">
          {capturedImage ? (
            <div className="flex justify-between items-center gap-4 max-w-md mx-auto">
              <button onClick={retake} className="flex-1 py-4 bg-slate-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-700 transition">
                <RotateCcw className="h-5 w-5" /> Retake
              </button>
              <button onClick={handleUseImage} className="flex-1 py-4 bg-primary text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition">
                <Check className="h-5 w-5" /> Use Image
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center max-w-md mx-auto">
              <button onClick={() => setFacingMode(prev => prev === 'environment' ? 'user' : 'environment')} className="p-4 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition">
                <SwitchCamera className="h-6 w-6" />
              </button>
              
              <button onClick={capture} className="h-20 w-20 rounded-full border-4 border-white flex items-center justify-center bg-transparent">
                <div className="h-16 w-16 bg-white rounded-full hover:bg-slate-200 transition"></div>
              </button>

              {supportsTorch ? (
                <button onClick={toggleTorch} className="p-4 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition">
                  {torchOn ? <ZapOff className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
                </button>
              ) : (
                <div className="w-[56px] h-[56px]"></div> /* Placeholder for alignment */
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
