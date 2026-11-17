<p align="center">
  <h1 align="center">Changelog</h1>
</p>

### Types of changes

- **Added:** for new features or functionality.
- **Changed:** for changes in existing functionality.
- **Deprecated:** for features that will be removed in future versions.
- **Removed:** for features removed in this version.
- **Fixed:** for any bug fixes.
- **Security:** in case of vulnerabilities or security patches.

---

## Vscode Xora 0.0.1

### 2026-11-17

- Added
  - Initial release of the Xora theme extension for VS Code
  - **Xora** dark theme with indigo accent (`#6366F1`) and neutral dark base
  - **Xora Dark** variant with ultra-dark palette (background `#0D0D0F`, pure white text)
  - **Xora Light** variant with white background and indigo accents
  - TypeScript theme generator (`src/generate-theme.ts`) for centralized color management
  - 307 UI colors and 75 syntax rules per variant
  - Syntax highlighting for multiple languages: TypeScript/JS, Python, Rust, Go, SQL, YAML, JSON, INI/TOML, Lua, Shell, CSS
  - Debug configuration to test the theme with `F5`

- Fixed
  - Publisher ID corrected to `NexoraLabsCo` for VS Code Marketplace compatibility

- Changed
  - Accent color changed from purple (`#a78bfa`) to indigo (`#6366F1`)
  - Removed Xora Flat and Xora Darker variants, keeping 3 core themes
