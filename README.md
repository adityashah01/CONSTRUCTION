# Construction Notice Board

A modern, fully-functional notice management system built with Next.js 16, Neon PostgreSQL, Drizzle ORM, and Better Auth. Manage construction site announcements with automatic expiration, file uploads, and visitor tracking.

## Features

✨ **Core Features:**
- 📝 **Text Notices** - Create and publish text-based announcements
- 📄 **PDF Documents** - Upload and share PDF files that expire automatically
- 🖼️ **Images** - Share images with automatic expiration
- ⏰ **Flexible Expiration** - Set notices to expire in 24 hours or custom date/time
- 👥 **Visitor Tracking** - Track number of views for each notice
- 🔐 **User Authentication** - Secure email/password authentication with Better Auth
- 📊 **Admin Dashboard** - Manage all published notices and track engagement

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js Server Actions, API Routes
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with email/password
- **UI Components**: Lucide React icons

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd construction_com
npm install
```

### 2. Environment Variables

Create a `.env.local` file with the following variables:

```
DATABASE_URL=your_neon_database_url
BETTER_AUTH_SECRET=your_secret_key_here
```

**Generate BETTER_AUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Database Setup

The database tables are automatically created when you set up the Neon integration:

**Tables created:**
- `user` - User accounts
- `session` - Authentication sessions
- `account` - Account credentials
- `verification` - Email verification tokens
- `notices` - Published notices with expiration and file storage
- `visitors` - Visitor tracking for notices

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide

### For Users

1. **Sign Up/Login**
   - Visit `/sign-up` to create a new account
   - Use `/sign-in` to log in with your email and password

2. **View Notices**
   - Go to `/notice` to see all active notices
   - Click on any notice to view full details
   - Notice visibility is tracked automatically

3. **View Admin Dashboard**
   - Navigate to `/admin/notice` to access the admin panel

### For Administrators

1. **Publish a Text Notice**
   - Select "Text Message" as the type
   - Enter a title and message
   - Choose expiration time (24 hours by default or custom date/time)
   - Click "Publish Notice"

2. **Upload a PDF**
   - Select "PDF Document" as the type
   - Upload a PDF file
   - Set expiration time
   - The PDF will be served directly from the database

3. **Share an Image**
   - Select "Image" as the type
   - Upload an image file
   - Set expiration time
   - Image displays inline on the notice board

4. **Manage Notices**
   - View all your published notices in the admin panel
   - See visitor counts for each notice
   - Delete notices manually or let them expire automatically
   - Active status shows real-time availability

## Project Structure

```
app/
├── api/
│   ├── auth/[...all]/route.ts          # Better Auth handler
│   └── notices/
│       ├── [id]/route.ts                # Notice GET/DELETE endpoints
│       └── file/[id]/route.ts           # File serving endpoint
├── notice/
│   ├── page.tsx                         # Notice board (all active notices)
│   └── [id]/page.tsx                    # Individual notice detail page
├── admin/
│   └── notice/page.tsx                  # Admin dashboard
├── sign-in/page.tsx                     # Sign-in page
├── sign-up/page.tsx                     # Sign-up page
└── actions/
    └── notices.ts                       # Server actions for notice management

components/
├── notice-board.tsx                     # Notice listing component
├── notice-detail-view.tsx               # Notice detail view
├── admin-notice-panel.tsx               # Admin panel component
└── auth-form.tsx                        # Shared auth form

lib/
├── auth.ts                              # Better Auth configuration
├── auth-client.ts                       # Client-side auth utilities
└── db/
    ├── index.ts                         # Drizzle ORM setup
    └── schema.ts                        # Database schema
