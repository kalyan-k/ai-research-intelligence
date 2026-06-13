import React from 'react';
import { motion } from 'framer-motion';

export default function MediaGallery({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6 rounded-2xl col-span-1 md:col-span-2 lg:col-span-3"
    >
      <h3 className="text-xl font-semibold mb-4">Media Gallery</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.slice(0, 8).map((src, idx) => (
          <div key={idx} className="aspect-video bg-black/10 dark:bg-white/5 rounded-xl overflow-hidden hover:scale-105 transition-transform">
            <img src={src} alt={`Media ${idx}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
