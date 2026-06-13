# AI Research Intelligence (Context Lens)

Context Lens is a premium, real-time web research dashboard designed to aggregate and synthesize information from the web. It uses the `context.dev` API to pull in live data, extract brand assets, and scrape website content into clean Markdown, delivering a comprehensive research output right to your screen.

## Features
- **Real-Time Keyword Research**: Search for topics and get live snippets, content, and sources aggregated via Context.dev.
- **Modern Glassmorphism UI**: Built with a sleek Light/Dark mode, floating animations via Framer Motion, and mesh gradients to provide a top-tier user experience.
- **Interactive Data Visualization**: Dynamically graph the extracted entities and keywords from your research using Recharts.
- **Loading Timeline**: A visually engaging progress bar that simulates the research process, showing steps like "Accessing Context" and "Rendering Results".

## Architecture
The application is split into two primary folders:
- **`ai-research-intelligence-ui/`**: The React/Vite frontend application that renders the Glassmorphism dashboard and interactive charts.
- **`ai-research-intelligence-api/`**: The Node.js/Express backend that can serve as a proxy for your API requests or hold server-side business logic.

## Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- A **Context.dev API Key** (You can obtain one from the [Context.dev Dashboard](https://context.dev/)) to be setup in the .env file of the api folder (create one if it doesn't exist).

## Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/kalyan-k/ai-research-intelligence.git
   cd ai-research-intelligence
   ```

2. **Install all dependencies:**
   You can easily install dependencies for both the API and UI concurrently using the custom NPM script:
   ```bash
   npm run install-all
   ```
   *(Alternatively, you can manually run `npm install` inside both the `-ui` and `-api` folders).*

## Running the Application

1. **Start the Development Servers:**
   To run both the backend server and the frontend React application simultaneously, use the top-level script:
   ```bash
   npm run start
   ```
   This will spin up the Node API server and the Vite development server for the UI.

2. **Access the Dashboard:**
   Open your browser and navigate to `http://localhost:5173` (or the port Vite outputs in your terminal).

3. **Configure the API Key:**
   - When the app loads, open the **Settings** modal via the gear icon in the top right.
   - Enter your `Context.dev` API key. This key is stored securely in your browser's local storage and is never sent to our backend servers, ensuring your credentials remain private.
   - Start researching!

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Recharts, React-Joyride, Lucide-React
- **Backend**: Node.js, Express, Axios
- **External APIs**: [Context.dev](https://context.dev/)
