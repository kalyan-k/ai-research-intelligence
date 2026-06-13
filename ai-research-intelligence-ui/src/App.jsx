import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import SettingsModal from './components/SettingsModal';
import GuidedTour from './components/GuidedTour';
import SearchArea from './components/SearchArea';
import BrandPulse from './components/BrandPulse';
import HighlightsCard from './components/HighlightsCard';
import MediaGallery from './components/MediaGallery';
import EntityGraph from './components/EntityGraph';
import { fetchBrandPulse, fetchScrapedContent, fetchWebSearch } from './services/contextApi';

function App() {
  const [view, setView] = useState('input'); // 'input', 'about'
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setResults(null);
    
    const apiKey = localStorage.getItem('context_api_key');
    if (!apiKey) {
      alert('Please enter your Context.dev API Key in Settings first.');
      setIsSettingsOpen(true);
      setIsLoading(false);
      return;
    }

    try {
      const isUrl = query.startsWith('http://') || query.startsWith('https://');
      const isDomain = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(query);

      let brandData = null;
      let scrapeData = null;
      let searchData = null;
      let imagesList = [];
      let markdownText = "";

      if (isUrl) {
        scrapeData = await fetchScrapedContent(query, apiKey);
        markdownText = scrapeData?.markdown || scrapeData?.text || "# Scraped Content\n\nNo content returned.";
        imagesList = scrapeData?.images || [];
      } else if (isDomain) {
        const domainMatch = query.replace(/^https?:\/\//, '').split('/')[0];
        brandData = await fetchBrandPulse(domainMatch, apiKey);
        scrapeData = await fetchScrapedContent(`https://${domainMatch}`, apiKey);
        markdownText = scrapeData?.markdown || scrapeData?.text || "# Scraped Content\n\nNo content returned.";
        imagesList = scrapeData?.images || brandData?.images || [];
      } else {
        // Keyword Search
        searchData = await fetchWebSearch(query, apiKey);
        
        const resultsArray = searchData?.results || searchData?.data || [];
        if (resultsArray.length > 0) {
          markdownText = `# Research: ${query}\n\n`;
          resultsArray.forEach((r, i) => {
            markdownText += `### [${r.title || 'Result ' + (i+1)}](${r.url || '#'})\n`;
            if (r.snippet) markdownText += `${r.snippet}\n\n`;
            if (r.content) markdownText += `${r.content}\n\n`;
          });
        } else {
          markdownText = searchData?.markdown || searchData?.text || "# Research Results\n\nNo detailed text returned from search API.";
        }
        
        imagesList = searchData?.images || [];
      }

      setResults({
        brand: brandData?.brand || brandData || { logo: null, colors: [], socials: {} },
        markdown: markdownText,
        images: imagesList.length > 0 ? imagesList : [
          "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=400&q=80",
        ], // Fallback mock images if none
        entities: [
          { name: 'Tech', value: Math.floor(Math.random() * 100) },
          { name: 'AI', value: Math.floor(Math.random() * 100) },
          { name: 'Data', value: Math.floor(Math.random() * 100) },
          { name: 'UX', value: Math.floor(Math.random() * 100) }
        ] 
      });

    } catch (error) {
      console.error(error);
      alert('Error fetching data. Check console for details. Make sure your API key is valid.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GuidedTour />
      <Layout onOpenSettings={() => setIsSettingsOpen(true)} setView={setView}>
        <AnimatePresence mode="wait">
          {view === 'about' && (
            <motion.div 
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mt-20 glass-card p-8 rounded-3xl"
            >
              <h2 className="text-3xl font-bold mb-4">About Context Lens</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Context Lens uses the power of <strong>Context.dev</strong> to perform real-time web research, brand extraction, and URL scraping.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Designed with a premium Glassmorphism aesthetic, it brings clarity to the chaos of the web, turning scattered data into actionable intelligence.
              </p>
            </motion.div>
          )}

          {view === 'input' && !results && (
            <motion.div key="search">
              <SearchArea onSearch={handleSearch} isLoading={isLoading} />
              
              {/* Skeletons while loading */}
              {isLoading && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse max-w-5xl mx-auto">
                  <div className="h-64 bg-white/5 rounded-2xl"></div>
                  <div className="h-64 md:col-span-2 bg-white/5 rounded-2xl"></div>
                </div>
              )}
            </motion.div>
          )}

          {view === 'input' && results && !isLoading && (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-6xl mx-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Research Results</h2>
                <button onClick={() => setResults(null)} className="text-sm hover:underline text-light-accent dark:text-dark-accent">
                  New Search
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[400px]">
                <div className="md:col-span-1 h-full">
                  <BrandPulse data={results.brand} />
                </div>
                <div className="md:col-span-2 h-full">
                  <HighlightsCard markdownContent={results.markdown} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[300px]">
                <div className="md:col-span-2 h-full">
                  <MediaGallery images={results.images} />
                </div>
                <div className="md:col-span-1 h-full">
                  <EntityGraph data={results.entities} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}

export default App;
