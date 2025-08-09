"use client"

import { motion } from "framer-motion"

export function AnimatedLogo() {
  return (
    <motion.div
      className="w-8 h-8 relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Sparkle elements */}
        <motion.circle
          cx="8"
          cy="8"
          r="2"
          fill="#3B82F6"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
        />
        <motion.circle
          cx="24"
          cy="8"
          r="1.5"
          fill="#60A5FA"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        />
        <motion.circle
          cx="8"
          cy="24"
          r="1.5"
          fill="#60A5FA"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
        <motion.circle
          cx="24"
          cy="24"
          r="2"
          fill="#3B82F6"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
        />

        {/* Central cleaning symbol */}
        <motion.path
          d="M16 6C19.866 6 23 9.134 23 13C23 16.866 19.866 20 16 20C12.134 20 9 16.866 9 13C9 9.134 12.134 6 16 6Z"
          stroke="#3B82F6"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M16 10C17.657 10 19 11.343 19 13C19 14.657 17.657 16 16 16C14.343 16 13 14.657 13 13C13 11.343 14.343 10 16 10Z"
          fill="#3B82F6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Cleaning waves */}
        <motion.path
          d="M6 26C8 24 10 24 12 26C14 28 16 28 18 26C20 24 22 24 24 26"
          stroke="#60A5FA"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.svg>
    </motion.div>
  )
}
