import React from "react";
import { Box, Button, Typography, Modal, Sheet, ModalClose } from "@mui/joy";

type Props = {
  onScan: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  error: string;
  open: boolean;
  onClose: () => void;
};

const QRCodeScannerPresenter: React.FC<Props> = ({
  onScan,
  videoRef,
  canvasRef,
  error,
  open,
  onClose,
}) => (
  <Box sx={{ padding: 2 }}>
    <Button variant="outlined" color="primary" onClick={onScan}>
      QRコードを読む
    </Button>

    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" onClick={onClose} sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          QRコードスキャナー
        </Typography>
        <div
          style={{
            position: "relative",
            width: 300,
            height: 300,
            margin: "0 auto",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: 300, height: 300, display: "block" }}
          />
          <canvas
            ref={canvasRef}
            width="300"
            height="300"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </div>
        {error && (
          <Typography id="modal-desc" textColor="text.tertiary" color="danger">
            {error}
          </Typography>
        )}
      </Sheet>
    </Modal>
  </Box>
);

export default QRCodeScannerPresenter;
