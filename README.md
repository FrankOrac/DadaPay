# dadapay - Read & Earn 📚💰

A modern news reading platform where users earn rewards for reading quality articles. Stay informed while getting rewarded for your engagement with news content.

![dadapay](https://img.shields.io/badge/Status-Live-green) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)

## 🌟 Features

### Core Functionality
- **📖 Quality Content**: Curated articles across multiple categories
- **💰 Token Rewards**: Earn ₦50 tokens for each completed article
- **🔐 User Authentication**: Secure login system to track progress
- **🔍 Search & Filter**: Find articles by keywords and filter by categories
- **📱 Responsive Design**: Fully optimized for all devices and screen sizes
- **🛡️ Role-Based Access**: Different access levels for users, editors, and admins
- **✏️ Content Management**: Full CMS for editors and admins to create articles

## 🚀 Demo Accounts

### For Testing and Demonstration

Since this is a demo application, you can use these pre-created accounts to explore different features:

#### Regular User Account
- **Username**: `user_demo`
- **Email**: `user@dadapay.demo` 
- **Password**: `demo123`
- **Features**: Read articles, earn tokens, view dashboard
- **Starting Balance**: ₦1,250 tokens

#### Admin Account  
- **Username**: `admin_demo`
- **Email**: `admin@dadapay.demo`
- **Password**: `admin123`
- **Features**: Full access - manage users, articles, view analytics
- **Starting Balance**: ₦5,000 tokens

#### Editor Account
- **Username**: `editor_demo`  
- **Email**: `editor@dadapay.demo`
- **Password**: `editor123`
- **Features**: Create and edit articles, moderate content
- **Starting Balance**: ₦2,500 tokens

> **Note**: These are demo accounts for testing purposes. In a production environment, users would create their own accounts through the registration system.

### Categories
- Politics
- Technology
- Sports
- Business
- Entertainment

### User Experience
- **Hero Section**: Engaging landing area with call-to-action
- **Category Filters**: Easy navigation between different content types
- **Article Cards**: Beautiful preview cards with images and metadata
- **Reading Modal**: Focused reading experience with completion tracking
- **Statistics Section**: Display user engagement metrics
- **Dark/Light Theme**: Toggle between themes (configured)

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible components
- **Radix UI** - Primitive components for accessibility

### State Management & Data
- **React Context** - Application state management
- **React Query** - Data fetching and caching
- **React Router Dom** - Client-side routing

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd read-earn-naira
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5000
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...          # Other UI primitives
│   ├── AppLayout.tsx    # Main application layout
│   ├── ArticleModal.tsx # Article reading interface
│   ├── Header.tsx       # Navigation header
│   ├── NewsCard.tsx     # Article preview cards
│   ├── LoginModal.tsx   # User authentication
│   ├── Footer.tsx       # Site footer
│   └── StatsSection.tsx # User statistics display
├── contexts/            # React Context providers
│   └── AppContext.tsx   # Global application state
├── data/               # Static data and types
│   ├── articles.ts     # Article data and interfaces
│   └── moreArticles.ts # Additional article content
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx  # Mobile device detection
│   └── use-toast.ts    # Toast notification hook
├── lib/                # Utility functions
│   └── utils.ts        # Helper functions and utilities
├── pages/              # Route components
│   ├── Index.tsx       # Home page
│   └── NotFound.tsx    # 404 error page
├── App.tsx             # Root application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 How It Works

### User Journey
1. **Landing**: Users arrive at the hero section explaining the concept
2. **Browse**: Users can view articles by category or search for specific topics
3. **Login**: Users authenticate to start earning tokens
4. **Read**: Users click articles to open the reading modal
5. **Earn**: Upon completing an article, users earn ₦50 Naira tokens
6. **Track**: Progress and earnings are tracked in the user's account

### Token System
- **Starting Bonus**: ₦100 tokens upon first login
- **Reading Reward**: ₦50 tokens per completed article
- **No Duplicates**: Users can only earn tokens once per article

### Article Management
- Articles are stored in TypeScript files with full type safety
- Each article includes: title, excerpt, content, image, category, author, and metadata
- Articles are filterable and searchable in real-time

## 🔧 Configuration

### Environment Setup
The application is configured for:
- **Development**: Hot reload with Vite dev server
- **Production**: Optimized builds with code splitting
- **Replit**: Ready for deployment on Replit platform

### Customization
- **Colors**: Modify `tailwind.config.ts` for brand colors
- **Components**: Extend `components/ui/` for new components
- **Articles**: Add content to `src/data/articles.ts`

## 🚀 Deployment

### Replit Deployment
This project is configured for Replit deployment:
- Uses port 5000 for frontend
- Host configured as 0.0.0.0 for proxy compatibility
- All hosts allowed for iframe viewing

### Build Process
```bash
npm run build     # Creates optimized production build
npm run preview   # Test production build locally
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for utility-first styling
- **Vite** for the excellent development experience

---

**Start reading, start earning! 🎉**

For questions or support, please open an issue in the repository.
