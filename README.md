# Vamshi Krishna | Software Engineering Portfolio v2.5

A high-performance, modular personal portfolio designed with a **Swiss Minimalist** aesthetic. This project integrates real-time data from GitHub and utilizes the **Google Gemini API** for generative AI features, providing a dynamic and interactive experience.

## 🏛️ Architecture & Philosophy

This portfolio is built on a modular "Section-First" architecture. Each major area of the site is encapsulated within its own directory, promoting clean code, scalability, and easy maintenance.

### Core Pillars
- **Precision Engineering:** Clean, type-safe TypeScript code throughout.
- **Swiss Design:** Focused on grid systems, bold typography (Manrope/Inter), and high-contrast vibrant accents.
- **AI-Native:** Not just a static site; it uses Generative AI to personalize the experience.
- **Modularity:** Highly organized file structure separating UI primitives, layout logic, and business services.

---

## 🚀 Key Features

### 🤖 AI-Driven Modules (Gemini 2.5/3)
- **Neural Greeting:** A dynamic, context-aware greeting generated via AI on the contact page.
- **Generative Postcards:** Travel stories feature an "AI Render" capability that generates high-fidelity watercolor illustrations based on trip descriptions.
- **Strategy Engine:** The Tic-Tac-Toe "Playlab" includes a hint system powered by Gemini's reasoning capabilities.
- **Dynamic Hero:** The main hero imagery is synthesized in real-time based on the user's current theme (Dark/Light).

### 📊 GitHub Intelligence
- **Live Commit Ledger:** Synchronizes directly with the GitHub Search API to display real-time commit stats across 2023-2025.
- **Profile Node:** Real-time fetching of repository counts and follower networks.

### 💼 Portfolio Management
- **Case Study Explorer:** Interactive project cards that expand into detailed architecture breakdowns.
- **Print-Optimized Resume:** A dedicated CSS layout for "Download PDF" actions, ensuring a professional physical document.
- **Glassmorphism UI:** Custom-built UI primitives using backdrop-filters and variable opacity for a premium digital feel.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS (Custom Config)
- **AI Intelligence:** Google Gemini API (@google/genai)
- **Icons & Graphics:** SVG-native components for maximum performance
- **Deployment:** Vercel-ready with edge-optimized assets

---

## 📁 Project Structure

```text
src/
├── app/                # Main Application entry and orchestrator
├── components/
│   ├── layout/         # Header, Footer, and Nav components
│   └── ui/             # Reusable Atomic UI primitives (GlassCard, BubbleTag)
├── config/             # Static constants, project lists, and global types
├── sections/           # Feature-based modular sections
│   ├── about/
│   ├── contact/
│   ├── game/           # Tic-Tac-Toe Logic Design
│   ├── github/         # Commit Intelligence Module
│   ├── hero/           # Dynamic Hero & HeroTitle
│   ├── projects/       # Case Study explorer
│   ├── resume/         # Credentials & Timeline
│   └── travel/         # Travel stories & AI postcard generation
└── services/           # External API wrappers (Gemini, Social)
```

---

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vamshikittu22/portfolio-v2.5.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file and add your Google AI Studio API Key:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

4. **Run Development Server:**
   ```bash
   npm start
   ```

---

## 📄 License & TM

Designed and Engineered by **Vamshi Krishna Pullaiahgari** © 2025.
Registered Trademark (TM) for the "Synchronized Portfolio Ledger" visual system.

For professional inquiries, reach out via [LinkedIn](https://www.linkedin.com/in/vamshi-krishna-pullaiahgari/).
