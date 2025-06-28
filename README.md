# 🔍 DOM Inspector Plus

A lightweight, context-aware element inspection tool for web developers — editable, extensible, and packed with features to help you explore the DOM like never before.

Built by [@dormouseroared](https://github.com/dormouseroared) in collaboration with Copilot.

---

## ✨ Features

- 🧠 **Smart Property Lists** — shows relevant properties based on the clicked element type (`<input>`, `<img>`, etc.)
- ✏️ **Editable Per-Tag Fields** — customize which properties to inspect per tag
- 💾 **Persistence** — your edits are remembered across sessions with `localStorage`
- 📖 **MDN Integration** — click any property name to open its official documentation
- 🎨 **Styled Output** — values and prototype origins color-coded for quick scanning
- 📋 **Copy to Clipboard** — grab the current report as plain text
- 🔁 **Presets** — form fields, media elements, layout & geometry, and more
- ♻️ **Reset** — revert any tag's inspection list to default in one click

---

## 🚀 How to Use

**Option A: From DevTools Console**

1. Open your browser’s DevTools → Console tab
2. Paste the contents of [`inspector.js`](./inspector.js)
3. Click on any element in the page
4. Use the overlay to explore properties, edit the list, try presets

**Option B: Embed in a Page**

Add this to your HTML:

```html
<script src="inspector.js"></script>
