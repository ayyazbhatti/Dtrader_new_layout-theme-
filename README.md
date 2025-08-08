# DTrader Dashboard

A modern, responsive trading dashboard built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript support for better development experience
- **Professional Layout**: Sidebar navigation with multiple pages
- **Trading Interface**: Order placement, market data, and portfolio management
- **Real-time Updates**: Placeholder for real-time market data integration
- **Responsive Design**: Works on all screen sizes (mobile, tablet, desktop)
- **Mobile Menu**: Toggleable sidebar for mobile devices
- **Dark/Light Theme**: Theme switching functionality

## 📋 Pages

- **Dashboard**: Overview with key metrics, charts, and recent activity
- **Trading**: Order placement, market data, and trade history
- **Portfolio**: Holdings overview and performance tracking
- **Settings**: User preferences and application configuration

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Linting**: ESLint + Prettier
- **Theme**: Dark/Light mode support

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── layout/         # Layout components (Sidebar, Header)
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Trading.tsx
│   ├── Portfolio.tsx
│   └── Settings.tsx
├── App.tsx             # Main app component
├── main.tsx            # React entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#22C55E)
- **Danger**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)

### Components
- **Cards**: Clean, bordered containers
- **Buttons**: Consistent styling with variants
- **Inputs**: Form controls with focus states
- **Tables**: Responsive data tables

## 🔧 Configuration

### Tailwind CSS
Custom theme with trading-specific colors and components.

### TypeScript
Strict mode enabled with proper type checking.

### ESLint
Configured for React and TypeScript with best practices.

## 🚀 Next Steps

1. **Add Charts**: Integrate charting library (e.g., Chart.js, Recharts)
2. **Real-time Data**: Connect to market data APIs
3. **Backend Integration**: Add API endpoints for trading operations
4. **Authentication**: Add user login and session management
5. **Testing**: Add unit and integration tests
6. **Deployment**: Deploy to hosting platform (Vercel, Netlify, etc.)

## 📝 License

MIT License - feel free to use this project for your own trading application.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

Built with ❤️ for modern trading dashboards 