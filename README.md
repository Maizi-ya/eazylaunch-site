# EazyLaunch Website

Official website for EazyLaunch - a lightning-fast app launcher for macOS.

## Features

- 🌐 **Multi-language Support** - English, Chinese, Japanese, Korean, Spanish, French
- ⚡ **Lightning Fast** - Built with simplicity and performance in mind
- 📱 **Single Page Application** - Smooth anchor navigation between sections
- 🎨 **Modern Design** - Clean, minimalist UI with smooth animations

## Development

This is a static single-page website deployed on Cloudflare Pages.

### Local Development

Open `index.html` in your browser, or use a local server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8080`

## Site Structure

The site uses anchor navigation (`#section-id`) for smooth scrolling between sections:

- `#hero` - Hero landing section
- `#features` - Why EazyLaunch? (Free, Custom Background)
- `#how-it-works` - Installation steps
- `#download` - Download section
- `#docs` - Documentation and FAQ

## Deployment

This site is automatically deployed via Cloudflare Pages when changes are pushed to the `main` branch.

## Project Structure

```
eazylaunch-site/
├── index.html          # Single page with all sections
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── main.js         # Main JavaScript + i18n
│   └── i18n/           # Translation files
│       ├── en.json
│       ├── zh.json
│       ├── ja.json
│       ├── ko.json
│       ├── es.json
│       └── fr.json
└── assets/ # Images and other assets
```

## License

© 2026 EazyLaunch. All rights reserved.
