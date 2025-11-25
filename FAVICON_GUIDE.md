# Favicon Setup Guide

The website is configured to use favicons, but you need to create the actual image files.

## Required Files

Create these files in `/assets/img/`:

1. **favicon-32x32.png** - 32x32 pixels
2. **favicon-16x16.png** - 16x16 pixels  
3. **apple-touch-icon.png** - 180x180 pixels
4. **icon-192.png** - 192x192 pixels (for PWA manifest)
5. **icon-512.png** - 512x512 pixels (for PWA manifest)

## Quick Options

### Option 1: Use an Online Generator
1. Visit https://realfavicongenerator.net/ or https://favicon.io/
2. Upload your logo/image
3. Download the generated files
4. Place them in `/assets/img/` folder

### Option 2: Create Manually
1. Design a simple logo/icon (green theme recommended)
2. Export at the required sizes
3. Save as PNG files with the exact names listed above

### Option 3: Use a Simple SVG (Temporary)
You can create a simple SVG favicon as a placeholder until you have a proper logo.

## Recommended Design
- Use your brand colors (green: #28A745, dark green: #1F6E3A)
- Keep it simple and recognizable at small sizes
- Consider a solar panel or energy symbol
- Ensure good contrast for visibility

## Testing
After adding the files, test by:
1. Opening the site in a browser
2. Checking the browser tab for the favicon
3. Testing on mobile devices for the apple-touch-icon
4. Verifying PWA installation shows correct icons

