# Implementation Details

## System Architecture

This notice board system uses a modern full-stack architecture with real-time features and database persistence.

### Technology Decisions

| Component | Technology | Why |
|-----------|-----------|-----|
| Frontend | Next.js 16 | Server-side rendering, fast builds, great DX |
| UI Framework | React 19 | Latest features, better performance |
| Styling | Tailwind CSS | Utility-first, highly customizable |
| Database | Neon PostgreSQL | Serverless, scalable, reliable |
| ORM | Drizzle | Type-safe, minimal overhead |
| Auth | Better Auth | Lightweight, flexible, built-in sessions |
| File Storage | Database BYTEA | Single source of truth, no extra services |
| State Management | React hooks + Server Actions | Minimal complexity, full type safety |

## Database Design

### Schema Relationships

```
users (1) ──────────┐
                    │
sessions (many) ────┤
                    │
accounts (many) ────┴──────── (Better Auth tables)


users (1) ────────┐
                  ├──── notices (many)
                  │       │
                  │       └──── visitors (many)
                  │
                  └──── visitors (many)
```

### Key Design Decisions

1. **No Foreign Keys on App Tables**
   - `notices.userId` is not a foreign key
   - Allows schema evolution without cascading changes
   - Row-level security handled in application code

2. **Binary File Storage**
   - Files stored as BYTEA in `notices` table
   - Single database lookup for complete notice data
   - No need for separate blob storage service

3. **Visitor Tracking Table**
   - Separate table for scalability
   - Preserves data even if notice is deleted
   - Tracks IP and user agent for security

4. **Soft Deletes via Active Flag**
   - `active` boolean field in `notices` table
   - Preserves history and visitor data
   - Can restore if needed

## Authentication Flow

### Sign Up

```
User → /sign-up → AuthForm
  ↓
authClient.signUp.email({ email, password, name })
  ↓
POST /api/auth/sign-up (Better Auth)
  ↓
Hash password → Create user → Set session cookie
  ↓
Redirect to /notice (authenticated)
```

### Sign In

```
User → /sign-in → AuthForm
  ↓
authClient.signIn.email({ email, password })
  ↓
POST /api/auth/sign-in (Better Auth)
  ↓
Verify password → Create session → Set cookie
  ↓
Redirect to /notice (authenticated)
```

### Session Management

- Sessions stored in `session` table
- Session token in secure httpOnly cookie
- 7-day expiration by default
- Auto-refresh on activity (1-day window)

## Notice Publishing Flow

### Text Notice

```
Admin → /admin/notice → AdminNoticePanel
  ↓
Select "Text Message"
  ↓
Enter title + message + expiration
  ↓
Click "Publish Notice"
  ↓
publishNotice(title, message, expiresAt)
  ↓
Server Action (getUserId validation)
  ↓
INSERT INTO notices (...)
  ↓
revalidatePath('/notice')
  ↓
Notice appears on board immediately
```

### PDF/Image Upload

```
Admin → /admin/notice → AdminNoticePanel
  ↓
Select "PDF Document" or "Image"
  ↓
Upload file (readAsArrayBuffer)
  ↓
Convert to Buffer
  ↓
publishNotice(title, message, expiresAt, fileData, fileName, fileMime, type)
  ↓
INSERT fileData as BYTEA
  ↓
Notice available via /api/notices/file/[id]
```

## Visitor Tracking Flow

### When User Views Notice

```
User → /notice/[id]
  ↓
GET /notice/[id]/page.tsx
  ↓
getNoticeDetails(noticeId)
  ↓
Server Action runs:
  1. Verify user is authenticated (getUserId)
  2. SELECT notice WHERE id = noticeId
  3. Get headers (IP, user agent)
  4. INSERT INTO visitors (noticeId, userId, ip, agent)
  5. UPDATE notices SET visitorCount = visitorCount + 1
  6. Return notice with incremented count
  ↓
Component renders with updated view count
```

## File Serving

### PDF/Image Request

```
Browser → GET /api/notices/file/[id]
  ↓
route.ts handler:
  1. Parse noticeId from params
  2. Query notices WHERE id = noticeId
  3. Get fileData (BYTEA)
  4. Get fileMime type
  5. Return Response with:
     - Content-Type: fileMime
     - Content-Disposition: inline
     - Cache-Control: 1 hour
  ↓
Browser displays/downloads file
```

## Server Actions (getUserId Pattern)

Every protected action follows this pattern:

```typescript
'use server'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function publishNotice(...) {
  const userId = await getUserId()  // ← Verify auth
  
  await db
    .insert(notices)
    .values({
      userId,  // ← Scope to user
      ...
    })
  
  revalidatePath('/notice')  // ← Invalidate cache
}
```

**Why this pattern?**
- Type-safe database operations
- Automatic authorization checking
- Clean separation of concerns
- Reusable across all actions

## Caching Strategy

### revalidatePath Usage

