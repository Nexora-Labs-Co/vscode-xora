<picture>
 <a href="/">
  <img src="assets/Xora-Github.png" alt="Xora Logo" style="border-radius: 20px;" width="100%" />
  </a>
</picture>

---

<h1 align="center">Welcome to Vscode Xora</h1>

A minimal theme with indigo accents for Visual Studio Code.

## Table of Contents

- [Project Status](#project-status)
- [Description](#description)
- [Main Features](#main-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Quick Start Guide](#quick-start-guide)
  - [Development Guide](#development-guide)

## Project Status

> **Current status:** Active

## Description

Xora is a theme extension for VS Code that offers a consistent neutral dark base with selective indigo accents on interactive elements. It includes 3 variants: Xora (original dark), Xora Dark (ultra dark), and Xora Light (light).

## Main Features

- **Xora:** Dark theme with indigo accent (`#6366F1`) and neutral dark base with visual depth.
- **Xora Dark:** Ultra-dark variant with `#0D0D0F` background and pure white text for maximum contrast.
- **Xora Light:** Light variant with white background and indigo accents, ideal for natural light environments.
- **307 UI colors and 75 syntax rules** per variant, generated from TypeScript.
- **Syntax highlighting** for TypeScript/JS, Python, Rust, Go, SQL, YAML, JSON, INI/TOML, Lua, Shell, CSS.

## Project Structure

```text
vscode-xora
├── assets                # Images
├── themes/               # Theme JSON files
├── src/                  # TypeScript theme generator
├── .vscode/              # Debug configuration
├── CHANGELOG.md          # Change history
├── LICENSE               # License
├── README.md             # Main documentation
├── package.json          # Extension manifest
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

Clone this repository and set up the initial environment by running the following commands:

```bash
# 1. Clone the repository
git clone https://github.com/Nexora-Labs-Co/vscode-xora.git

# 2. Enter the directory
cd vscode-xora

# 3. Install development dependencies
npm install
```

### Quick Start Guide

**Option 1: Install from Marketplace**

- Search for **Xora** in the VS Code Extensions Marketplace and install it.

**Option 2: Install from VSIX file**

- Download the latest `.vsix` file from the [Releases](https://github.com/Nexora-Labs-Co/vscode-xora/releases) section and run:

```bash
code --install-extension xora-theme-0.1.0.vsix
```

**Select the theme**

After installing, press `Ctrl+K Ctrl+T` in VS Code and choose between **Xora**, **Xora Dark**, or **Xora Light**.

### Development Guide

This extension uses a TypeScript theme generator to produce the JSON files that VS Code consumes. Each theme variant is defined as a color palette in `src/generate-theme.ts`, and the script maps that palette to ~307 UI colors and ~75 syntax highlighting rules.

**1. Set up the environment**

```bash
# Install dependencies (tsx and TypeScript)
npm install
```

**2. Generate themes**

```bash
# Compile TypeScript palettes to JSON files in themes/
npm run build:theme
```

This command reads the palettes defined in `src/generate-theme.ts` and generates the files `themes/xora.json`, `themes/xora-dark.json`, and `themes/xora-light.json`.

**3. Test the theme in VS Code**

Open the project in VS Code and press `F5`. A new VS Code window will open with the theme loaded automatically. In the new window, use `Ctrl+K Ctrl+T` to switch between available variants.

**4. Watch mode (automatic regeneration)**

```bash
# Watch for changes in src/ and automatically regenerate themes
npm run watch:theme
```

Useful while adjusting colors or adding new palettes.

**5. Add a new variant**

1. Add a palette to the `palettes` object in `src/generate-theme.ts`:

   ```typescript
   'xora-new': {
     background: '#...',
     surface: '#...',
     surfaceElevated: '#...',
     surfaceSecondary: '#...',
     textPrimary: '#...',
     textSecondary: '#...',
     textTertiary: '#...',
     border: '#...',
     separator: '#...',
     accent: '#...',
     accentHover: '#...',
     green: '#...',
     amber: '#...',
     pink: '#...',
     red: '#...',
     cyan: '#...',
     blue: '#...',
   }
   ```

2. Register the variant in the `themeConfigs` array:

   ```typescript
   { name: 'xora-new.json', key: 'xora-new', type: 'dark' }
   ```

3. Add an entry in `contributes.themes` in `package.json`:

   ```json
   {
     "label": "Xora New",
     "uiTheme": "vs-dark",
     "path": "./themes/xora-new.json"
   }
   ```

4. Run `npm run build:theme` and test with `F5`.

**6. Package for distribution**

```bash
# Generate the .vsix file ready to install
npx @vscode/vsce package
```

The resulting `.vsix` file includes the generated themes, the icon, `package.json`, and license files.

**7. Contribute to the project**

To contribute to the project code:

1. Create a branch for your change:

   ```bash
   git checkout -b branch-name
   ```

2. Make your changes and commit using [Conventional Commits](https://www.conventionalcommits.org/):

   ```bash
   git commit -m "feat: add new theme variant"
   git commit -m "fix: correct accent color in Xora Dark"
   git commit -m "chore: update build configuration"
   ```

3. Push the changes:

   ```bash
   git push origin branch-name
   ```

4. Open a Pull Request on [GitHub](https://github.com/Nexora-Labs-Co/vscode-xora/pulls).

---

<p align="center">
  Developed by <strong>NexoraLabs</strong>.
</p>
