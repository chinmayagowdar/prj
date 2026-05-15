'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { AlertCircle, Camera, CameraOff } from 'lucide-react'

interface ProctoringMonitorProps {
  assessmentId: string
  onEvent?: (eventType: string, details?: any) => void
}

export function ProctoringMonitor({ assessmentId, onEvent }: ProctoringMonitorProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [attentionWarnings, setAttentionWarnings] = useState(0)
  const [faceDetected, setFaceDetected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setCameraActive(true)
          onEvent?.('camera_on', { timestamp: new Date() })
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to access camera'
        setError(message)
        onEvent?.('camera_error', { error: message })
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [onEvent])

  // Simulate face detection (in production, use TensorFlow.js or similar)
  useEffect(() => {
    if (!cameraActive) return

    const interval = setInterval(() => {
      // Simulated face detection - replace with actual ML model
      const detected = Math.random() > 0.15 // 85% chance face is detected
      
      if (!detected && faceDetected) {
        setAttentionWarnings(prev => prev + 1)
        onEvent?.('attention_warning', {
          type: 'face_lost',
          warnings: attentionWarnings + 1
        })
      }
      
      setFaceDetected(detected)
      if (detected) {
        onEvent?.('face_detected')
      }
    }, 3000) // Check every 3 seconds

    return () => clearInterval(interval)
  }, [cameraActive, faceDetected, attentionWarnings, onEvent])

  return (
    <Card className="border-slate-700 bg-slate-800/50 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Proctoring Monitor</h3>
          <div className="flex items-center gap-2">
            {cameraActive ? (
              <div className="flex items-center gap-2 text-green-400">
                <Camera className="h-4 w-4" />
                <span className="text-sm">Camera Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-400">
                <CameraOff className="h-4 w-4" />
                <span className="text-sm">Camera Inactive</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="flex gap-3 bg-red-900/20 border border-red-900/50 rounded-lg p-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Video feed */}
        <div className="relative bg-slate-900 rounded-lg overflow-hidden aspect-video">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!cameraActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
              <div className="text-center">
                <CameraOff className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">Camera not active</p>
              </div>
            </div>
          )}

          {/* Face detection indicator */}
          {cameraActive && (
            <div className="absolute top-4 right-4">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                faceDetected
                  ? 'bg-green-900/50 text-green-300'
                  : 'bg-red-900/50 text-red-300'
              }`}>
                {faceDetected ? '✓ Face Detected' : '✗ Face Not Detected'}
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <p className="text-slate-400 text-xs mb-1">Attention Warnings</p>
            <p className={`text-2xl font-bold ${attentionWarnings > 2 ? 'text-red-400' : 'text-slate-300'}`}>
              {attentionWarnings}
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <p className="text-slate-400 text-xs mb-1">Status</p>
            <p className={`text-lg font-bold ${faceDetected ? 'text-green-400' : 'text-yellow-400'}`}>
              {faceDetected ? 'OK' : 'Alert'}
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <p className="text-slate-400 text-xs mb-1">Integrity Score</p>
            <p className="text-lg font-bold text-blue-400">
              {Math.max(0, 100 - attentionWarnings * 10)}%
            </p>
          </div>
        </div>

        <p className="text-slate-400 text-xs text-center">
          Your assessment is being monitored for exam integrity
        </p>
      </div>
    </Card>
  )
}
