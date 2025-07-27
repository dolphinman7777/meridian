# Favicon Generation Instructions

This project uses `meridian-4.svg` as the source for all favicon files. You need to generate the following files from this SVG:

## Required Favicon Files

### Standard Favicons
- `favicon.ico` - 32x32, 16x16 multi-size ICO file
- `favicon-32x32.png` - 32x32 PNG
- `favicon-16x16.png` - 16x16 PNG

### Apple Touch Icons
- `apple-touch-icon.png` - 180x180 PNG for iOS devices

### PWA Icons
- `icon-192.png` - 192x192 PNG for PWA manifest
- `icon-512.png` - 512x512 PNG for PWA manifest

### Microsoft Tiles
- `mstile-150x150.png` - 150x150 PNG for Windows tiles

## How to Generate

### Option 1: Online Tools
1. Go to https://realfavicongenerator.net/
2. Upload `public/meridian-4.svg`
3. Configure settings:
   - Theme color: #27F293
   - Background: Transparent or white
4. Download and extract all files to `/public/`

### Option 2: Command Line (ImageMagick)
```bash
# Install ImageMagick if not already installed
# brew install imagemagick (macOS)

# Generate PNG files from SVG
convert public/meridian-4.svg -resize 16x16 public/favicon-16x16.png
convert public/meridian-4.svg -resize 32x32 public/favicon-32x32.png
convert public/meridian-4.svg -resize 180x180 public/apple-touch-icon.png
convert public/meridian-4.svg -resize 192x192 public/icon-192.png
convert public/meridian-4.svg -resize 512x512 public/icon-512.png
convert public/meridian-4.svg -resize 150x150 public/mstile-150x150.png

# Generate ICO file (multi-size)
convert public/meridian-4.svg -resize 32x32 public/favicon-32.png
convert public/meridian-4.svg -resize 16x16 public/favicon-16.png
convert public/favicon-32.png public/favicon-16.png public/favicon.ico
```

### Option 3: Figma/Design Tool
1. Import `meridian-4.svg` into your design tool
2. Export at the required sizes listed above
3. Save as PNG (except favicon.ico)

## Verification

After generating the files, verify they exist:
- [ ] favicon.ico
- [ ] favicon-16x16.png
- [ ] favicon-32x32.png
- [ ] apple-touch-icon.png
- [ ] icon-192.png
- [ ] icon-512.png
- [ ] mstile-150x150.png

## Current Status

✅ favicon.svg (source file)
✅ safari-pinned-tab.svg
✅ manifest.json
✅ browserconfig.xml
✅ favicon.ico (32x32, 16x16 multi-size)
✅ favicon-16x16.png
✅ favicon-32x32.png
✅ apple-touch-icon.png (180x180)
✅ icon-192.png (PWA)
✅ icon-512.png (PWA)
✅ mstile-150x150.png (Microsoft tiles)

**All favicon files have been generated successfully!**

The layout.tsx file includes all the necessary meta tags for comprehensive favicon support across all devices and platforms including:
- iOS Safari and home screen icons
- Android Chrome and PWA support
- Microsoft Windows tiles
- Vercel deployment optimization
- Mobile-specific meta tags 