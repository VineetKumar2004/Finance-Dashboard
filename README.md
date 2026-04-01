# 🌌 ZorvynPay Premium Finance Interface

> **Submission for Zorvyn Software Engineering Internship (UI/UX Case Study)**

A state-of-the-art, feature-complete finance dashboard designed to provide users with deep insight into their financial health while maintaining a clean, premium aesthetic.

## 🚀 Experience the Quality
This project showcases the integration of modern frontend patterns:
- **Next.js 15 App Router** for optimized delivery.
- **TypeScript** for industrial-grade type safety.
- **Tailwind CSS v4** for cutting-edge design flexibility.
- **Framer Motion** for physics-based micro-interactions.

---

## 💎 Core Features

### 1. Unified Fiscal Control
The dashboard provides a central "Financial Overview" section with real-time balance trends (Area Charts) and spending breakdowns (Pie Charts) that respond dynamically to device orientation.

### 2. Intelligent Transaction Management
- **Search & Filter:** Instantly find transactions by typing or filtering by Type (Income/Expense).
- **Dynamic Sorting:** Click on Date or Amount headers to re-order history instantly.
- **Status Lifecycle:** Clearly distinguishes between *Completed*, *Pending*, and *Failed* transactions with color-coded typography.

### 3. Role-Based Dynamic Perspective (Admin vs. User)
The entire UI shifts based on the authenticated context:
- **Admin Context:** Unlocks "Total Revenue", "Active Users", and "Average LTV" metrics. Access to sensitive "Security" modules in the sidebar.
- **User Context:** A focused, high-clarity view of personal balance and everyday spending.

### 4. Advanced User Interface
- **Glassmorphism:** Elegant, translucent card designs with backdrop-blur effects.
- **Adaptive Theme:** Sophisticated Dark Mode and Light Mode implementations.
- **Micro-Animations:** Entrance stagger effects and hover states that make the interface feel alive.

---

## 🛠️ Architecture & Performance
- **Component-First:** Modular architecture with reusable UI primitives in `@/components/ui`.
- **Atomic State:** Context-based state management for Theme and Role persistence.
- **Hydration Optimized:** Smooth client-side mounting for heavy charts with SSR-friendly fallbacks.

## 📦 Local Setup

```bash
# Clone the repository
git clone [repository-link]

# Install dependencies
npm install

# Start development environment
npm run dev
```

---
*Created with passion by an aspiring Software Engineer | 2026*
