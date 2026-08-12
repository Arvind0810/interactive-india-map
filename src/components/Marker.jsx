import { motion } from "framer-motion";

export default function Marker({
  x,
  y,
  color,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  return (
    <g
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Pulse ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={isHovered ? 14 : 10}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        opacity={0.3}
        animate={{
          r: isHovered ? [14, 18, 14] : [10, 14, 10],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Outer circle */}
      <motion.circle
        cx={x}
        cy={y}
        fill={color}
        opacity={0.25}
        animate={{ r: isHovered ? 10 : 7 }}
        transition={{ duration: 0.3 }}
      />
      {/* Main circle */}
      <motion.circle
        cx={x}
        cy={y}
        fill={color}
        stroke="white"
        strokeWidth={2}
        filter="url(#rim-markerShadow)"
        animate={{ r: isHovered ? 7 : 5 }}
        transition={{ duration: 0.3 }}
      />
      {/* Inner dot */}
      <motion.circle
        cx={x}
        cy={y}
        fill="white"
        animate={{ r: isHovered ? 2.5 : 1.8 }}
        transition={{ duration: 0.3 }}
      />
    </g>
  );
}
