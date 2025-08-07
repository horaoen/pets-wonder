# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt.js application for a pet rescue financial transparency platform. The application tracks expenses and incomes for pet rescue operations with features like:

- Expense tracking with categories
- Income tracking with categories
- Financial reporting with charts
- Database management with Drizzle ORM and SQLite

## Development Commands

### Install Dependencies
```bash
bun install
```

### Development Server
```bash
bun run dev
```
Starts the development server on http://localhost:3000

### Build for Production
```bash
bun run build
```

### Preview Production Build
```bash
bun run preview
```

### Database Management
```bash
# Generate database migrations
bun run db:generate

# Apply database migrations
bun run db:migrate
```

## Code Architecture

### Frontend
- **Framework**: Nuxt.js 4 with Vue 3
- **UI Library**: @nuxt/ui
- **Charting**: ECharts via vue-echarts
- **Structure**: 
  - `app/` - Main application files
  - `app/pages/` - Page components with file-based routing
  - `app/components/` - Reusable components
  - `app/assets/` - CSS and other static assets

### Backend
- **API Routes**: `server/api/` - H3 event handlers for REST endpoints
- **Database**: SQLite with Drizzle ORM
- **Schema**: `server/db/schema.ts` - Database table definitions
- **Utilities**: `server/utils/` - Database connection and utilities

### Data Model
The application uses three main tables:
1. `categories` - Expense/income categories
2. `expenses` - Expense records with description, amount, date, and optional receipt URL
3. `incomes` - Income records with description, amount, and date

### Key Features
- File-based routing through Nuxt.js pages
- Server-side API endpoints for CRUD operations
- Client-side data fetching with useFetch
- Financial visualization with ECharts
- Database operations with Drizzle ORM
- Responsive UI with @nuxt/ui components

## Common Development Tasks

### Adding a New API Endpoint
1. Create a new file in `server/api/` with `.get.ts` or `.post.ts` extension
2. Use `defineEventHandler` to create the endpoint
3. Import `useDatabase()` to access the database
4. Use Drizzle ORM queries to interact with the database

### Adding a New Page
1. Create a new `.vue` file in `app/pages/`
2. Use `<script setup lang="ts">` for composition API
3. Use `useFetch` for data fetching
4. Use @nuxt/ui components for UI elements

### Modifying the Database Schema
1. Update `server/db/schema.ts` with new tables or columns
2. Run `bun run db:generate` to create migration files
3. Run `bun run db:migrate` to apply migrations to the database