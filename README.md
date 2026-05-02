# 🌿 Inner Root v2.0: The Duolingo of Indian Cultural Literacy

> **"5 minutes of heritage every morning."**

Inner Root is the world's first micro-learning platform dedicated to Indian cultural literacy. Designed specifically for the global diaspora, it transforms 5,000 years of Vedic wisdom and heritage into a frictionless daily habit. 

---

## 📋 Table of Contents

- [✨ The Singular Focus](#-the-singular-focus)
- [🛤️ The Core Loop](#️-the-core-loop)
- [💎 Membership Models](#-membership-models)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📂 Project Structure](#-project-structure)
- [🤖 AI & Authenticity](#-ai--authenticity)
- [👥 Contributors](#-contributors)

---

## ✨ The Singular Focus
Inner Root is no longer a broad wellness platform. It is a structured, gamified journey through Indian heritage.
*   **ONE Product**: Daily micro-learning journeys.
*   **ONE Target**: Global diaspora seeking cultural reconnection.
*   **ONE Goal**: Master cultural literacy in 5 minutes a day.

---

## 🛤️ The Core Loop
Every morning, seekers embark on a 3-part immersive journey:
1.  **3-min Immersive Story**: Cinematic virtual tours and historical narratives of sacred sites (Hampi, Varanasi, Ajanta).
2.  **1-min Philosophical Insight**: Timeless wisdom from the Gita or Upanishads, explained with modern simplicity.
3.  **1-min Guided Practice**: A quick breathing exercise, mantra ritual, or gratitude practice to ground the day.

---

## 💎 Membership Models
*   **Free Explorer**: 1 lesson/day, access to 10 core heritage sites.
*   **Seeker ($6.99/mo)**: Unlimited lessons, 100+ sites, downloadable guides, and priority personalization.
*   **Guru ($19.99/mo)**: Weekly live "Heritage Hour" with scholars, expert Q&A, and family plans.

---

## 🛠️ Tech Stack

### ⚙️ Backend
*   **Spring Boot 3.5** — High-performance API framework.
*   **Java 21** — Modern, robust core language.
*   **JPA/Hibernate** — Advanced ORM for heritage and lesson mapping.
*   **PostgreSQL / H2** — Hybrid database for production and local dev.

### 🎨 Frontend
*   **React 19 (Vite)** — Blazing fast, modern frontend development.
*   **Framer Motion & GSAP** — Premium, immersive path animations.
*   **Tailwind CSS** — Minimalist, spiritual-themed design system.
*   **Lucide Icons** — High-end iconography for the journey path.

---

## 🚀 Quick Start

### ⚡ One-Click Startup (Windows)
```bash
.\start-all.bat
```
*This launches the Spring Boot backend and the Vite development server in separate windows.*

### 🛠️ Manual Setup

#### 1. Backend (Spring Boot)
```bash
cd inner-root-backend
./mvnw spring-boot:run
```
*   **API Root:** [http://localhost:8080/api](http://localhost:8080/api)
*   **Lessons API:** `/api/lessons`

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
├── inner-root-backend/          # Spring Boot API & Lesson Logic
│   ├── src/main/java/           # Lesson, User, Heritage models
│   └── src/main/resources/      # DataSeeder & App config
├── react-project/               # React + Vite Journey UI
│   ├── src/pages/               # Home (Journey), Heritage (Archive)
│   └── src/components/          # Immersive Lesson Components
├── start-all.bat                # Automation script
└── README.md                    # You are here
```

---

## 🤖 AI & Authenticity
**"Human Wisdom, AI Delivery."**
*   **Curated Knowledge**: Every story and insight is written/recorded by real scholars and cultural guides.
*   **AI Personalization**: Our AI personalizes the *delivery* (pacing, difficulty, mood-alignment) without ever generating spiritual "truth."

---

## 👥 Contributors

*   **Akuri Venkata Surya Varun** — Founder, Lead Developer & UI/UX Designer
*   **Gangi Reddy Gari Hem Sathvik Reddy** — Co-Founder
*   **Md. Roohan** — Backend Engineer

---

<div align="center">
  🌿 <i>Preserving the Eternal for the Connected.</i> 🌿
</div>