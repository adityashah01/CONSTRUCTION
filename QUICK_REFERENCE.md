# Quick Reference Card

## 🚀 Get Started in 60 Seconds

```bash
# 1. Generate secret
openssl rand -base64 32

# 2. Add to Vercel environment
# DATABASE_URL (auto from Neon)
# BETTER_AUTH_SECRET (your generated secret)

# 3. Start dev
npm run dev

# 4. Create account
# http://localhost:3000/sign-up

# 5. Publish notice
# http://localhost:3000/admin/notice
```

## 📍 Important URLs

| Page | URL | Purpose |
|------|-----|---------|
| Notice Board | `/notice` | View all active notices |
| Notice Details | `/notice/[id]` | View single notice |
| Admin Dashboard | `/admin/notice` | Publish & manage notices |
| Sign Up | `/sign-up` | Create account |
| Sign In | `/sign-in` | Login |

## 📁 Key Files

| File | Purpose |
|------|---------|
| `lib/auth.ts` | Better Auth configuration |
| `lib/db/schema.ts` | Database schema (notices, visitors) |
| `app/actions/notices.ts` | All notice operations |
| `components/admin-notice-panel.tsx` | Publish form & list |
| `components/notice-board.tsx` | Notice board view |

## 🗄️ Database Tables

```
notices
├── id (serial, PK)
├── userId (text)
├── type (text: 'text', 'pdf', 'image')
├── title, message
├── fileData (bytea)
├── expiresAt (timestamp)
├── visitorCount (int)
└── active (boolean)

visitors
├── id (serial, PK)
├── noticeId (int)
├── userId (text)
├── ipAddress (text)
└── viewedAt (timestamp)

user, session, account, verification
└── (Better Auth tables - auto-managed)
```

## 🔧 Common Tasks

### Publish Text Notice
```
1. Go to /admin/notice
2. Select "Text Message"
3. Enter title and message
4. Set expiration (24hr default)
5. Click "Publish Notice"
```

### Upload PDF
```
1. Go to /admin/notice
2. Select "PDF Document"
3. Upload PDF file
4. Set expiration
5. Click "Publish Notice"
```

### Delete Notice
```
1. Go to /admin/notice
2. Click trash icon on notice
3. Confirm deletion
```

### View Statistics
```
1. Go to /admin/notice
2. Check "Views" count per notice
3. See visitor list in console (optional)
```

## 🔐 Authentication

```typescript
// Client-side
import { authClient } from '@/lib/auth-client'

// Sign up
await authClient.signUp.email({ email, password, name })

// Sign in
await authClient.signIn.email({ email, password })

// Sign out
await authClient.signOut()
```

## 🗄️ Server Actions

```typescript
// Import
import {
  publishNotice,
  getPublishedNotices,
  getMyNotices,
  getNoticeDetails,
  deleteNotice,
  getNoticeVisitors,
} from '@/app/actions/notices'

// Use
const notices = await getPublishedNotices()
```

## 📊 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/notices/[id]` | Get notice details |
| DELETE | `/api/notices/[id]` | Delete notice |
| GET | `/api/notices/file/[id]` | Download file |

## 🐛 Debugging

```bash
# Check environment
echo $DATABASE_URL
echo $BETTER_AUTH_SECRET

# View logs
vercel logs

# Connect to DB
psql $DATABASE_URL

# Test query
SELECT COUNT(*) FROM notices WHERE active = true;
```

## 🛑 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "Unauthorized" | Generate BETTER_AUTH_SECRET |
| DB connection fails | Check DATABASE_URL in .env |
| Session expires | Clear cookies, login again |
| File not uploading | Check file size < 50MB |
| Notice not appearing | Verify `active = true` |

## 📦 Dependencies

```json
{
  "better-auth": "Authentication",
  "pg": "PostgreSQL driver",
  "drizzle-orm": "Database ORM",
  "next": "Framework",
  "react": "UI library",
  "tailwindcss": "Styling",
  "lucide-react": "Icons"
}
```

## 📝 Environment Setup

```bash
# .env.local (local development)
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=your_secret_key

# Vercel Environment Variables
# Same as above, set in Vercel dashboard
```

## 🚢 Deploy

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys
# Monitor at https://vercel.com/dashboard
```

## 📞 Support Files

- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Step-by-step setup
- **IMPLEMENTATION.md** - Technical details
- **DEPLOYMENT.md** - Deploy guide
- **QUICK_REFERENCE.md** - This file

## ✅ Pre-Deployment Checklist

- [ ] BETTER_AUTH_SECRET generated
- [ ] Environment variables set in Vercel
- [ ] Test sign-up/login locally
- [ ] Publish test notice locally
- [ ] Upload test file locally
- [ ] Push to GitHub
- [ ] Verify deployment on Vercel
- [ ] Test in production
- [ ] Share with team

## 🎯 Success Indicators

✅ Users can create accounts
✅ Notices appear on board after publishing
✅ Files download correctly
✅ View count increments
✅ Expired notices become inactive
✅ Admin can delete notices
✅ No console errors

## 💡 Pro Tips

1. **Compress PDFs** before uploading (use web tool)
2. **Resize images** to 1920×1080 max
3. **Delete old notices** monthly for performance
4. **Monitor logs** regularly for errors
5. **Backup database** weekly to be safe
6. **Update dependencies** monthly: `npm update`

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Better Auth Docs](https://www.betterauth.dev)
- [Neon Console](https://console.neon.tech)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Drizzle Docs](https://orm.drizzle.team)

---

**Print this page** for quick reference on your desk! 📋
