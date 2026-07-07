# Essential Commands Reference

## Development

### Start Development Server
```bash
npm run dev
# Server runs at http://localhost:3002
```

### Build for Production
```bash
npm run build
# Creates optimized build in .next/
```

### Start Production Server
```bash
npm run build
npm start
# Server runs at http://localhost:3000
```

### Run Linter
```bash
npm run lint
# Checks code for errors and style issues
```

## Environment & Secrets

### Generate Better Auth Secret
```bash
openssl rand -base64 32
# Generate a secure random string
# Copy output to BETTER_AUTH_SECRET
```

### Check Environment Variables
```bash
# Show all env vars
env | grep DATABASE
env | grep BETTER_AUTH

# On Windows (PowerShell)
Get-ChildItem env:DATABASE_URL
```

### View .env.local File
```bash
cat .env.local
# Show current environment variables

# On Windows
type .env.local
```

## Database Operations

### Connect to Database
```bash
# Using psql (if installed)
psql $DATABASE_URL

# From Windows
psql.exe "postgresql://user:password@host/database"
```

### Common SQL Queries

**View all notices:**
```sql
SELECT id, title, "expiresAt", "visitorCount", active FROM notices ORDER BY "createdAt" DESC;
```

**View active notices only:**
```sql
SELECT * FROM notices WHERE active = true AND "expiresAt" > NOW();
```

**Count notices by user:**
```sql
SELECT "userId", COUNT(*) as count FROM notices GROUP BY "userId";
```

**View visitor statistics:**
```sql
SELECT n.title, COUNT(v.id) as views FROM notices n 
LEFT JOIN visitors v ON n.id = v."noticeId" 
GROUP BY n.id, n.title 
ORDER BY views DESC;
```

**Delete old expired notices:**
```sql
DELETE FROM notices WHERE "expiresAt" < NOW() AND active = false;
```

**Clear all data (⚠️ BE CAREFUL):**
```sql
DELETE FROM visitors;
DELETE FROM notices;
DELETE FROM "session";
DELETE FROM account;
DELETE FROM "user";
```

## Git & GitHub

### Initial Setup
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Commit and Push
```bash
git status
# Check what changed

git add .
# Stage all changes

git commit -m "Add new feature"
# Commit with message

git push origin main
# Push to GitHub (triggers Vercel deploy)
```

### View Commit History
```bash
git log --oneline -10
# Show last 10 commits

git log --graph --oneline --all
# Visual tree of commits
```

### Undo Changes
```bash
git restore <filename>
# Undo changes to a file

git restore .
# Undo all unstaged changes

git reset HEAD <filename>
# Unstage a file

git revert HEAD
# Undo last commit (safe)
```

## Deployment

### Deploy to Vercel
```bash
# Automatic (recommended)
git push origin main
# Vercel auto-detects and deploys

# Manual
vercel
# Deploy current directory
```

### Check Deployment Status
```bash
vercel projects
# List your projects

vercel deployments
# View recent deployments

vercel env list
# View environment variables
```

### View Production Logs
```bash
vercel logs
# View recent logs

vercel logs --follow
# Stream logs in real-time

vercel logs --env production
# Show production only
```

## Testing

### Test Authentication
```bash
# In browser:
# 1. Go to http://localhost:3002/sign-up
# 2. Create test account
# 3. Go to http://localhost:3002/admin/notice
# 4. Should be logged in
```

### Test Notice Publishing
```bash
# 1. In admin panel, publish test notice
# 2. Go to /notice
# 3. Verify notice appears
# 4. Click to view (should increment view count)
```

### Test File Upload
```bash
# 1. Create test PDF or image
# 2. In admin panel, upload file
# 3. Go to /notice
# 4. Click notice to view file
```

## Debugging

### Enable Debug Mode
```bash
# Add to .env.local
DEBUG_AUTH=true

# Then restart dev server
npm run dev
```

### View Network Requests
```bash
# In browser DevTools (F12):
# 1. Open "Network" tab
# 2. Reload page
# 3. See all requests and responses
```

