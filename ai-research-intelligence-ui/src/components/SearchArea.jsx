import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function SearchArea({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] max-w-3xl mx-auto w-full text-center"
    >
      <motion.div 
        className="w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-light-accent to-blue-500 flex items-center justify-center shadow-lg animate-float"
      >
        <Search className="w-10 h-10 text-white" />
      </motion.div>
      
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-light-accent to-blue-600 dark:from-dark-accent dark:to-blue-400">
        Discover Context
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10">
        Enter a keyword for real-time web research, a domain for brand data, or a URL to scrape.
      </p>

      <form onSubmit={handleSubmit} className="w-full relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-light-accent to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative glass-card rounded-2xl flex items-center p-2">
          <input 
            id="tour-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. latest AI trends, apple.com, or https://example.com/article"
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-lg px-4 py-3 placeholder-gray-400 dark:placeholder-gray-500 text-light-text dark:text-dark-text"
          />
          <button 
            id="tour-submit"
            type="submit"
            disabled={isLoading || !query.trim()}
            className="ml-2 px-6 py-3 rounded-xl bg-light-text text-white dark:bg-white dark:text-black font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : 'Analyze'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
