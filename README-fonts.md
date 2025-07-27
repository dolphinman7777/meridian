# Helvetica Now Font System

This project uses the Helvetica Now font family with a well-defined hierarchy and fallback system.

## Font Hierarchy

### 1. Default Body Text
- **Font**: Helvetica Now Text → system-ui → sans-serif
- **Usage**: Primary body text, paragraphs, general content
- **Tailwind Class**: `font-sans` or `text-body`

### 2. Headings/Display Text
- **Font**: Helvetica Now Display → system-ui → sans-serif
- **Usage**: Headings, titles, display text, call-to-actions
- **Tailwind Class**: `font-display` or `text-display`

### 3. Small Text
- **Font**: Helvetica Now Micro → system-ui → sans-serif
- **Usage**: Captions, labels, fine print, metadata
- **Tailwind Class**: `font-micro` or `text-micro`

## Available CSS Classes

### Base Font Classes
```css
.text-body    /* Helvetica Now Text */
.text-display /* Helvetica Now Display */
.text-micro   /* Helvetica Now Micro */
```

### Semantic Heading Classes
```css
.text-heading-1  /* H1 - Large display heading */
.text-heading-2  /* H2 - Section heading */
.text-heading-3  /* H3 - Subsection heading */
.text-heading-4  /* H4 - Small heading */
.text-heading-5  /* H5 - Tiny heading */
.text-heading-6  /* H6 - Minimal heading */
```

### Body Text Variants
```css
.text-body-large /* Large body text */
.text-body-base  /* Standard body text */
.text-body-small /* Small body text */
```

### Micro Text Variants
```css
.text-caption  /* Small descriptive text */
.text-overline /* Uppercase labels */
.text-label    /* Form labels and UI text */
```

## Usage Examples

### React/JSX
```jsx
// Headings
<h1 className="text-heading-1">Main Title</h1>
<h2 className="text-heading-2">Section Title</h2>

// Body text
<p className="text-body-base">This is regular body text.</p>
<p className="text-body-large">This is emphasized body text.</p>

// Small text
<span className="text-caption">Image caption</span>
<label className="text-label">Form Label</label>
<div className="text-overline">Category</div>
```

### Direct Tailwind Classes
```jsx
// Using font families directly
<h1 className="font-display text-4xl font-bold">Display Heading</h1>
<p className="font-sans text-base">Body paragraph</p>
<span className="font-micro text-xs">Small detail</span>
```

## Font Loading

The fonts are configured to use local system fonts as fallbacks:
1. **Helvetica Now** (if available)
2. **system-ui** (system default)
3. **sans-serif** (generic fallback)

This ensures good performance and consistent rendering across different systems.

## Best Practices

1. **Use semantic classes** when possible (e.g., `text-heading-1` instead of `font-display text-4xl`)
2. **Consistent hierarchy**: Use Display for headings, Text for body, Micro for small elements
3. **Fallback awareness**: Design works well even without Helvetica Now fonts
4. **Performance**: Classes are optimized for minimal CSS output

## Typography Scale

| Element | Class | Font | Size | Weight |
|---------|--------|------|------|---------|
| H1 | `text-heading-1` | Display | 36px | Bold |
| H2 | `text-heading-2` | Display | 30px | Semibold |
| H3 | `text-heading-3` | Display | 24px | Semibold |
| H4 | `text-heading-4` | Display | 20px | Semibold |
| H5 | `text-heading-5` | Display | 18px | Semibold |
| H6 | `text-heading-6` | Display | 16px | Semibold |
| Body Large | `text-body-large` | Text | 18px | Regular |
| Body Base | `text-body-base` | Text | 16px | Regular |
| Body Small | `text-body-small` | Text | 14px | Regular |
| Caption | `text-caption` | Micro | 12px | Regular |
| Label | `text-label` | Micro | 14px | Medium |
| Overline | `text-overline` | Micro | 12px | Regular | 