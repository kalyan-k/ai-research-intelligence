import React from 'react';
import { motion } from 'framer-motion';

export default function HighlightsCard({ markdownContent }) {
  if (!markdownContent) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6 rounded-2xl h-full overflow-hidden flex flex-col"
    >
      <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">Reader View</h3>
      
      <div className="flex-1 overflow-y-auto pr-2 prose prose-sm dark:prose-invert max-w-none text-gray-800 dark:text-gray-200"
           dangerouslySetInnerHTML={{ __html: markdownContent.replace(/\n/g, '<br/>') }}
      />
    </motion.div>
  );
}
