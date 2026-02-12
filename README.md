
# DiaGuard AI - Full Setup Guide

Follow these steps to run the Hybrid Diabetes Predictor in VS Code.

## 1. Directory Structure
Ensure your folder looks exactly like this:
```
DiaGuard_AI/
├── components/
│   ├── PredictionForm.tsx
│   └── ResultDisplay.tsx
├── services/
│   └── geminiService.ts
├── utils/
│   └── mlEngine.ts
├── App.tsx
├── index.html
├── index.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
├── types.ts
└── .env (You create this)
```

## 2. Setting the API Key
1. Create a file named `.env` in the root folder.
2. Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and generate a key.
3. Paste it into the `.env` file like this:
   ```env
   VITE_GEMINI_API_KEY=YOUR_KEY_HERE
   ```

## 3. Installation
Run the following in your VS Code terminal:
```bash
npm install
```

## 4. Launching the App
Run the following command:
```bash
npm run dev
```
Open the link provided (e.g., `http://localhost:5173`) in your browser.

## 5. Troubleshooting
- **Error: "process is not defined"**: This is handled by the `vite.config.ts` file provided.
- **Tailwind not working**: The `index.html` uses a CDN for Tailwind for simplicity. If you want a local installation, run `npx tailwindcss init`.
