# 🏆 FISEI Cup 2025

A modern web application for managing and tracking the FISEI Cup 2025 football tournament. Built with Next.js 15, TypeScript, and Supabase.

## ✨ Features

- 🏠 **Home page** with team overview and today's matches
- ⚽ **Team management** - Display and registration of participating teams
- 📅 **Match calendar** - Schedule and results of games
- 🏆 **League table** - Real-time tournament standings
- 👥 **Player profiles** - Detailed participant information
- 🔐 **Admin panel** - Complete tournament management
- 📱 **Responsive design** - Compatible with mobile and desktop devices

## 🛠️ Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [Supabase](https://supabase.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Carousel**: [React Slick](https://react-slick.neostack.com/)
- **Components**: [Styled Components](https://styled-components.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## 🚀 Installation and Setup

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account

### Installation steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/copa-fisei-2025.git
   cd copa-fisei-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start PostgreSQL with Docker**
   ```bash
   docker compose up -d
   ```

4. **Configure environment variables**
   
   Create or update `.env` in the project root:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/copa_fisei?schema=public"
   ```

5. **Apply Prisma schema**
   ```bash
   npx prisma db push
   ```

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

7. **Open in browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```
copa-fisei-2025/
├── app/
│   ├── (main)/                 # Main routes
│   │   ├── home/              # Home page
│   │   ├── teams/             # Team management
│   │   ├── matches/           # Matches and calendar
│   │   ├── ranking/           # League table
│   │   └── components/        # Shared components
│   ├── admin/                 # Admin panel
│   ├── lib/                   # Business logic
│   │   ├── services/          # API services
│   │   ├── types/             # TypeScript interfaces
│   │   └── errors/            # Error handling
│   └── assets/                # Static resources
├── utils/
│   └── supabase/              # Supabase configuration
└── public/                    # Public files
```

## 🎯 Main Features

### 🏠 Home Page
- Overview of participating teams
- Today's scheduled matches
- Interactive team slider

### ⚽ Team Management
- Complete list of participating teams
- Detailed team information (name, acronym, career)
- New team registration
- Individual team profiles

### 📅 Match Management
- Game calendar
- Real-time results
- Home and away team information
- Match status (scheduled, ongoing, finished)

### 🏆 League Table
- Real-time updated standings
- Group system (A and B)
- Team statistics

### 👥 Player Management
- Player profiles
- Personal and sports information
- Team associations

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint linter

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your repository with [Vercel](https://vercel.com/new)
2. Configure environment variables in Vercel dashboard
3. Deploy automatically with each push to main branch

### Other platforms

The application is compatible with any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Real-time notification system
- [ ] Advanced player statistics
- [ ] Match comment system
- [ ] Social media integration
- [ ] Native mobile app
- [ ] Student betting system

## 🐛 Bug Reports

If you find any bugs, please create an issue in the repository with:
- Problem description
- Steps to reproduce
- Screenshots (if applicable)
- Browser/device information

**FISEI Cup 2025** - Where passion for football meets technological innovation 🚀⚽
