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
          className="fixed z-50 pointer-events-none"
          style={{
            left: position.x + 15,
            top: position.y - 10,
          }}
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 px-5 py-4 min-w-[220px] max-w-[280px]">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: info.color || "#3b82f6" }}
              />
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                {info.name}
              </h3>
            </div>
            <div className="w-full h-px bg-gray-100 mb-2" />
            <p className="text-xs text-gray-500 leading-relaxed">
              {info.famousFor}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
