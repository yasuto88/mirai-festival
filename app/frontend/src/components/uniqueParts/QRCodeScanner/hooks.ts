import { useCallback } from "react";

export const useQRCodeScanner = () => {
  const handleScan = useCallback(() => {
    // QRコードをスキャンするロジックをここに追加します
    console.log("QRコードをスキャンしました");
  }, []);

  return {
    handleScan,
  };
};
