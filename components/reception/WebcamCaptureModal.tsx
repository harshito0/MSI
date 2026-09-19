'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, CheckCircle, AlertCircle, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { DEMO_VISITOR_PHOTO_FALLBACKS } from './data/receptionMockData';

interface WebcamCaptureModalProps {
  onCapture: (photoUrl: string) => void;
  onClose: () => void;
  visitorName?: string;
}

export default function WebcamCaptureModal({
  onCapture,
  onClose,
  visitorName,
}: WebcamCaptureModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Stop camera helper
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Initialize camera
  const startCamera = useCallback(async () => {
    setErrorMessage(null);
    setCapturedImage(null);
    try {
      stopCamera();
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCamera(false);
        setErrorMessage('Webcam access not supported in this environment. Please choose a sample photo below.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setHasCamera(true);
    } catch (err: unknown) {
      console.warn('Webcam permission error or camera not detected:', err);
      setHasCamera(false);
      setErrorMessage(
        'Webcam access unavailable or permission denied. You can select a preset visitor photo or upload one.'
      );
    }
  }, [stopCamera]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  // Take snapshot from video stream
  const handleSnap = () => {
    if (!videoRef.current) return;

    // Optional 3-sec countdown for realistic photo booth feeling
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          executeCapture();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 600);
  };

  const executeCapture = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = 480;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Calculate crop to center square
      const minDim = Math.min(video.videoWidth || 480, video.videoHeight || 480);
      const startX = ((video.videoWidth || 480) - minDim) / 2;
      const startY = ((video.videoHeight || 480) - minDim) / 2;

      ctx.drawImage(video, startX, startY, minDim, minDim, 0, 0, 480, 480);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  // Select demo fallback photo
  const handleSelectDemo = (url: string) => {
    setCapturedImage(url);
    stopCamera();
  };

  // Confirm photo
  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-[#E8DCCB] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FFF9EF] border-b border-[#E8DCCB] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#89190E]/10 text-[#89190E] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#10233F]">
                Live Webcam Capture
              </h3>
              <p className="text-[11px] text-[#526174]">
                {visitorName ? `Capturing official badge photo for ${visitorName}` : 'Position visitor face within the alignment guide'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 rounded-lg text-[#526174] hover:text-[#10233F] hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Area */}
        <div className="p-6 flex flex-col items-center justify-center bg-[#10233F]/5">
          {/* Main Camera Frame */}
          <div className="relative w-72 h-72 rounded-2xl overflow-hidden border-2 border-dashed border-[#89190E]/40 bg-black flex items-center justify-center shadow-inner">
            {capturedImage ? (
              // Captured preview
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={capturedImage}
                alt="Captured visitor"
                className="w-full h-full object-cover"
              />
            ) : hasCamera ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Face silhouette alignment guide */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-60 border-2 border-emerald-400/70 rounded-full border-dashed animate-pulse flex items-center justify-center">
                    <span className="text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded-full font-mono">
                      Align Face Here
                    </span>
                  </div>
                </div>

                {/* Countdown display */}
                {countdown !== null && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white font-mono animate-bounce">
                      {countdown}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 text-center text-white/80">
                <AlertCircle className="w-8 h-8 text-[#EFC988] mx-auto mb-2" />
                <p className="text-xs font-semibold">Webcam Not Active</p>
                <p className="text-[10px] text-white/60 mt-1 max-w-[200px] mx-auto">
                  Use one of the pre-set ID photos below or upload an image.
                </p>
              </div>
            )}
          </div>

          {/* Status Alert if error */}
          {errorMessage && (
            <div className="mt-3 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center space-x-2 max-w-sm text-left">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span className="text-[11px]">{errorMessage}</span>
            </div>
          )}

          {/* Quick Preset Selector Fallbacks */}
          <div className="mt-4 w-full">
            <span className="text-[11px] font-bold text-[#526174] uppercase tracking-wider block mb-2 text-center flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#89190E]" />
              <span>Or Choose Sample ID Photo (Instant 1-Click)</span>
            </span>
            <div className="flex items-center justify-center space-x-2.5">
              {DEMO_VISITOR_PHOTO_FALLBACKS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectDemo(url)}
                  className={`relative w-11 h-11 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                    capturedImage === url
                      ? 'border-[#89190E] ring-2 ring-[#89190E]/30 scale-105'
                      : 'border-[#E8DCCB] opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="px-6 py-4 bg-white border-t border-[#E8DCCB] flex items-center justify-between">
          {capturedImage ? (
            <>
              <button
                type="button"
                onClick={startCamera}
                className="px-4 py-2 rounded-xl border border-[#E8DCCB] hover:border-[#10233F] text-xs font-bold text-[#10233F] flex items-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Photo</span>
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="px-5 py-2.5 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md shadow-[#89190E]/20"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Use This Photo</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#526174] hover:bg-black/5 transition-colors"
              >
                Cancel
              </button>

              {hasCamera && (
                <button
                  type="button"
                  onClick={handleSnap}
                  className="px-6 py-2.5 rounded-xl bg-[#89190E] hover:bg-[#65130D] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-[#89190E]/30 btn-chamfered"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capture Snapshot</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