```typescript
// After publishing a notice
revalidatePath('/notice')           // Refresh notice board
revalidatePath('/admin/notice')     // Refresh admin panel

// After updating a specific notice
revalidatePath(`/notice/${noticeId}`)

// After deleting
revalidatePath('/notice')
```

**Effect:**
- Next.js purges cached version
- Next request regenerates from database
- Data stays fresh without polling

## Error Handling

### Client-Side (Components)

```typescript
try {
  await publishNotice(...)
  setStatus('✅ Published')
} catch (error) {
  setStatus(`❌ ${error.message}`)
}
```

### Server-Side (Actions)

```typescript
async function getUserId() {
  const session = await auth.api.getSession(...)
  if (!session?.user) throw new Error('Unauthorized')  // ← Caught by client
  return session.user.id
}
```

### API Routes

```typescript
try {
  // Logic here
} catch (error) {
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}
```

## Performance Optimizations

### 1. Database Query Optimization

```typescript
// ✅ Efficient: Only select needed fields
db.select({
  id: notices.id,
  title: notices.title,
}).from(notices)

// ❌ Inefficient: Selects all columns including fileData
db.select().from(notices)
```

### 2. Image Optimization

- Client-side resizing before upload
- Compressed formats (WebP when possible)
- Responsive image serving via HTML `srcset`

### 3. Lazy Loading

- Notice board loads active notices only
- Expired notices query separately
- Pagination possible via LIMIT/OFFSET

### 4. File Caching

- Notice files cached for 1 hour
- Browser caching via Cache-Control headers
- File references are immutable (by ID)

## Security Measures

### 1. Authentication

- Email/password via Better Auth
- Bcrypt password hashing (built-in)
- Secure session cookies (httpOnly, secure)

### 2. Authorization

- Every action calls `getUserId()`
- All queries filtered by `userId`
- Admin dashboard only for logged-in users

### 3. Data Validation

- File MIME type checked
- File size limits (in client)
- Date validation (expiration future)

### 4. SQL Injection Prevention

- Drizzle ORM parameterized queries
- No raw SQL in application code
- Type-safe query building

### 5. CSRF Protection

- Better Auth handles CSRF tokens
- SameSite cookie attribute set
- Origin validation via trustedOrigins

## Deployment Checklist

Before deploying to production:

- [ ] BETTER_AUTH_SECRET generated and set
- [ ] DATABASE_URL configured
- [ ] VERCEL_PROJECT_PRODUCTION_URL set (if custom domain)
- [ ] Environment variables copied to Vercel
- [ ] Database tables created (automatic with Neon MCP)
- [ ] Test sign-up/sign-in flow
- [ ] Test notice publishing
- [ ] Test file upload/download
- [ ] Verify visitor tracking
- [ ] Check CORS/origin settings
- [ ] Enable production logging

## Monitoring & Debugging

### Enable Debug Logging

Add to lib/auth.ts:
```typescript
import { debug } from 'better-auth/dist/utils'
// ... auth config
debug: process.env.DEBUG_AUTH === 'true'
```

### Check Database Directly

```bash
psql $DATABASE_URL

# List tables
\dt

# Query notices
SELECT id, title, "expiresAt", "visitorCount" FROM notices;

# Query visitors
SELECT * FROM visitors ORDER BY "viewedAt" DESC LIMIT 10;
```

### Monitor Performance

- Use Vercel Analytics for Web Vitals
- Check PostgreSQL query logs in Neon console
- Monitor function execution time in API routes

## Scalability Considerations

### Current Limits

- File size: Limited by PostgreSQL (typically 1-2GB)
- Notices: Unlimited (scales with database)
- Visitors: Unlimited (separate table)
- Concurrent users: Depends on Neon connection pool

### Future Optimizations

1. **Pagination** - Add LIMIT/OFFSET to queries
2. **Caching Layer** - Add Redis for hot notices
3. **Search** - Add PostgreSQL full-text search
4. **Archiving** - Move old notices to cold storage
5. **CDN** - Serve files via Vercel Edge Network

## Backup & Recovery

### Neon Backups

- Automatic backups daily (7 days retention)
- Point-in-time recovery available
- Branch creation for safe testing

### Manual Backup

```bash
# Export data
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

## Troubleshooting Guide

### Issue: "BETTER_AUTH_SECRET is required"

**Solution:**
```bash
openssl rand -base64 32
# Add to .env.local
echo "BETTER_AUTH_SECRET=<value>" >> .env.local
```

### Issue: Database connection timeout

**Cause:** DATABASE_URL misconfigured or network issue

**Solution:**
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check .env.local
cat .env.local | grep DATABASE_URL
```

### Issue: Files not uploading

**Debug:**
1. Check browser console for errors
2. Verify file size < 50MB
3. Check Content-Type header
4. Look at server logs

### Issue: Session expires immediately

**Cause:** Cookie not being set or trustedOrigins misconfigured

**Solution:**
1. Clear browser cookies
2. Check V0_RUNTIME_URL is in trustedOrigins
3. Verify BETTER_AUTH_SECRET is set

---

For more details, see README.md or SETUP_GUIDE.md
