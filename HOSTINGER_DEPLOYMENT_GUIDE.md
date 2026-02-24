# Hostinger Deployment Guide for CacheDigitech

## Prerequisites
- Hostinger hosting account with cPanel access
- Built React application (already completed)
- FTP client or File Manager access

## Deployment Steps

### Step 1: Access Your Hostinger Control Panel
1. Log in to your Hostinger account
2. Navigate to your hosting dashboard
3. Click on "Manage" for your domain
4. Open "File Manager" or use FTP client

### Step 2: Prepare Your Files
The production build is ready in the `frontend/dist` folder with:
- ✅ Optimized JavaScript and CSS files
- ✅ All static assets (images, fonts, etc.)
- ✅ .htaccess file for proper routing
- ✅ index.html as entry point

### Step 3: Upload Files to Hostinger
1. **Using File Manager:**
   - Navigate to `public_html` folder (or your domain's root folder)
   - Delete any existing files (if this is a fresh deployment)
   - Upload ALL contents from `frontend/dist` folder
   - Ensure .htaccess file is uploaded (it handles React routing)

2. **Using FTP Client:**
   - Connect to your Hostinger FTP
   - Navigate to `public_html` directory
   - Upload all files from `frontend/dist` folder
   - Set proper file permissions (644 for files, 755 for folders)

### Step 4: Configure Domain Settings
1. Ensure your domain points to the `public_html` folder
2. If using a subdomain, point it to the correct subfolder
3. Enable HTTPS if available (recommended)

### Step 5: Test Your Deployment
1. Visit your domain in a web browser
2. Test all navigation routes
3. Check that images and assets load correctly
4. Verify responsive design on mobile devices

## Important Files Structure After Upload:
```
public_html/
├── index.html (main entry point)
├── .htaccess (routing configuration)
├── assets/
│   ├── index-[hash].js (main JavaScript)
│   ├── index-[hash].css (main CSS)
│   └── fonts/
├── images/
├── servicesimages/
├── Partners/
└── [all other static assets]
```

## Troubleshooting

### Common Issues:
1. **404 Errors on Route Navigation:**
   - Ensure .htaccess file is uploaded and working
   - Check if mod_rewrite is enabled on your hosting

2. **Images Not Loading:**
   - Verify all image paths are correct
   - Check file permissions (should be 644)

3. **CSS/JS Not Loading:**
   - Clear browser cache
   - Check if files are uploaded correctly
   - Verify file permissions

### Performance Optimization:
1. Enable Gzip compression in cPanel
2. Set up browser caching rules
3. Consider using Hostinger's CDN if available

## File Sizes:
- Total build size: ~1.2MB
- Main JS bundle: ~954KB (275KB gzipped)
- CSS bundle: ~127KB (19KB gzipped)

## Security Notes:
- .htaccess file is configured for proper routing
- No sensitive information exposed in frontend build
- All API endpoints should use HTTPS

## Support:
If you encounter issues:
1. Check Hostinger's documentation
2. Contact Hostinger support
3. Verify file permissions and .htaccess configuration

---
**Deployment completed successfully! Your CacheDigitech website should now be live on Hostinger.**