### Check Console Errors
```bash
# In browser DevTools (F12):
# 1. Open "Console" tab
# 2. Look for red errors
# 3. Click to see full error message
```

### Test API Endpoints
```bash
# Using curl
curl http://localhost:3002/api/notices/1
# Get notice details

curl -X DELETE http://localhost:3002/api/notices/1
# Delete notice

# Using PowerShell
Invoke-WebRequest -Uri "http://localhost:3002/api/notices/1"
```

## Database Backup

### Backup All Data
```bash
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
# Export all data to file

# On Windows
pg_dump $env:DATABASE_URL > "backup_$(Get-Date -Format yyyyMMdd).sql"
```

### Restore from Backup
```bash
psql $DATABASE_URL < backup_20240115.sql
# Restore from backup file
```

### Backup Just Tables
```bash
# Backup notices table only
pg_dump $DATABASE_URL -t notices > notices_backup.sql

# Backup multiple tables
pg_dump $DATABASE_URL -t notices -t visitors > data_backup.sql
```

## File Management

### List Project Files
```bash
ls -la
# Show all files

find . -name "*.tsx" -type f
# Find all React components

ls -lh app/
# Show files with sizes
```

### Search in Code
```bash
grep -r "publishNotice" app/
# Find all occurrences of "publishNotice"

grep -r "TODO" --include="*.tsx"
# Find all TODO comments
```

### Format Code
```bash
npx prettier --write .
# Format all code (if prettier installed)

npx eslint --fix app/
# Auto-fix ESLint issues
```

## Docker (Optional)

### Build Docker Image
```bash
docker build -t construction-notice .
# Build image from Dockerfile
```

### Run Docker Container
```bash
docker run -p 3000:3000 construction-notice
# Run container on port 3000
```

## Performance

### Check Build Size
```bash
npm run build
# Shows bundle size at end

ls -lh .next/
# Show size of build directory
```

### Analyze Bundle
```bash
# Add to next.config.js:
# const withBundleAnalyzer = require('@next/bundle-analyzer')
# Then run: npm run build

npm run analyze
# If analyzer configured
```

## Cleanup

### Clear Next.js Cache
```bash
rm -rf .next
# Remove build cache

npm run dev
# Rebuild
```

### Clean Node Modules
```bash
rm -rf node_modules
# Remove dependencies

npm install
# Reinstall
```

### Clear Database (Development Only)
```bash
# Via psql
DELETE FROM visitors;
DELETE FROM notices;

# Then restart app
npm run dev
```

## Documentation

### Generate README
```bash
# Already included - check README.md
cat README.md

# View setup guide
cat SETUP_GUIDE.md

# View quick reference
cat QUICK_REFERENCE.md
```

## Common Issues & Solutions

### Port Already in Use
```bash
# Change port
PORT=3001 npm run dev

# Or kill process on port 3000
# Linux/Mac:
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Issue
```bash
npm install
# Install missing dependencies

npm update
# Update to latest versions

npm ls
# List installed packages
```

### Database Connection Error
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# If fails, check:
echo $DATABASE_URL
# Verify URL is correct
```

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

## Useful Tools

### Install Global Tools
```bash
# Database tools
npm install -g psql-cli

# Vercel CLI (for deployment)
npm install -g vercel

# Code formatter
npm install -g prettier
```

### Run TypeScript Check
```bash
npx tsc --noEmit
# Check for type errors without building
```

### Install Development Dependencies
```bash
npm install -D @types/node @types/react typescript
# Install dev-only packages
```

## Environment Variable Template

Copy to `.env.local`:

```bash
# Database (get from Neon)
DATABASE_URL=postgresql://user:password@host:5432/database

# Authentication (generate: openssl rand -base64 32)
BETTER_AUTH_SECRET=your_secret_key_here

# Optional
DEBUG_AUTH=false
NODE_ENV=development
```

---

**Tip:** Bookmark this page or save to your desktop for quick reference! 📋
