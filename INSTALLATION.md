# Installation & Setup Guide

## Download & Extract

### Option 1: Using tar (Linux/Mac)
```bash
tar -xzf construction-notice-board.tar.gz
cd v0-project
```

### Option 2: Using Windows
- Use 7-Zip, WinRAR, or Windows built-in extractor
- Right-click → Extract All
- Navigate to extracted folder

---

## Prerequisites

Before starting, ensure you have:
- **Node.js** (v18 or higher) - Download from https://nodejs.org
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **PostgreSQL** (for database) OR use Neon (cloud-based PostgreSQL)

Check versions:
```bash
node --version    # Should be v18+
npm --version     # Should be v8+
```

---

## Step 1: Install Dependencies

Navigate to project folder and install:

```bash
npm install
```

Or if using yarn:
```bash
yarn install
```

Or if using pnpm:
```bash
pnpm install
```

This installs all required packages (Next.js, Drizzle ORM, Better Auth, etc.)

**Expected time:** 2-5 minutes

---

## Step 2: Set Up Database

### Option A: Using Neon (Recommended - Cloud-based)

1. **Create Neon Account**
   - Go to https://neon.tech
   - Sign up (free tier available)
   - Create a new project

2. **Get Connection String**
   - In Neon dashboard, copy the connection string
   - Format: `postgresql://user:password@host/database`

3. **Set Environment Variable**
   - Create file `.env.local` in project root
   - Add: `DATABASE_URL=postgresql://your-connection-string`

### Option B: Using Local PostgreSQL

1. **Install PostgreSQL**
   - Download from https://www.postgresql.org/download/
   - Follow installation wizard

2. **Create Database**
   ```bash
   # On Linux/Mac
   psql -U postgres -c "CREATE DATABASE construction_notice;"
   
   # On Windows (use pgAdmin GUI instead)
   ```

3. **Get Connection String**
   ```
   postgresql://postgres:password@localhost:5432/construction_notice
   ```

4. **Set Environment Variable**
   - Create `.env.local` file
   - Add: `DATABASE_URL=postgresql://postgres:password@localhost:5432/construction_notice`

---

## Step 3: Set Auth Secret

Create or edit `.env.local` and add:

```bash
BETTER_AUTH_SECRET=your-secret-key-here
```

Generate a secure secret:

### On Mac/Linux:
```bash
openssl rand -base64 32
```

### On Windows (PowerShell):
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Or just use any 32+ character string.

---

## Step 4: Initialize Database

Run database setup:

```bash
npm run build
```

This creates all necessary tables:
- `user` - Better Auth users
- `session` - User sessions
- `account` - Auth accounts
- `verification` - Email verification
- `notices` - Your notices
- `visitors` - View tracking

---

## Step 5: Start Development Server

```bash
npm run dev
```

You should see:
```
> construction-notice-board@1.0.0 dev
> next dev

▲ Next.js 16.0.0
- Local: http://localhost:3000
- Environments: .env.local
```

---

## Step 6: Access the Application

### For Users
Open browser and go to:
```
http://localhost:3000/notice
```

You'll see the notice board (no login needed)

### For Admin
Go to:
```
http://localhost:3000/admin/notice
```

Enter password: `admin123`

---

## What Each File Does

```
v0-project/
├── app/
│   ├── layout.tsx           # Main layout with navbar/footer
│   ├── page.tsx             # Home page
│   ├── notice/
│   │   ├── page.tsx         # Notice board (public)
│   │   └── [id]/page.tsx    # Individual notice view
│   ├── admin/
│   │   └── notice/page.tsx  # Admin publishing panel
│   └── api/
│       ├── admin/           # Admin-only API routes
│       └── notices/         # Public API routes
├── components/
│   ├── notice-board.tsx            # List of all notices + popup logic
│   ├── notice-popup.tsx            # Popup modal for new notices
│   ├── notice-detail-view.tsx      # Full notice details
│   ├── admin-notice-simple.tsx     # Admin form with password
│   ├── navbar.tsx                  # Top navigation bar
│   └── footer.tsx                  # Footer
├── lib/
│   ├── auth.ts              # Better Auth configuration
│   ├── auth-client.ts       # Client-side auth utilities
│   └── db/
│       ├── index.ts         # Database connection (Drizzle)
│       └── schema.ts        # Database table definitions
├── app/
│   └── actions/
│       └── notices.ts       # Server actions for notices
├── public/                  # Static files (images, etc.)
├── .env.local              # Your environment variables (CREATE THIS)
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── tailwind.config.ts      # Tailwind CSS config
```