```

## Database Schema

### notices table
```sql
CREATE TABLE notices (
  id SERIAL PRIMARY KEY,
  userId TEXT NOT NULL,
  type TEXT DEFAULT 'text',           -- 'text', 'pdf', or 'image'
  title TEXT,
  message TEXT,
  fileName TEXT,
  fileMime TEXT,
  fileData BYTEA,                     -- Binary file content
  expiresAt TIMESTAMP NOT NULL,       -- Auto-expiration time
  visitorCount INTEGER DEFAULT 0,     -- Number of views
  active BOOLEAN DEFAULT true,        -- Soft-delete flag
  createdAt TIMESTAMP DEFAULT now(),
  updatedAt TIMESTAMP DEFAULT now()
);
```

### visitors table
```sql
CREATE TABLE visitors (
  id SERIAL PRIMARY KEY,
  noticeId INTEGER NOT NULL,
  userId TEXT,
  ipAddress TEXT,
  userAgent TEXT,
  viewedAt TIMESTAMP DEFAULT now()
);
```

## Key Features Explained

### 1. Automatic Expiration
- Notices are marked as inactive when expiration time is reached
- Users see "Expired" badge on expired notices
- Expired notices don't appear in the active notice board

### 2. File Storage in Database
- PDF and image files are stored as BYTEA in PostgreSQL
- Files are retrieved and served with correct MIME types
- No external storage needed - everything in one database

### 3. Visitor Tracking
- Each view is recorded with IP address and user agent
- Visitor count increments automatically on each view
- View data persists for analytics

### 4. User-Scoped Notices
- Each user can only see and manage their own notices
- Row-level authorization through server actions
- `getUserId()` helper ensures user isolation

## API Endpoints

### Notice Endpoints

**GET /api/notices/[id]**
- Fetch notice details
- Returns: Notice metadata (title, message, visitor count)

**DELETE /api/notices/[id]**
- Delete a notice (owner only)
- Requires: Valid user session
- Removes: Notice and all visitor records

**GET /api/notices/file/[id]**
- Serve uploaded file (PDF or image)
- Returns: File with correct Content-Type header
- Cache: 1 hour

### Authentication Endpoints

**POST /api/auth/sign-up**
- Create new user account
- Body: `{ email, password, name }`

**POST /api/auth/sign-in**
- Login user
- Body: `{ email, password }`

**GET /api/auth/session**
- Get current session

**POST /api/auth/sign-out**
- Logout user

## Server Actions (app/actions/notices.ts)

All server actions require authentication:

```typescript
// Publish a new notice
publishNotice(title, message, expiresAt, fileData, fileName, fileMime, type)

// Get all active notices (any user can see)
getPublishedNotices()

// Get user's own notices
getMyNotices()

// Get notice details and track visitor
getNoticeDetails(noticeId)

// Update notice
updateNotice(noticeId, title, message, expiresAt, fileData, fileName, fileMime, type)

// Delete notice
deleteNotice(noticeId)

// Get visitor list for a notice
getNoticeVisitors(noticeId)

// Deactivate expired notices
deactivateExpiredNotices()
```

## Security

- **Authentication**: Better Auth handles secure password hashing
- **Session Management**: Secure, httpOnly cookies
- **User Isolation**: All queries filtered by `userId`
- **File Validation**: MIME types checked on upload
- **Authorization**: Ownership verification on update/delete

## Deployment

### Deploy to Vercel

```bash
git push origin main
```

The project is configured for Vercel with:
- Neon database integration
- Better Auth environment variables
- Automatic deployments on push

## Troubleshooting

**Issue: "Unauthorized" errors**
- Ensure BETTER_AUTH_SECRET is set in environment
- Check that user session is valid
- Clear cookies and re-login

**Issue: File upload fails**
- Check file size (max 50MB recommended for BYTEA)
- Verify MIME type is correct
- Ensure database has sufficient storage

**Issue: Notices not expiring**
- Check system time/timezone settings
- Manually call `deactivateExpiredNotices()` action
- Verify `expiresAt` timestamp is in the past

## Future Enhancements

- Email notifications when notices are published
- Bulk notice scheduling
- Analytics dashboard with charts
- Comment/feedback system
- Notice categories/tags
- SMS alerts for critical notices
- Export visitor analytics to CSV

## License

MIT

## Support

For issues or questions, please open a GitHub issue or contact the development team.
