# 🌿 Inner Root

> Reconnecting modern individuals with Indian heritage, spirituality, and emotional well-being — powered by AI.

Inner Root is an immersive digital ecosystem that blends ancient wisdom with modern technology. It transforms cultural knowledge into interactive, personalized, and meaningful experiences — designed not just to inform, but to engage, guide, and evolve.

---

## 📋 Table of Contents

- [Vision](#-vision)
- [Objectives](#-objectives)
- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running the App](#-running-the-app)
- [Environment Setup](#-environment-setup)
- [Security](#-security)
- [CI/CD](#-cicd)
- [Roadmap](#-roadmap)
- [Impact](#-impact)
- [Contributors](#-contributors)

---

## 🔭 Vision

To create a world where technology enhances human consciousness, and where timeless knowledge becomes accessible, personalized, and impactful in everyday life.

---

## 🎯 Objectives

- 🕉️ Promote awareness of Indian cultural heritage and traditions
- 🧘 Provide accessible mental wellness and spiritual guidance
- 🎮 Transform traditional knowledge into interactive digital experiences
- 🤖 Enable AI-driven personalization for deeper user engagement

---

## ✨ Core Features

### 🏛️ Heritage Exploration

A comprehensive gateway to India's cultural richness:

- **Virtual Tours** — Explore temples, monuments, and heritage sites through immersive digital experiences
- **Interactive Heritage Map** — Zoomable and pannable map showcasing cultural and spiritual locations across India
- **Cultural Knowledge Base** — Structured content on traditions, festivals, arts, scriptures, and philosophy
- **Digital Archives & Museums** — Curated access to artifacts, historical records, and preserved heritage data

### 🧘 Wellness & Spiritual Growth

Designed to support emotional balance and mindful living:

- **Guided Sessions** — Meditation, Yoga, Pranayama, chanting, and relaxation practices
- **AI-Driven Daily Insights** — Personalized affirmations, wisdom, and spiritual reflections
- **Mood Tracking & Journaling** — Monitor emotional patterns and track personal growth over time
- **AI Recommendation Engine** — Context-aware suggestions based on user mood and behavior

### 📊 Personalized Dashboard

- Track wellness journey and activity history
- Save and revisit content
- Monitor personal growth and engagement

### 🛡️ Admin Dashboard

- Manage heritage locations and cultural data
- Control user roles and access
- Monitor platform activity and analytics

---

## 🛠️ Tech Stack

### ⚙️ Backend

| Technology | Purpose |
|---|---|
| Spring Boot | Backend framework |
| Java 21 | Core language |
| MySQL 8 | Primary database |
| Spring Security | Authentication & authorization |
| JWT | Secure session management |
| OAuth2 (Google) | Social login |
| Maven | Dependency management |

### 🎨 Frontend

| Technology | Purpose |
|---|---|
| React 19 (Vite) | Frontend framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router | Navigation |
| Lucide Icons | UI icons |
| Leaflet | Maps |
| D3.js | Data visualization |

### 🔐 Auth Service

| Technology | Purpose |
|---|---|
| Django | Auth microservice |
| Python 3.10+ | Core language |
| SQLite | Auth database |

---

## 📁 Project Structure

```
inner-root/
├── inner-root-backend/          # Spring Boot API
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── .env.example
│   └── pom.xml
│
├── react-project/               # React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── config/
│   └── package.json
│
├── django-auth-service/         # Django auth microservice
│   ├── core/
│   ├── users/
│   └── manage.py
│
├── .env.template
├── start-all.bat
├── deployment_plan.md
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Purpose |
|---|---|---|
| Java | 21+ | Spring Boot backend |
| Node.js | LTS | React frontend |
| Python | 3.10+ | Django auth service |
| MySQL | 8+ | Primary database |
| Maven | 3.9+ | Backend deps (or use included `mvnw`) |

---

## 💻 Running the App

### ⚡ Quick Start (Windows)

Run all services at once:

```bash
.\start-all.bat
```

---

### 🎨 Frontend

```bash
cd react-project
npm install
npm run dev
```

> Runs on → **[http://localhost:5173](http://localhost:5173)**

---

### ⚙️ Backend (Spring Boot)

```bash
cd inner-root-backend
./mvnw spring-boot:run
```

> On Windows, use `mvnw.cmd spring-boot:run` instead.

> Runs on → **[http://localhost:8080](http://localhost:8080)**

---

### 🔐 Auth Service (Django)

```bash
cd django-auth-service
python -m venv venv              # first time only
.\venv\Scripts\activate          # Windows (use source venv/bin/activate on Mac/Linux)
pip install -r requirements.txt  # first time only
python manage.py runserver
```

> Runs on → **[http://localhost:8000](http://localhost:8000)**

---

## 🌍 Environment Setup

### Frontend — `react-project/.env.local`

```env
VITE_API_URL=http://localhost:8080/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### Backend — `inner-root-backend/.env`

```env
DATABASE_URL=jdbc:mysql://localhost:3306/Inner_root
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_super_secret_key_at_least_256_bits
GOOGLE_CLIENT_ID=your-google-client-id
ALLOWED_ORIGINS=http://localhost:5173
```

> 💡 See `.env.template` and `inner-root-backend/.env.example` for full reference.

---

## 🔒 Security

- **🔑 JWT Authentication** — Stateless, secure session management
- **🌐 OAuth2 Google Login** — One-click social sign-in
- **🛡️ Spring Security** — Role-based access control
- **🔐 CORS Protection** — Configured origins for API security

---

## 🔄 CI/CD

- **🎨 Frontend CI** — Automated build checks for React/Vite
- **⚙️ Backend CI** — Maven-based build validation
- **🚀 Deployment** — Frontend on Vercel, Backend on Railway

---

## 🗺️ Roadmap

- [ ] 📱 Mobile application
- [ ] 🤖 Advanced AI recommendation engine
- [ ] 🌐 Multilingual support
- [ ] 🥽 AR/VR heritage experiences
- [ ] 🤝 Community mentorship features

---

## 🌏 Impact

- 🧘 Enhances emotional well-being through guided cultural practices
- 🏛️ Digitally preserves Indian cultural heritage for future generations
- 🤝 Builds a conscious and connected global community
- 🌍 Enables worldwide access to Indian knowledge systems

---

## 👥 Contributors

**Akuri Venkata Surya Varun** — Founder, Lead Developer & UI/UX Designer

**Gangi Reddy Gari Hem Sathvik Reddy** — Co-Founder

**Md. Roohan** — Backend Engineer

---

<div align="center">

🌿 Built with care for the **Inner Root** community 🌿

</div>