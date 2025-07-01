# 🔍 DOM Inspector Plus

A lightweight, context-aware element inspection tool for web developers — editable, extensible, and packed with features to help you explore the DOM like never before.

Built by [@dormouseroared](https://github.com/dormouseroared) in collaboration with Copilot.

One day, looking at using TypeScript, I wanted to understand the DOM element types
that have proved a stumbling block to each previous attempt to learn.
Devtools didn't help much in terms of an easy to understand prototype chain.
I asked copilot, and this monster came into being, far ahead of my abilities but
a great way to learn some new stuff. Have also involved chatgp, and I suspect others too will become involved.

I'm also using git issues for the first time without much clue, and Pull Requests remain a mystery for now.

And now I have a local browser extension. Who'd a thunk it?

---
Notes to self:
- this repo is about experimenting, learning and being OK with edge cases that aren't completely covered
- it is about being ok with the code that's here and being able to make it useful
- useful is helping with getting to grips with TypeScript, JavaScript, DOM, CSS-in-JS
- whilst it was great to get to grips with a real live browser extension that is a whole other game
- be happy just to copy and paste the IIFE into a console session and learn more about how things are configured
- and just refresh and start again if needed
- using AI tools like copilot, gemini, grok and chatgpt is very useful for the solo hobbyist but requires effort to go through what has been generated and solidify the understanding
- the key difference to using youtube, books, courses, etc is that a specific question can be asked and the answers are quick and detailed and tailored, rather than following someone else's path that may meander through and around there question if we are lucky
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
