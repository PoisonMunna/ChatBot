# Full-Stack AI Chatbot Assistant

A premium, highly interactive Artificial Intelligence Chatbot built using Vanilla Web Technologies (HTML/CSS/JS) for the frontend and Node.js/Express for the backend. The bot is powered by the Google Generative AI SDK, utilizing the `gemini-2.5-flash` language model to respond to prompts quickly and conversationally.

## Features

- **Vibrant High-Contrast UI**: A cheerful, bright glassmorphic aesthetic featuring a signature Red-Blue-Yellow palette, high-translucency frosted surfaces, and soft depth shadows.
- **Playful Interaction Design**: Fluid "Slide-and-Fade" message transitions paired with a color-coordinated pulsing "Bot is typing..." indicator to keep the conversation feeling alive.
- **Premium Font Architecture**: Optimized for maximum readability using a combination of Inter for body text and Outfit for bold, modern headings.
- **High-Performance AI Core**: Seamless real-time generative responses powered by a fast, CORS-enabled Node.js + Express backend architecture.
- **Accessibility-First Design**: Carefully balanced color contrast ratios between the Electric Red, Sky Blue, and Sunny Yellow elements to ensure a clean, inclusive user experience.

## Installation & Setup

1. **Clone or Download the Project Directory**
Ensure you have Node.js installed on your system.

2. **Install Dependencies**
Run the following in your terminal to unpack the required node modules:
```bash
npm install
```

3. **Provide API Key**
Create a `.env` file in the root directory (if it doesn't already exist) and insert your Google Gemini API key:
```env
GEMINI_API_KEY=your_api_key_here
```

## Running the Application

1. **Start the Backend Server**
```bash
npm start
```
*or alternatively run `node server.js`*
You should see a message stating the server is running on `http://localhost:3001`.

2. **Launch the Frontend**
Open up the `index.html` file directly in your favorite web browser (e.g., Google Chrome or Edge). Wait a moment for it to load, type a message such as "Who are you?", press Enter, and converse with the Virtual Assistant!

## Technologies Used
- frontend: HTML5, CSS3 (Variables, Flexbox, Keyframes), Vanilla JavaScript (ES6, Fetch API).
- backend: Node.js, Express.js, dotenv, cors.
- integrations: `@google/generative-ai` 

## Notes
- To change the personality of the chatbot, simply update the `chat` history structure located within `server.js`!
