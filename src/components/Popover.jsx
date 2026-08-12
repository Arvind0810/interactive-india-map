import { motion, AnimatePresence } from "framer-motion";

export default function Popover({ info, position, visible }) {
  if (!info || !position) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "fixed",
            zIndex: 50,
            pointerEvents: "none",
            left: position.x + 15,
            top: position.y - 10,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow:
                "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.03)",
              border: "1px solid #f3f4f6",
              padding: "16px 20px",
              minWidth: "220px",
              maxWidth: "280px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: info.color || "#3b82f6",
                  flexShrink: 0,
                }}
              />
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#1f2937",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: 0,
                }}
              >
                {info.name}
              </h3>
            </div>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#f3f4f6",
                marginBottom: "8px",
              }}
            />
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                lineHeight: 1.625,
                margin: 0,
              }}
            >
              {info.famousFor}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
