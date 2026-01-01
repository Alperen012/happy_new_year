# Contributing to Happy New Year Card

Thank you for your interest in contributing! 🎉

## Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. Open the project folder and start a local server (e.g., `npx serve .` or VS Code Live Server)

## Project Structure

```
├── index.html      # Card creator page
├── view.html       # Card viewer page
├── script.js       # All JavaScript logic (i18n, effects, card generation)
├── style.css       # Styling and themes
└── assets/         # Images and screenshots
```

## How to Contribute

### 🐛 Bug Reports
- Open an issue with a clear description
- Include steps to reproduce
- Add browser/OS information if relevant

### ✨ Feature Requests
- Check existing issues first
- Describe the feature and its use case

### 🌍 Translations
We support 20 languages! To add or improve translations:

1. Open `script.js`
2. Find the `translations` object (around line 18)
3. Add/update translations for your language code
4. Test by switching languages in the UI

### 💻 Code Contributions

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Test locally in multiple browsers
4. Commit with a descriptive message: `git commit -m "feat: add cool feature"`
5. Push and open a Pull Request

## Code Style

- Use vanilla JavaScript (no frameworks)
- Keep CSS organized by component
- Use meaningful variable names
- Comment complex logic

## Testing

- Test card creation with various inputs (special characters, emojis, long text)
- Test in both light and dark themes
- Verify translations display correctly
- Check mobile responsiveness

## Questions?

Feel free to open an issue for any questions!
