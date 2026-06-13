import React, { useState, useEffect } from 'react';
import { Joyride, STATUS } from 'react-joyride';

export default function GuidedTour() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Check if user has seen tour
    const hasSeenTour = localStorage.getItem('has_seen_tour');
    if (!hasSeenTour) {
      setRun(true);
    }
  }, []);

  const steps = [
    {
      target: '#tour-settings',
      content: '1. First, enter your Context.dev API Key here. It is stored securely in your browser.',
      disableBeacon: true,
    },
    {
      target: '#tour-search',
      content: '2. Next, enter a domain (like apple.com) or a URL to scrape.',
    },
    {
      target: '#tour-submit',
      content: '3. Finally, click Analyze to generate real-time brand insights and highlights!',
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      localStorage.setItem('has_seen_tour', 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#818cf8',
          backgroundColor: '#0f172a',
          textColor: '#f8fafc',
          overlayColor: 'rgba(0, 0, 0, 0.6)'
        },
        tooltip: {
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
        }
      }}
    />
  );
}
