import { useRef, useState, useCallback } from "react";
import jsQR from "jsqr";

export const useQRCodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState("");

  const handleQRData = (data: string) => {
    const match = data.match(/\/buy\/(\d+)/);
    console.log("QRコードのデータ: ", data);
    if (match) {
      // window.location.href = data.startsWith("/") ? data : `/${data}`;
      window.location.href = data;
    } else {
      setError("無効なQRコードです");
    }
  };

  const handleScan = useCallback(() => {
    const constraints = {
      video: {
        facingMode: "environment",
        width: { ideal: 300 },
        height: { ideal: 300 },
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scanQrCode();
        }
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
        setError("Error accessing media devices");
      });

    const scanQrCode = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas && video) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCodeData = jsQR(
            imageData.data,
            imageData.width,
            imageData.height
          );
          if (qrCodeData) {
            console.log("QRコードをスキャンしました: ", qrCodeData.data);
            handleQRData(qrCodeData.data);
          } else {
            setTimeout(scanQrCode, 100);
          }
        }
      }
    };
  }, []);

  const stopScan = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  return {
    handleScan,
    stopScan,
    videoRef,
    canvasRef,
    error,
  };
};
