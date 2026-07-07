# Construction Notice Board - Setup Guide

## Quick Start (5 minutes)

### Step 1: Generate BETTER_AUTH_SECRET

Run this command to generate a secure random string:

```bash
openssl rand -base64 32
```

Copy the output (e.g., `abc123xyz789...`)

### Step 2: Add Environment Variables

1. Go to your Vercel project settings
2. Click on "Settings" → "Environment Variables"
3. Add these two variables:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Neon database connection string (auto-provided by Neon integration) |
| `BETTER_AUTH_SECRET` | The string you generated in Step 1 |

### Step 3: Start Development

```bash
npm install  # If not already done
npm run dev
```

The app will start at `http://localhost:3000`

### Step 4: First Access

1. Visit `http://localhost:3000/sign-up`
2. Create an account with your email and password
3. You're now logged in!

## Workflow

### Publishing a Notice

1. Go to `/admin/notice` (admin dashboard)
2. Choose notice type:
   - **Text Message**: Create announcements
   - **PDF Document**: Upload a PDF that expires after set time
   - **Image**: Share construction photos
3. Set expiration time (24 hours by default or custom date/time)
4. Click "Publish Notice"

### Viewing Notices

1. Go to `/notice` (notice board)
2. Click any notice to see full details
3. Views are tracked automatically
4. Expired notices show with a red badge

## Database

All tables are created automatically when you set up Neon:

✅ `user` - User accounts
✅ `session` - Login sessions  
✅ `account` - Passwords and auth
✅ `verification` - Email verification
✅ `notices` - Published notices
✅ `visitors` - View tracking

**No manual SQL needed!**

## File Storage

- PDFs and images are stored directly in the database as binary data
- Files are served with correct MIME types
- No external storage required
- Max file size: Limited by PostgreSQL (typically 1-2GB per file, but 50MB recommended for performance)

## User Management

- **Sign Up**: Anyone can create an account at `/sign-up`
- **Sign In**: Login at `/sign-in` with email/password
- **Sessions**: Automatically managed with secure cookies
- **Logout**: Click logout in the UI

## Monitoring & Analytics

### View Tracking

- Each notice view is recorded
- Visit count shown on notice cards
- Visitor details (IP, user agent) stored in `visitors` table

### Admin Dashboard

The admin panel shows:
- ✓ Total published notices
- ✓ View count per notice
- ✓ Expiration status
- ✓ Active/Inactive status
- ✓ Quick delete buttons

## Common Tasks

### Delete a Notice

Go to Admin Dashboard → Click trash icon on any notice → Confirm

### Change Expiration Time

1. Delete the current notice
2. Republish with new expiration time

### Export Visitor Data

Connect to your Neon database directly and query:
```sql
SELECT v.*, n.title 
FROM visitors v 
JOIN notices n ON v."noticeId" = n.id 
ORDER BY v."viewedAt" DESC;
```

## Troubleshooting

### "Unauthorized" on notice board
- Make sure you're logged in
- Clear cookies and refresh
- Check if BETTER_AUTH_SECRET is set

### Files not uploading
- Check file size (keep under 50MB)
- Verify file format (PDF for documents, JPG/PNG for images)
- Check browser console for errors

### Notices not expiring
- System time might be off
- Expired notices are marked "inactive" automatically
- Can be manually deleted from admin panel

### Database connection errors
- Verify DATABASE_URL in environment
- Check Neon project is active
- Ensure network access is allowed

## Architecture Overview

```
┌─────────────────────────────────────────┐
│        User's Browser                    │
├─────────────────────────────────────────┤
│  /notice          - View board           │
│  /admin/notice    - Manage notices       │
│  /sign-in/up      - Authentication      │
└────────────┬──────────────────────────┬──┘
             │                          │
      ┌──────▼────────────────┐  ┌─────▼────────────┐
      │  Next.js (Front/Back) │  │  Better Auth     │
      │  - React components   │  │  - Sessions      │
      │  - Server Actions     │  │  - Passwords     │
      │  - API Routes         │  │  - User mgmt     │
      └──────┬────────────────┘  └─────┬────────────┘
             │                         │
             └────────────┬────────────┘
                          │
                    ┌─────▼──────────┐
                    │ Neon Database  │
                    │ - notices      │
                    │ - visitors     │
                    │ - sessions     │
                    │ - users        │
                    └────────────────┘
```

## Security Checklist

- ✅ Passwords hashed by Better Auth
- ✅ Sessions use secure httpOnly cookies
- ✅ User data isolated per session
- ✅ MIME types validated on upload
- ✅ Files served with correct headers
- ✅ All queries use parameterized statements
- ✅ BETTER_AUTH_SECRET keeps sessions secure

## Performance Tips

1. **Resize images before uploading** - Use 1920×1080 or smaller
2. **Compress PDFs** - Keep PDFs under 10MB for faster loading
3. **Use the notice board** - Don't spam too many active notices
4. **Regular cleanup** - Delete old expired notices periodically

## Deployment

### Deploy to Vercel (Recommended)

```bash
git push origin main
```

Vercel will automatically:
- Build the project
- Connect to Neon database
- Deploy the app
- Set up CI/CD

### Manual Deployment

```bash
npm run build
npm start
```

## Next Steps

1. ✅ Complete setup above
2. 📝 Create your first notice
3. 👁️ View the notice board
4. 📊 Check admin dashboard stats
5. 🚀 Deploy to production

## Support Resources

- **Next.js**: https://nextjs.org/docs
- **Neon**: https://neon.tech/docs
- **Better Auth**: https://www.betterauth.dev/docs
- **Drizzle ORM**: https://orm.drizzle.team

## Helpful Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Connect to Neon database
psql $DATABASE_URL
```

---

**Questions?** Check the main README.md or reach out to the development team.
