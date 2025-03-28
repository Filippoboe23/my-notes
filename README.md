# 🖋️ Death Note Zen – Notes App Anime-Inspired

Una web app per prendere appunti ispirata all'estetica di *Death Note*, *Zen giapponese* e *anime vibes*.  
Combina scrittura poetica, petali danzanti, haiku e tre temi visivi: **Kyoto**, **Nezuko**, **Tokyo**.

![screenshot](./preview.png)

---

## ✨ Features

- 📜 **Editor tipografico** con TipTap
- 🐉 **3 Temi dinamici**: Kyoto (antico), Nezuko (sangue e sakura), Tokyo (neon e notte)
- 🧠 **Note salvate dinamicamente**
- 🖼️ **Immagini di sfondo sfocate** basate sul tema
- ⚔️ **Eliminazione con effetto katana**
- 🌸 **Petali interattivi** che si attivano/inattivano con l'attività di scrittura
- 🎏 **Popup Haiku** dopo il salvataggio di una nota
- 🧾 **Modal di modifica** con zoom elegante

---

## 🚀 Installazione

```bash
git clone https://github.com/tuo-username/death-note-zen.git
cd death-note-zen
npm install
npm run dev
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
