# EcoDrive Car Rental

An eco-friendly electric vehicle (EV) rental platform built with React, Vite, and React Router. EcoDrive offers seamless EV discovery, real-time-inspired vehicle telemetry, rental booking workflows, and sustainability metrics tracking.

---

## 🚗 Project Overview

EcoDrive provides an intuitive car-sharing and rental web application designed to encourage sustainable transportation. 

### Key Features
- **Vehicle Catalog & Fleet Showcase**: Browse available EV models with specs, charging speeds, battery health indicators, and filter options.
- **Vehicle Details & Telemetry Glance**: Detailed view for individual vehicles featuring battery status, estimated range, pricing, and key features.
- **Rental Range Picker & Booking Flow**: Date and duration selection tool with instant cost breakdown.
- **Sustainability Hub**: Transparent insights and metrics on carbon offset and eco-impact compared to internal combustion vehicles.
- **User Account Dashboard**: Manage reservations, view rental history, and check personal eco-savings stats.
- **Responsive Design**: Tailored mobile navigation, sticky menus, and touch-friendly UI components.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite](https://vite.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: Modern CSS with flexbox, grid, and responsive media queries
- **Deployment**: GitHub Pages (`gh-pages`)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd EcoDrive
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the development server with Hot Module Replacement (HMR). |
| `npm run build` | Builds the optimized production bundle to the `dist/` directory. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs ESLint to check for code quality and style issues. |
| `npm run deploy` | Deploys the built distribution to GitHub Pages. |

---

## 📂 Project Structure

```text
EcoDrive/
├── public/                 # Static assets and icons
├── src/
│   ├── assets/             # Images and design resources
│   ├── components/         # Shared UI components (Navbar, Footer, RentalRangePicker, etc.)
│   ├── data/               # Static datasets and vehicle catalogs
│   ├── pages/              # Route views (HomePage, FleetPage, VehicleDetailPage, etc.)
│   ├── App.jsx             # Main routing and layout configuration
│   ├── App.css             # Global styles and layout rules
│   └── main.jsx            # React root mount point
├── package.json            # Project dependencies and npm scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## 👥 Collaboration & Team Workflow

- Work is organized through feature/bugfix branches (e.g., `F_*`, `C_*`, `L_*`).
- Submit changes via Pull Requests (PRs) targeting `dev` for peer review and merge approvals.
