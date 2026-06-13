import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('context_api_key') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('context_api_key', apiKey);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card w-full max-w-md p-6 rounded-2xl relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg">
                <Key className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">API Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Context.dev API Key</label>
                <input 
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="ctx_..."
                  className="glass-input w-full"
                />
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p><strong>Privacy Note:</strong> Your API key is stored locally in your browser and never touches our servers.</p>
              </div>
              
              <button 
                onClick={handleSave}
                className="w-full py-2 bg-gradient-to-r from-light-accent to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                {saved ? 'Saved!' : 'Save Key'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
