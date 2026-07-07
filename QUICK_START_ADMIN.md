# Quick Start - Notice Board Admin (30 Seconds)

## TL;DR

### For Users (No Login Needed)
1. Go to: `http://localhost:3000/notice`
2. See all notices
3. Click any notice for details
4. Popups appear automatically when new notices are published

### For Admin
1. Go to: `http://localhost:3000/admin/notice`
2. Enter password: `admin123`
3. Fill the form (title + message/file)
4. Click "Publish Notice"
5. ✅ Done! It appears to all users instantly

---

## The 3-Minute Demo

### Test It Right Now

#### 1. Open Admin Panel (30 seconds)
```
URL: http://localhost:3000/admin/notice
Password: admin123
```

#### 2. Publish a Test Notice (1 minute)
- **Type:** Text Message
- **Title:** "Test Notice" 
- **Message:** "This is a test message"
- **Duration:** 24 hours
- Click **Publish Notice**

#### 3. View in Notice Board (30 seconds)
- Go to: `http://localhost:3000/notice`
- See your notice appear
- See the popup (might already be displayed)
- Click on the notice to view details

---

## What Happens

### When You Publish
```
1. You fill form + click Publish
   ↓
2. Notice saved to database
   ↓
3. All connected users get popup
   ↓
4. Notice appears in notice board
   ↓
5. Visitor count starts tracking
```

### For Each User
```
1. User opens /notice
   ↓
2. Sees all active notices
   ↓
3. System polls every 10 seconds for new notices
   ↓
4. New notice = automatic popup
   ↓
5. User can click to view or dismiss
```

---

## Admin Features at a Glance

| Feature | How To |
|---------|--------|
| **Publish Text** | Type → message → publish |
| **Upload PDF** | Select PDF type → upload → publish |
| **Upload Image** | Select image type → upload → publish |
| **Delete Notice** | Click trash icon next to notice |
| **View Stats** | See visitor count in list |
| **Logout** | Click "Logout" button |

---

## Important Things to Know

✅ **Users don't need to login** - Just go to `/notice`
✅ **New notices show as popups** - Automatic, within 10 seconds
✅ **Notices auto-expire** - After set duration (e.g., 24h)
✅ **Multiple formats** - Text, PDF, images all supported
✅ **Visitor tracking** - See how many people viewed each

❌ **No user registration** - Just admin-only publishing
❌ **No email notifications** - Only popup/notice board
❌ **No permanent archive** - Expired notices don't show
❌ **No user comments** - One-way announcements only

---

## Passwords

**Admin Password:** `admin123`

To change it, edit file:
`/vercel/share/v0-project/components/admin-notice-simple.tsx`

Look for line with:
```
const ADMIN_PASSWORD = 'admin123'
```

Change to:
```
const ADMIN_PASSWORD = 'your-new-password'
```

---

## URLs

| What | URL |
|------|-----|
| Public Notice Board | `/notice` |
| View Single Notice | `/notice/{id}` |
| Admin Panel | `/admin/notice` |
| Home | `/` |

---

## That's It!

You're ready to go. Now:

1. **Admin:** Go to `/admin/notice` and publish something
2. **Everyone:** Go to `/notice` and see it immediately
3. **See popup:** New notices appear as modal popups

Questions? Read `ADMIN_GUIDE.md` for detailed instructions.

