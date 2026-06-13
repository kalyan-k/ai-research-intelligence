export const fetchBrandPulse = async (domain, apiKey) => {
  if (!apiKey) throw new Error('API Key is required');
  try {
    const response = await fetch('https://api.context.dev/v1/brand', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ domain })
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch brand pulse:", error);
    throw error;
  }
};

export const fetchScrapedContent = async (url, apiKey) => {
  if (!apiKey) throw new Error('API Key is required');
  try {
    const response = await fetch('https://api.context.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ url })
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch scraped content:", error);
    throw error;
  }
};

export const fetchWebSearch = async (query, apiKey) => {
  if (!apiKey) throw new Error('API Key is required');
  try {
    // Try /v1/web/search, which Context.dev uses for web search queries
    const response = await fetch('https://api.context.dev/v1/web/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ query })
    });
    if (!response.ok) {
      // Fallback if the endpoint is slightly different
      console.warn("Search returned error:", response.status);
      throw new Error(`Search failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to perform web search:", error);
    throw error;
  }
};
