# Read Earn Naira - News Platform

## Overview

Read Earn Naira is a modern news reading platform built with React that gamifies news consumption by rewarding users with Naira tokens for reading articles. The application features a responsive design with category-based article filtering, user authentication, and a token-based reward system that incentivizes quality journalism engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React 18.3.1 architecture with TypeScript for type safety. The component structure follows a modular approach with:
- **Component Organization**: UI components are organized using the shadcn/ui design system with Radix UI primitives for accessibility
- **State Management**: React Context API manages global application state, with local component state for UI interactions
- **Routing**: React Router Dom handles client-side navigation with a simple two-page structure (Index and NotFound)
- **Build System**: Vite provides fast development server and optimized production builds

### UI/UX Design System
- **Styling Framework**: Tailwind CSS with utility-first approach for rapid development
- **Component Library**: shadcn/ui components built on top of Radix UI primitives
- **Theme System**: Custom CSS variables for consistent color schemes and dark/light mode support
- **Typography**: Inter font family for body text and JetBrains Mono for code elements
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Data Architecture
- **Static Data**: Articles are stored in TypeScript modules with type definitions
- **Data Fetching**: React Query (TanStack Query) for server state management and caching
- **Local State**: React hooks manage user authentication status, token balance, and reading progress

### Authentication & User Management
- **Authentication Flow**: Modal-based login/signup system with email and password
- **User State**: Context-based user session management
- **Token System**: Local state tracking of user token balance with rewards for article completion

### Reading Experience & Gamification
- **Article Modal**: Focused reading experience with progress tracking
- **Reading Progress**: Time-based completion detection (based on estimated reading time)
- **Reward System**: 50 Naira tokens awarded per completed article
- **Categories**: Five main content categories (Politics, Technology, Sports, Business, Entertainment)

### Performance Optimization
- **Code Splitting**: Vite's automatic code splitting for optimal bundle sizes
- **Image Optimization**: Placeholder images with lazy loading patterns
- **Development Tools**: Hot module replacement and TypeScript compilation

## External Dependencies

### Core Framework & Build Tools
- **React 18.3.1**: Main frontend framework with modern hooks and concurrent features
- **TypeScript**: Type safety and improved developer experience
- **Vite**: Fast build tool and development server

### UI Component Libraries
- **Radix UI**: Accessible primitive components for complex UI elements
- **shadcn/ui**: Pre-built component library with consistent design patterns
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

### State Management & Data Fetching
- **React Query (TanStack Query)**: Server state management and caching
- **React Hook Form**: Form validation and management
- **React Router Dom**: Client-side routing

### Utility Libraries
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utilities
- **date-fns**: Date formatting and manipulation
- **uuid**: Unique identifier generation

### Development & Quality Tools
- **ESLint**: Code linting with TypeScript and React-specific rules
- **PostCSS**: CSS processing with Tailwind CSS
- **Autoprefixer**: CSS vendor prefix automation

Note: The application currently uses static data but is architected to easily integrate with backend services. The presence of Supabase client suggests future database integration plans.