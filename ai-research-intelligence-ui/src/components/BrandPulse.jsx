import React from 'react';
import { motion } from 'framer-motion';

export default function BrandPulse({ data }) {
  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center h-full"
    >
      <h3 className="text-xl font-semibold mb-6">Brand Pulse</h3>
      
      {data.logo ? (
        <div className="w-24 h-24 mb-6 rounded-2xl bg-white/10 flex items-center justify-center p-4">
          <img src={data.logo} alt="Brand Logo" className="max-w-full max-h-full object-contain" />
        </div>
      ) : (
        <div className="w-24 h-24 mb-6 rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-gray-400">No Logo</span>
        </div>
      )}

      {data.colors && data.colors.length > 0 && (
        <div className="w-full mb-6">
          <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Color Palette</h4>
          <div className="flex justify-center gap-2">
            {data.colors.map((color, idx) => (
              <div 
                key={idx} 
                className="w-8 h-8 rounded-full shadow-sm border border-gray-200 dark:border-gray-700" 
                style={{ backgroundColor: color }}
                title={color}
              ></div>
            ))}
          </div>
        </div>
      )}

      {data.socials && Object.keys(data.socials).length > 0 && (
        <div className="w-full">
          <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Social Links</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(data.socials).map(([platform, url]) => (
              <a 
                key={platform} 
                href={url} 
                target="_blank" 
                rel="noreferrer"
                className="px-3 py-1 text-xs rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors capitalize"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
