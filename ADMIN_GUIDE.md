# Admin Guide - Notice Board System

## Overview

Your notice board system is now fully operational with **no user authentication required**. Here's how it works:

### Key Features
- ✅ **Public Notice Board** - Anyone can view notices without login
- ✅ **Admin-Only Publishing** - Only admin (with password) can publish
- ✅ **Automatic Popups** - New notices appear as popups to all users
- ✅ **Multiple Formats** - Text messages, PDF documents, or images
- ✅ **Auto-Expiration** - Notices expire after set time (24 hours default)
- ✅ **Visitor Tracking** - See how many people viewed each notice

---

## How to Publish a Notice

### Step 1: Access Admin Panel
Go to: `http://localhost:3000/admin/notice`

### Step 2: Enter Admin Password
**Default Password:** `admin123`

### Step 3: Fill the Form

#### For Text Messages
1. **Notice Type:** Select "Text Message"
2. **Title:** Enter the notice title (required)
   - Example: "Holiday Notice", "Maintenance Alert", "Important Update"
3. **Message:** Type your message (required)
   - Example: "The office will be closed tomorrow for maintenance"
4. **Duration:** Set how long to show (24 hours = default)
5. **Publish:** Click "Publish Notice"

#### For PDF Documents
1. **Notice Type:** Select "PDF Document"
2. **Title:** Enter title (required)
   - Example: "Project Specification.pdf"
3. **Upload:** Click to upload a PDF file
4. **Duration:** Set display time
5. **Publish:** Click "Publish Notice"

#### For Images
1. **Notice Type:** Select "Image"
2. **Title:** Enter title (required)
   - Example: "Site Photo", "Building Status"
3. **Upload:** Click to upload an image (JPG, PNG, etc.)
4. **Duration:** Set display time
5. **Publish:** Click "Publish Notice"

---

## What Happens When You Publish

1. **Automatic Popup:** All users currently viewing the site see a popup with your notice
2. **Notice Board:** Notice appears in the main notice board at `/notice`
3. **Polling:** System checks every 10 seconds for new notices
4. **Real-Time:** Users see new notices within 10 seconds of publishing
5. **View Count:** Automatically tracks how many people view each notice

---

## Managing Published Notices

### View All Notices
In the Admin Panel, scroll to the right side panel "Published Notices" to see:
- Notice title and type
- View count (number of people who viewed it)
- Expiration time
- Delete button

### Delete a Notice
1. Find the notice in "Published Notices" list
2. Click the red trash icon
3. Confirm deletion
4. Notice is immediately removed

### Notice Expiration
- Notices automatically expire after the set time
- Expired notices no longer appear on the notice board
- But old notices can still be viewed if directly accessed

---

## User Experience

### For Regular Users (No Login Required)

#### Viewing Notices
1. Go to `http://localhost:3000/notice`
2. See all active notices
3. Click on any notice to view full details
4. For PDFs: Click to open in browser or download

#### New Notice Popup
When a new notice is published:
1. A modal popup appears on top of the page
2. Shows notice title and preview
3. Users can:
   - Click "View Full Notice" to see details
   - Click "Close" to dismiss popup
4. New notices appear in the list automatically

#### Visitor Tracking
- Each notice shows a view count
- Automatically incremented when someone views it
- Tracked by IP address and session

---

## Admin Password Management

### Changing the Password

Edit `/vercel/share/v0-project/components/admin-notice-simple.tsx`:

```typescript
const ADMIN_PASSWORD = 'admin123'  // Change this line
```

To:

```typescript
const ADMIN_PASSWORD = 'your-new-password-here'
```

Then restart the dev server.

### Security Notes
- Password is hardcoded in the component (client-side)
- For production, consider:
  - Moving password to environment variable
  - Using environment variable: `process.env.ADMIN_PASSWORD`
  - Implementing proper authentication
  - Using HTTPS for all traffic

---

## Duration Examples

| Duration | Display Time | Expires In |
|----------|-------------|-----------|
| 1 hour | 1h | 1 hour from now |
| 6 hours | 6h | 6 hours from now |
| 24 hours | 24h | Tomorrow at same time |
| 48 hours | 48h | Day after tomorrow |
| 7 days | 168h | Next week |
| 30 days | 720h | 30 days from now |

---

## URLs Reference

| Page | URL | Access |
|------|-----|--------|
| Notice Board | `/notice` | Public (everyone) |
| Admin Panel | `/admin/notice` | Admin only (password) |
| Individual Notice | `/notice/{id}` | Public (everyone) |
| API: Publish | `/api/admin/notices` | POST admin endpoint |
| API: Delete | `/api/admin/notices/{id}` | DELETE admin endpoint |
| API: File | `/api/notices/file/{id}` | Public file serving |

---

## Troubleshooting

### Notice Not Appearing?
1. Check expiration time - may already be expired
2. Refresh the page
3. Wait up to 10 seconds for polling to detect it
4. Check admin panel to confirm it was published

### Popup Not Showing?
1. Wait 10 seconds for polling cycle
2. Refresh the notice board page
3. Check browser console for errors
4. Try opening `/notice` page in a new tab

### PDF/Image Not Displaying?
1. Check file format (PDF or valid image)
2. File size shouldn't exceed memory limits
3. Try a different file
4. Check browser developer tools for errors

### Password Not Working?
1. Make sure you're using exactly: `admin123`
2. Check CAPS LOCK is off
3. Copy-paste the password instead of typing
4. Clear browser cache if stuck

---

## Database Information

### Tables Used
- **notices** - Stores all published notices
- **visitors** - Tracks who viewed each notice

### Notice Fields
- `id` - Unique notice ID
- `type` - 'text' | 'pdf' | 'image'
- `title` - Notice title
- `message` - Text content (for text notices)
- `fileName` - Original file name (for PDF/image)
- `fileData` - Binary file content stored in DB
- `expiresAt` - When notice expires
- `visitorCount` - Total views
- `createdAt` - When published
- `active` - Is notice currently active

---

## Best Practices

### ✅ DO
- Use clear, concise titles
- Keep messages brief and to the point
- Set appropriate expiration times
- Use text for urgent messages
- Use images for visual updates
- Use PDFs for detailed documents
- Monitor visitor counts
- Test notices before posting important ones

### ❌ DON'T
- Publish test notices to production
- Leave notices active longer than needed
- Use very large images
- Forget to update the admin password
- Share the admin password with everyone
- Rely only on popups (they can be closed)

---

## Examples

### Example 1: Holiday Notice (Text)
```
Title: Office Closed Tomorrow
Message: The office will be closed tomorrow (Friday) for a national holiday. 
We will resume operations on Monday. For emergencies, contact the duty manager.
Duration: 48 hours
```

### Example 2: Important Document (PDF)
```
Title: Q4 Project Specifications
File: project-specs-q4-2024.pdf
Duration: 7 days (so everyone sees it)
```

### Example 3: Site Update (Image)
```
Title: Construction Site Update
Image: site-photo-today.jpg (before/after photos)
Duration: 24 hours
```

---

## Performance Tips

1. **Optimize Images** - Compress before uploading
2. **Delete Old Notices** - Clean up expired notices
3. **Use Text for Speed** - Text loads faster than images
4. **Reasonable Durations** - Don't set notices for 30+ days

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the main README.md
3. Check `/tmp/dev-server.log` for errors
4. Restart the dev server if issues persist

