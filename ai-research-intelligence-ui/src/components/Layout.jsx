import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { Settings, Info, Search } from 'lucide-react';

export default function Layout({ children, onOpenSettings, setView }) {
  return (
    <div className="min-h-screen flex flex-col relative w-full z-10 overflow-hidden">
      {/* Ambient Background Orbs */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>
      
      {/* Top Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-card sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-light-accent to-dark-accent flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Context Lens</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <button onClick={() => setView('about')} className="hover:text-light-accent dark:hover:text-dark-accent transition-colors flex items-center gap-1 text-sm font-medium">
            <Info className="w-4 h-4" /> About
          </button>
          <button onClick={() => setView('input')} className="hover:text-light-accent dark:hover:text-dark-accent transition-colors flex items-center gap-1 text-sm font-medium">
            <Search className="w-4 h-4" /> Research
          </button>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
          <button 
            id="tour-settings"
            onClick={onOpenSettings} 
            className="p-2 rounded-full glass-card hover:scale-105 transition-transform"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <ThemeToggle />
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>
    </div>
  );
}
