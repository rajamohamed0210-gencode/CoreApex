import React from 'react';
import { motion } from 'framer-motion';
import { WhatsAppIcon } from './SocialIcons';

const WHATSAPP_URL = 'https://wa.me/message/THZ4AI7TCFGLE1';

/** Persistent WhatsApp call-to-action with a soft pulse ring. */
export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Core Apex.dev on WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="group fixed bottom-6 right-5 z-[60] flex items-center gap-2.5 rounded-full bg-[#16A34A] px-3.5 py-3 text-white shadow-[0_16px_34px_-14px_rgba(22,163,74,0.85)] transition-colors hover:bg-[#15803D] sm:right-6"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#22C55E] animate-pulse-ring" aria-hidden="true" />
      <WhatsAppIcon size={20} />
      <span className="hidden text-xs font-semibold tracking-wide sm:inline">Chat with us</span>
    </motion.a>
  );
}