---

## Environment Variables (.env.local)

Create `.env.local` file with:

```env
# Database Connection
DATABASE_URL=postgresql://user:password@host/database

# Better Auth Secret
BETTER_AUTH_SECRET=your-secret-key-here

# Optional: Custom Auth URL (for production)
# BETTER_AUTH_URL=https://yourdomain.com
```

**DO NOT commit this file to Git** - Add to `.gitignore`

---

## Troubleshooting

### Error: "Cannot find module 'next'"
**Solution:** Run `npm install` again

### Error: "DATABASE_URL not set"
**Solution:** Create `.env.local` file with DATABASE_URL

### Error: "BETTER_AUTH_SECRET is not set"
**Solution:** Add BETTER_AUTH_SECRET to `.env.local`

### Port 3000 already in use
**Solution:** 
```bash
# Kill process on port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or run on different port:
```bash
npm run dev -- -p 3001
```

### Database connection fails
**Solution:**
1. Check DATABASE_URL is correct
2. Make sure PostgreSQL is running
3. Test connection:
   ```bash
   psql <DATABASE_URL>
   ```

---

## Scripts Available

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run TypeScript type check
npm run type-check

# Run linter
npm run lint
```

---

## Deployment

### To Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/repo.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Add environment variables in Vercel dashboard:
     - `DATABASE_URL` - Your Neon connection string
     - `BETTER_AUTH_SECRET` - Your secret key

3. **Click Deploy**

### To Traditional Server

```bash
# Build for production
npm run build

# Start server
npm run start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "notice-board" -- start
pm2 save
pm2 startup
```

---

## Admin Features

### Publishing a Notice

1. Go to `http://localhost:3000/admin/notice`
2. Enter password: `admin123`
3. Select notice type (text/PDF/image)
4. Fill in title and content
5. Set duration (hours)
6. Click "Publish Notice"

### What Users See

1. Notice appears in `/notice` list
2. Popup modal shows automatically
3. View count starts tracking
4. Notice expires after set time

### Changing Admin Password

Edit: `components/admin-notice-simple.tsx`

Find:
```typescript
const ADMIN_PASSWORD = 'admin123'
```

Change to your password, then restart server.

---

## Features Overview

- **No User Login** - Public notice board
- **Admin Password Only** - Single password for publishing
- **Three Types** - Text, PDF, image notices
- **Auto-Expire** - Notices disappear after set time
- **Popups** - New notices show as modal
- **Tracking** - Visitor count per notice
- **Responsive** - Works on mobile/tablet/desktop
- **Dark Mode** - Automatic theme support
- **Red/Blue Theme** - Beautiful gradient design

---

## Project Structure

```
Notice Board System
├── Public Users
│   ├── View notices at /notice
│   ├── See automatic popups
│   ├── Click for details
│   └── No registration needed
├── Admin
│   ├── Access /admin/notice
│   ├── Enter password (admin123)
│   ├── Publish text/PDF/image
│   ├── Manage notices
│   └── View statistics
└── Database
    ├── PostgreSQL (Neon)
    ├── Tables: notices, visitors
    └── Automatic tracking
```

---

## Next Steps

1. **Extract the archive**
2. **Run `npm install`**
3. **Create `.env.local` with DATABASE_URL and BETTER_AUTH_SECRET**
4. **Run `npm run dev`**
5. **Visit `http://localhost:3000/notice`**
6. **Go to `/admin/notice` and publish a test notice**

---

## Getting Help

1. Check `ADMIN_GUIDE.md` - Admin instructions
2. Check `QUICK_START_ADMIN.md` - 30-second quickstart
3. Check `README.md` - Full documentation
4. Check browser console for errors (F12 → Console)
5. Check server logs when running `npm run dev`

---

## Security Notes

- Change `admin123` password in production
- Use HTTPS for all connections
- Keep `.env.local` secret (don't commit to Git)
- Use strong BETTER_AUTH_SECRET
- Implement IP restrictions if needed

---

## Support

For issues:
1. Check `.env.local` is correctly set
2. Verify PostgreSQL is running
3. Clear browser cache
4. Restart dev server with `Ctrl+C` then `npm run dev`

You're ready to go! Start with `npm run dev` and enjoy your notice board.
