# 🌿 Inner Root: Indian Heritage & Wellness Platform

> **Reconnecting modern individuals with Indian cultural heritage, spirituality, and emotional well-being — powered by AI.**

Inner Root is an immersive digital ecosystem that transforms timeless cultural knowledge into interactive, personalized, and meaningful experiences. By blending ancient wisdom with modern technology, it creates a unified space for heritage exploration, mindfulness, and personal growth.

---

## 📋 Table of Contents

- [✨ Core Features](#-core-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📂 Project Structure](#-project-structure)
- [🛡️ Security & Auth](#-security--auth)
- [🤖 AI Integration](#-ai-integration)
- [🌍 Future Roadmap](#-future-roadmap)
- [👥 Contributors](#-contributors)

---

## ✨ Core Features

### 🏛️ Heritage Exploration
*   **Virtual Tours** — Interactive exploration of historical landmarks, temples, and sacred spaces.
*   **Interactive Heritage Map** — A dynamic atlas of India featuring cultural and spiritual markers using React Leaflet.
*   **Cultural Knowledge Base** — Structured insights into traditions, festivals, scriptures, and philosophy.
*   **Public Access** — Most heritage and wellness content is now publicly accessible without requiring a login.

### 🧘 Wellness & Spiritual Growth
*   **Guided Sessions** — Meditation, Yoga, Pranayama, and relaxation practices.
*   **AI Daily Wisdom** — Personalized affirmations and spiritual insights tailored to your journey.
*   **Mood Tracking** — Monitor emotional patterns and mental wellness progress over time.
*   **Automatic Login** — Seamless transition from signup to dashboard with zero-click authentication.

---

## 🛠️ Tech Stack

### ⚙️ Backend
*   **Spring Boot 3.5** — High-performance API framework.
*   **Java 21** — Modern, robust core language.
*   **Hybrid Database** — **PostgreSQL** for production; **H2 (In-Memory)** fallback for instant local development.
*   **Spring Security & JWT** — Secure, stateless session management.
*   **Flyway** — Database migration and version control.

### 🎨 Frontend
*   **React 19 (Vite)** — Blazing fast, modern frontend development.
*   **Tailwind CSS** — Sleek, responsive design system.
*   **Framer Motion** — Smooth, premium micro-animations.
*   **React Router 7** — Advanced client-side navigation.
*   **Lucide Icons** — Minimalist, high-quality iconography.

---

## 🚀 Quick Start

### ⚡ One-Click Startup (Windows)
We've automated the entire startup process. Just run:

```bash
.\start-all.bat
```
*This will automatically launch the Spring Boot backend and the Vite development server in separate windows.*

### 🛠️ Manual Setup

#### 1. Backend (Spring Boot)
The backend is configured to work out-of-the-box using an H2 in-memory database if no external database is detected.
```bash
cd inner-root-backend
./mvnw spring-boot:run
```
*   **H2 Console:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
*   **API Root:** [http://localhost:8080/api](http://localhost:8080/api)

#### 2. Frontend (React)
```bash
cd react-project
npm install
npm run dev
```
*   **URL:** [http://localhost:5173](http://localhost:5173)

---

## 📂 Project Structure

```bash
inner-root/
├── inner-root-backend/          # Spring Boot API & Logic
│   ├── src/main/java/           # Core Java source code
│   └── src/main/resources/      # App config & H2 fallback settings
├── react-project/               # React + Vite UI
│   ├── src/pages/               # Heritage, Wellness & Auth pages
│   └── src/components/          # Shared UI components
├── .env.template                # Global environment template
├── start-all.bat                # Automation script for Windows
└── README.md                    # You are here
```

---

## 🛡️ Security & Auth

Inner Root features a secure, multi-layered authentication system:
*   **JWT Tokens** — All user sessions are handled via signed JSON Web Tokens.
*   **Cookie Integration** — Tokens are stored securely in HTTP-only cookies and synchronized with LocalStorage.
*   **Open Access** — Routes like `/explore`, `/wellness`, and `/wisdom` are now public, while personal dashboards and admin tools remain protected.
*   **Google OAuth2** — One-tap social sign-in for a frictionless experience.

---

## 🤖 AI Integration
The platform uses **OpenRouter AI** (Gemini 2.0 Flash) to provide:
*   **Sentient Heritage Guidance** — Deep, context-aware answers to complex cultural questions.
*   **Sentiment-Based Wellness** — Meditation and wisdom recommendations based on user mood tracking.

*API Configuration can be found in `application.properties`.*

---

## 👥 Contributors

*   **Akuri Venkata Surya Varun** — Founder, Lead Developer & UI/UX Designer
*   **Gangi Reddy Gari Hem Sathvik Reddy** — Co-Founder
*   **Md. Roohan** — Backend Engineer

---

<div align="center">
  🌿 <i>Built with devotion for the Inner Root community</i> 🌿
</div>