import * as fs from 'fs'
import * as path from 'path'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ColorPalette {
  background: string
  surface: string
  surfaceElevated: string
  surfaceSecondary: string
  surfaceTertiary?: string
  textPrimary: string
  textSecondary: string
  textTertiary: string
  border: string
  separator: string
  accent: string
  accentHover: string
  green: string
  amber: string
  pink: string
  red: string
  cyan: string
  blue: string
}

interface ThemeColors {
  [key: string]: string
}

interface TokenColor {
  name: string
  scope: string[]
  settings: {
    foreground: string
    fontStyle?: string
  }
}

interface VSCodeTheme {
  $schema: string
  type: 'dark' | 'light'
  colors: ThemeColors
  tokenColors: TokenColor[]
}

// ─── Palettes ────────────────────────────────────────────────────────────────

const palettes: Record<string, ColorPalette> = {
  // Original Xora — indigo accent dark
  xora: {
    background: '#1a1b26',
    surface: '#171823',
    surfaceElevated: '#1e1f2e',
    surfaceSecondary: '#25263a',
    textPrimary: '#c9cdd4',
    textSecondary: '#6b7084',
    textTertiary: '#4a4e69',
    border: '#2a2b3d',
    separator: '#2a2b3d',
    accent: '#6366F1',
    accentHover: '#818cf8',
    green: '#34d399',
    amber: '#fbbf24',
    pink: '#f472b6',
    red: '#f87171',
    cyan: '#22d3ee',
    blue: '#60a5fa',
  },

  // Xora Dark — new palette from user
  'xora-dark': {
    background: '#0D0D0F',
    surface: '#131317',
    surfaceElevated: '#191A1E',
    surfaceSecondary: '#1F2024',
    surfaceTertiary: '#26272C',
    textPrimary: '#FFFFFF',
    textSecondary: '#C5C5CC',
    textTertiary: '#8B8B95',
    border: '#303037',
    separator: '#26262D',
    accent: '#a78bfa',
    accentHover: '#b89dfc',
    green: '#34d399',
    amber: '#fbbf24',
    pink: '#f472b6',
    red: '#f87171',
    cyan: '#22d3ee',
    blue: '#60a5fa',
  },

  // Xora Light — new palette from user
  'xora-light': {
    background: '#FFFFFF',
    surface: '#FBFBFD',
    surfaceElevated: '#F5F5F7',
    surfaceSecondary: '#F0F0F3',
    textPrimary: '#16161A',
    textSecondary: '#42424A',
    textTertiary: '#6B6B74',
    border: '#E5E5EA',
    separator: '#DCDCE2',
    accent: '#8b5cf6',
    accentHover: '#7c3aed',
    green: '#10b981',
    amber: '#f59e0b',
    pink: '#ec4899',
    red: '#ef4444',
    cyan: '#06b6d4',
    blue: '#3b82f6',
  },
}

// ─── UI Colors Mapper ───────────────────────────────────────────────────────

function mapColors(p: ColorPalette): ThemeColors {
  const c: ThemeColors = {}

  // Aliases for surface hierarchy
  const surf = p.surface
  const elev = p.surfaceElevated
  const sec = p.surfaceSecondary
  const tert = p.surfaceTertiary || sec

  c['foreground'] = p.textPrimary
  c['focusBorder'] = p.accent
  c['selection.background'] = p.accent + '33'

  // Title bar
  c['titleBar.activeBackground'] = p.background
  c['titleBar.activeForeground'] = p.textSecondary
  c['titleBar.inactiveBackground'] = p.background
  c['titleBar.inactiveForeground'] = p.textTertiary

  // Menu bar
  c['menubar.selectionForeground'] = p.accent
  c['menubar.selectionBackground'] = elev

  // Menu
  c['menu.foreground'] = p.textPrimary
  c['menu.background'] = elev
  c['menu.selectionForeground'] = p.accent
  c['menu.selectionBackground'] = sec
  c['menu.separatorBackground'] = p.border

  // Input
  c['input.background'] = elev
  c['input.foreground'] = p.textPrimary
  c['input.border'] = p.border
  c['input.placeholderForeground'] = p.textTertiary
  c['inputOption.activeBorder'] = p.accent

  // Input validation
  c['inputValidation.infoBorder'] = p.accent
  c['inputValidation.infoBackground'] = elev
  c['inputValidation.warningBorder'] = p.amber
  c['inputValidation.warningBackground'] = elev
  c['inputValidation.errorBorder'] = p.red
  c['inputValidation.errorBackground'] = elev

  // Dropdown
  c['dropdown.background'] = elev
  c['dropdown.foreground'] = p.textPrimary
  c['dropdown.border'] = p.border

  // Button
  c['button.background'] = p.accent
  c['button.foreground'] = p.background
  c['button.hoverBackground'] = p.accentHover
  c['button.secondaryBackground'] = p.border
  c['button.secondaryForeground'] = p.textPrimary
  c['button.secondaryHoverBackground'] = sec

  // Badge
  c['badge.background'] = p.accent
  c['badge.foreground'] = p.background

  // Progress bar
  c['progressBar.background'] = p.accent

  // Editor
  c['editor.background'] = p.background
  c['editor.foreground'] = p.textPrimary
  c['editorWidget.background'] = elev
  c['editorWidget.foreground'] = p.textPrimary
  c['editorWidget.border'] = p.border
  c['editor.cursorBorder'] = p.background
  c['editor.cursorForeground'] = p.textPrimary

  // Editor selection
  c['editor.selectionBackground'] = p.accent + '22'
  c['editor.selectionHighlightBackground'] = p.accent + '15'
  c['editor.findMatchBackground'] = p.accent + '44'
  c['editor.findMatchHighlightBackground'] = p.accent + '22'
  c['editor.findRangeHighlightBackground'] = p.accent + '11'
  c['editor.hoverHighlightBackground'] = p.accent + '11'
  c['editor.lineHighlightBackground'] = elev
  c['editor.lineNumbersForeground'] = p.textTertiary
  c['editor.lineNumbersActiveForeground'] = p.accent
  c['editorLink.activeForeground'] = p.accent
  c['editor.inactiveSelectionBackground'] = p.accent + '11'
  c['editor.rangeHighlightBackground'] = p.accent + '08'
  c['editor.wordHighlightBackground'] = p.accent + '22'
  c['editor.wordHighlightStrongBackground'] = p.accent + '33'
  c['editor.wordHighlightTextBackground'] = p.accent + '18'

  // Brackets
  c['editorBracketHighlight.foreground1'] = p.accent
  c['editorBracketHighlight.foreground2'] = p.accent + 'cc'
  c['editorBracketHighlight.foreground3'] = p.accent + '88'
  c['editorBracketMatch.background'] = p.accent + '33'
  c['editorBracketMatch.border'] = p.accent

  // Code lens & groups
  c['editorCodeLens.foreground'] = p.textTertiary
  c['editorGroup.border'] = p.border
  c['editorGroupHeader.tabsBackground'] = surf
  c['editorGroupHeader.noTabsBackground'] = surf
  c['editorGroupHeader.tabsBorder'] = p.background

  // Gutter
  c['editorGutter.background'] = p.background
  c['editorGutter.modifiedBackground'] = p.accent + '66'
  c['editorGutter.addedBackground'] = p.green + '66'
  c['editorGutter.deletedBackground'] = p.red + '66'

  // Indent guides
  c['editorIndentGuide.background'] = sec
  c['editorIndentGuide.activeBackground'] = p.textTertiary

  // Marker navigation
  c['editorMarkerNavigation.background'] = elev
  c['editorMarkerNavigationError.background'] = p.red
  c['editorMarkerNavigationWarning.background'] = p.amber

  // Overview ruler
  c['editorOverviewRuler.background'] = surf
  c['editorOverviewRuler.border'] = p.border
  c['editorOverviewRuler.modifiedForeground'] = p.accent + '66'
  c['editorOverviewRuler.addedForeground'] = p.green + '66'
  c['editorOverviewRuler.deletedForeground'] = p.red + '66'

  // Rulers & diagnostics
  c['editorRuler.foreground'] = p.border
  c['editorError.foreground'] = p.red
  c['editorWarning.foreground'] = p.amber
  c['editorInfo.foreground'] = p.blue
  c['editorHint.foreground'] = p.accent

  // Hover widget
  c['editorHoverWidget.background'] = elev
  c['editorHoverWidget.border'] = p.border
  c['editorHoverWidget.statusBarBackground'] = p.background

  // Sticky scroll
  c['editorStickyScroll.background'] = p.background
  c['editorStickyScrollHover.background'] = elev

  // Suggest widget
  c['editorSuggestWidget.background'] = elev
  c['editorSuggestWidget.border'] = p.border
  c['editorSuggestWidget.selectedBackground'] = sec
  c['editorSuggestWidget.highlightForeground'] = p.accent

  // Editor tabs
  c['editorTabBackground'] = p.background
  c['editorTabForeground'] = p.textSecondary
  c['editorTab.activeBackground'] = p.background
  c['editorTab.activeForeground'] = p.textPrimary
  c['editorTab.activeBorder'] = p.accent
  c['editorTab.activeBorderTop'] = p.accent
  c['editorTab.inactiveBackground'] = surf
  c['editorTab.unfocusedActiveBorder'] = p.textTertiary
  c['editorTab.unfocusedActiveBorderTop'] = p.textTertiary
  c['editorWhitespace.foreground'] = p.border
  c['editorWidget.resizeBorder'] = p.accent

  // Bracket pair guides
  c['editorBracketPairGuide.staticBackground'] = p.textTertiary
  c['editorBracketPairGuide.staticBackground1'] = p.textTertiary
  c['editorBracketPairGuide.staticBackground2'] = p.textSecondary + '88'
  c['editorBracketPairGuide.staticBackground3'] = p.textSecondary + '66'
  c['editorBracketPairGuide.activeBackground1'] = p.accent + '66'
  c['editorBracketPairGuide.activeBackground2'] = p.accent + '44'
  c['editorBracketPairGuide.activeBackground3'] = p.accent + '22'

  // Minimap
  c['minimap.background'] = surf

  // Scrollbar
  const scrollbarShadow = p.type === 'light' ? p.separator : p.background + 'aa'
  c['scrollbar.shadow'] =
    p.background === '#0D0D0F'
      ? '#050508'
      : p.background === '#FFFFFF'
        ? p.separator
        : p.background + 'aa'
  c['scrollbarSlider.background'] = p.border + '66'
  c['scrollbarSlider.hoverBackground'] = p.textTertiary + '66'
  c['scrollbarSlider.activeBackground'] = p.textSecondary + '66'

  // Breadcrumb
  c['breadcrumb.foreground'] = p.textTertiary
  c['breadcrumb.activeSelectionForeground'] = p.accent
  c['breadcrumb.focusForeground'] = p.textPrimary
  c['breadcrumbPicker.background'] = elev

  // Tabs
  c['tab.activeBackground'] = p.background
  c['tab.activeBorder'] = p.accent
  c['tab.activeBorderTop'] = p.accent
  c['tab.activeModifiedBorder'] = p.amber
  c['tab.border'] = surf
  c['tab.inactiveBackground'] = surf
  c['tab.inactiveForeground'] = p.textTertiary
  c['tab.unfocusedActiveForeground'] = p.textSecondary
  c['tab.unfocusedActiveBorder'] = p.textTertiary
  c['tab.unfocusedActiveBorderTop'] = p.textTertiary
  c['tab.unfocusedInactiveForeground'] = p.textTertiary + 'aa'

  // Activity bar
  c['activityBar.background'] = surf
  c['activityBar.foreground'] = p.textSecondary
  c['activityBar.activeBorder'] = p.accent
  c['activityBar.activeBackground'] = p.background
  c['activityBar.inactiveForeground'] = p.textTertiary
  c['activityBarBadge.background'] = p.accent
  c['activityBarBadge.foreground'] = p.background

  // Sidebar
  c['sideBar.background'] = surf
  c['sideBar.foreground'] = p.textSecondary
  c['sideBar.border'] = p.border
  c['sideBarTitle.foreground'] = p.textSecondary
  c['sideBarSectionHeader.background'] = surf
  c['sideBarSectionHeader.foreground'] = p.textSecondary
  c['sideBarSectionHeader.border'] = p.border
  c['sideBar.activeBackground'] = elev
  c['sideBar.focusBackground'] = elev
  c['sideBar.findMatchBackground'] = p.accent + '33'
  c['sideBar.findMatchHighlightBackground'] = p.accent + '22'
  c['sideBar.dropdownBackground'] = p.background
  c['sideBar.inputBackground'] = p.background
  c['sideBarList.highlightForeground'] = p.accent
  c['sideBarActivityBarBadge.background'] = p.accent
  c['sideBarActivityBarBadge.foreground'] = p.background

  // List
  c['list.activeSelectionBackground'] = elev
  c['list.activeSelectionForeground'] = p.textPrimary
  c['list.activeSelectionStripeBackground'] = p.accent + '22'
  c['list.focusBackground'] = elev
  c['list.focusForeground'] = p.textPrimary
  c['list.focusAndSelectionOutline'] = p.accent
  c['list.focusHighlightForeground'] = p.accent
  c['list.focusOutline'] = p.accent
  c['list.highlightForeground'] = p.accent
  c['list.hoverBackground'] = elev
  c['list.hoverForeground'] = p.textPrimary
  c['list.inactiveFocusBackground'] = elev
  c['list.inactiveSelectionBackground'] = elev
  c['list.inactiveSelectionForeground'] = p.textPrimary
  c['list.warningForeground'] = p.amber
  c['list.errorForeground'] = p.red

  // List filter widget
  c['listFilterWidget.background'] = elev
  c['listFilterWidget.outline'] = p.accent
  c['listFilterWidget.noMatchesOutline'] = p.red

  // Tree
  c['tree.indentGuidesStroke'] = p.border

  // Panel
  c['panel.background'] = surf
  c['panel.border'] = p.border
  c['panelTitle.activeBorder'] = p.accent
  c['panelTitle.activeForeground'] = p.textPrimary
  c['panelTitle.inactiveForeground'] = p.textTertiary
  c['panelInput.border'] = p.background

  // Status bar
  c['statusBar.background'] = surf
  c['statusBar.foreground'] = p.textTertiary
  c['statusBar.border'] = p.border
  c['statusBar.debuggingBackground'] = p.accent
  c['statusBar.debuggingForeground'] = p.background
  c['statusBar.noFolderBackground'] = surf
  c['statusBar.noFolderForeground'] = p.textTertiary
  c['statusBar.noFolderBorder'] = p.border
  c['statusBarItem.activeBackground'] = p.border
  c['statusBarItem.hoverBackground'] = elev
  c['statusBarItem.prominentBackground'] = p.accent
  c['statusBarItem.prominentForeground'] = p.background
  c['statusBarItem.prominentHoverBackground'] = p.accentHover
  c['statusBarItem.remoteBackground'] = p.accent
  c['statusBarItem.remoteForeground'] = p.background

  // Editor status bar
  c['editorStatusBar.foreground'] = p.textTertiary
  c['editorStatusBar.background'] = p.background
  c['editorStatusBar.border'] = p.border

  // Notifications
  c['notificationCenter.border'] = p.border
  c['notificationCenterHeader.foreground'] = p.textPrimary
  c['notificationCenterHeader.background'] = elev
  c['notifications.foreground'] = p.textPrimary
  c['notifications.background'] = elev
  c['notifications.border'] = p.border
  c['notificationLink.foreground'] = p.accent
  c['notificationsErrorIcon.foreground'] = p.red
  c['notificationsWarningIcon.foreground'] = p.amber
  c['notificationsInfoIcon.foreground'] = p.blue

  // Extensions
  c['extensionButton.prominentForeground'] = p.background
  c['extensionButton.prominentBackground'] = p.accent
  c['extensionButton.prominentHoverBackground'] = p.accentHover
  c['extensionButton.background'] = p.border
  c['extensionButton.foreground'] = p.textPrimary
  c['extensionButton.hoverBackground'] = sec
  c['extensionBadge.remoteBackground'] = p.accent
  c['extensionBadge.remoteForeground'] = p.background

  // Debug
  c['debugToolBar.background'] = elev
  c['debugIcon.startForeground'] = p.green
  c['debugIcon.breakpointForeground'] = p.red
  c['debugTokenExpression.name'] = p.accent
  c['debugTokenExpression.value'] = p.textPrimary
  c['debugTokenExpression.string'] = p.green
  c['debugTokenExpression.number'] = p.amber
  c['debugTokenExpression.boolean'] = p.pink
  c['debugExceptionWidget.background'] = elev
  c['debugExceptionWidget.border'] = p.red

  // Walkthrough & settings
  c['walkThrough.embeddedEditorBackground'] = elev
  c['settings.headerForeground'] = p.textPrimary
  c['settings.modifiedItemIndicator'] = p.accent
  c['settings.dropdownBackground'] = elev
  c['settings.dropdownForeground'] = p.textPrimary
  c['settings.dropdownBorder'] = p.border
  c['settings.textInputBackground'] = elev
  c['settings.textInputForeground'] = p.textPrimary
  c['settings.textInputBorder'] = p.border
  c['settings.numberInputBackground'] = elev
  c['settings.numberInputForeground'] = p.textPrimary
  c['settings.numberInputBorder'] = p.border
  c['settings.focusedRowBackground'] = elev
  c['settings.rowHoverBackground'] = p.background

  // Git decorations
  c['gitDecoration.modifiedResourceForeground'] = p.accent
  c['gitDecoration.ignoredResourceForeground'] = p.textTertiary
  c['gitDecoration.deletedResourceForeground'] = p.red
  c['gitDecoration.renamedResourceForeground'] = p.green
  c['gitDecoration.addedResourceForeground'] = p.green
  c['gitDecoration.untrackedResourceForeground'] = p.amber
  c['gitDecoration.conflictingResourceForeground'] = p.pink
  c['gitDecoration.stageDeletedResourceForeground'] = p.red
  c['gitDecoration.stageModifiedResourceForeground'] = p.accent

  // Terminal
  c['terminal.background'] = p.background
  c['terminal.foreground'] = p.textPrimary
  c['terminal.selectionBackground'] = p.accent + '33'
  c['terminalCursor.background'] = p.background
  c['terminalCursor.foreground'] = p.accent
  c['terminal.ansiBlack'] = p.background
  c['terminal.ansiRed'] = p.red
  c['terminal.ansiGreen'] = p.green
  c['terminal.ansiYellow'] = p.amber
  c['terminal.ansiBlue'] = p.blue
  c['terminal.ansiMagenta'] = p.accent
  c['terminal.ansiCyan'] = p.cyan
  c['terminal.ansiWhite'] = p.textPrimary
  c['terminal.ansiBrightBlack'] = p.textTertiary
  c['terminal.ansiBrightRed'] = p.red + 'cc'
  c['terminal.ansiBrightGreen'] = p.green + 'cc'
  c['terminal.ansiBrightYellow'] = p.amber + 'cc'
  c['terminal.ansiBrightBlue'] = p.blue + 'cc'
  c['terminal.ansiBrightMagenta'] = p.accent + 'cc'
  c['terminal.ansiBrightCyan'] = p.cyan + 'cc'
  c['terminal.ansiBrightWhite'] = p.textPrimary + 'cc'

  // Peek view
  c['peekView.border'] = p.accent
  c['peekViewEditor.background'] = surf
  c['peekViewEditorGutter.background'] = surf
  c['peekViewEditor.matchHighlightBackground'] = p.accent + '33'
  c['peekViewResult.background'] = elev
  c['peekViewResult.fileForeground'] = p.textPrimary
  c['peekViewResult.lineForeground'] = p.textSecondary
  c['peekViewResult.matchHighlightBackground'] = p.accent + '33'
  c['peekViewResult.selectionBackground'] = sec
  c['peekViewResult.selectionForeground'] = p.textPrimary
  c['peekViewTitle.background'] = elev
  c['peekViewTitleDescription.foreground'] = p.textSecondary
  c['peekViewTitleLabel.foreground'] = p.accent

  // Merge conflicts
  c['merge.currentHeaderBackground'] = p.green + '33'
  c['merge.currentContentBackground'] = p.green + '11'
  c['merge.incomingHeaderBackground'] = p.accent + '33'
  c['merge.incomingContentBackground'] = p.accent + '11'
  c['merge.commonHeaderBackground'] = p.textTertiary + '33'
  c['merge.commonContentBackground'] = p.textTertiary + '11'
  c['editorStickyScroll.shadow'] =
    p.background === '#0D0D0F'
      ? '#050508'
      : p.background === '#FFFFFF'
        ? p.border
        : p.background + 'aa'

  // Diff editor
  c['diffEditor.InsertedTextBackground'] = p.green + '22'
  c['diffEditor.removedTextBackground'] = p.red + '22'
  c['diffEditor.insertedLineBackground'] = p.green + '11'
  c['diffEditor.removedLineBackground'] = p.red + '11'

  // Charts
  c['charts.foreground'] = p.textPrimary
  c['charts.lines'] = p.textSecondary
  c['charts.red'] = p.red
  c['charts.blue'] = p.blue
  c['charts.yellow'] = p.amber
  c['charts.orange'] = '#fb923c'
  c['charts.green'] = p.green
  c['charts.purple'] = p.accent

  // Sash
  c['sash.hoverBorder'] = p.accent

  return c
}

// ─── Token Colors ────────────────────────────────────────────────────────────

function mapTokenColors(p: ColorPalette): TokenColor[] {
  return [
    {
      name: 'Comment',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: p.textTertiary, fontStyle: 'italic' },
    },
    {
      name: 'Keywords & Operators',
      scope: ['keyword', 'storage.type', 'storage.modifier', 'keyword.control'],
      settings: { foreground: p.accent, fontStyle: '' },
    },
    {
      name: 'Variables',
      scope: ['variable', 'support.variable', 'variable.parameter', 'meta.parameter'],
      settings: { foreground: p.textPrimary },
    },
    {
      name: 'Variable Property',
      scope: [
        'variable.other.object.property',
        'variable.other.property',
        'support.type.property-name',
      ],
      settings: { foreground: p.textPrimary },
    },
    {
      name: 'Constants',
      scope: ['constant.language', 'constant.numeric', 'constant.character.numeric'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Constant & Built-in',
      scope: ['constant.language', 'support.constant', 'constant.character'],
      settings: { foreground: p.pink },
    },
    {
      name: 'Strings',
      scope: ['string', 'punctuation.definition.string'],
      settings: { foreground: p.green },
    },
    {
      name: 'String Escape',
      scope: ['constant.character.escape', 'string source', 'string source.rust'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Types',
      scope: ['entity.name.type', 'support.type', 'keyword.type'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Classes',
      scope: ['entity.name.class', 'support.class'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Functions',
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Function Call',
      scope: ['meta.function-call', 'meta.function-call entity.name.function'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Methods',
      scope: ['keyword.other.definition', 'storage.type.function'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Tags',
      scope: ['entity.name.tag'],
      settings: { foreground: p.red },
    },
    {
      name: 'Attributes',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Attributes Value',
      scope: ['string.unquoted', 'string.template', 'meta.string-contents'],
      settings: { foreground: p.green },
    },
    {
      name: 'Numbers',
      scope: ['constant.numeric'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Boolean',
      scope: ['constant.language.boolean', 'constant.language.json'],
      settings: { foreground: p.pink },
    },
    {
      name: 'Punctuation',
      scope: [
        'punctuation',
        'punctuation.terminator',
        'punctuation.separator',
        'punctuation.definition',
      ],
      settings: { foreground: p.textSecondary },
    },
    {
      name: 'Delimiter',
      scope: ['delimiter', 'meta.brace'],
      settings: { foreground: p.textSecondary },
    },
    {
      name: 'Preprocessor & Macros',
      scope: ['meta.preprocessor', 'keyword.other.include', 'entity.name.function.preprocessor'],
      settings: { foreground: p.accent + 'cc' },
    },
    {
      name: 'Type Casting',
      scope: ['keyword.other.type', 'storage.type.annotation'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Decorators',
      scope: ['meta.decorator', 'punctuation.decorator'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Regex',
      scope: ['string.regexp', 'keyword.operator.regexp'],
      settings: { foreground: p.cyan },
    },
    {
      name: 'JSON Key',
      scope: ['support.type.property-name.json'],
      settings: { foreground: p.textPrimary },
    },
    {
      name: 'JSON String',
      scope: ['string.quoted.json'],
      settings: { foreground: p.green },
    },
    {
      name: 'YAML Key',
      scope: ['entity.name.tag.yaml'],
      settings: { foreground: p.red },
    },
    {
      name: 'YAML String',
      scope: ['string.unquoted.plain.out.yaml'],
      settings: { foreground: p.green },
    },
    {
      name: 'GitGutter Added',
      scope: ['markup.inserted'],
      settings: { foreground: p.green },
    },
    {
      name: 'GitGutter Deleted',
      scope: ['markup.deleted'],
      settings: { foreground: p.red },
    },
    {
      name: 'GitGutter Changed',
      scope: ['markup.changed'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Block Level Colors',
      scope: ['support.type.vendored.property-name'],
      settings: { foreground: p.textSecondary },
    },
    {
      name: 'Diff',
      scope: ['markup.inserted.diff', 'markup.changed.diff', 'markup.deleted.diff'],
      settings: { foreground: p.textPrimary },
    },
    {
      name: 'ASCII/HEX',
      scope: ['entity.name.section'],
      settings: { foreground: p.accent, fontStyle: 'bold' },
    },
    {
      name: 'Bold',
      scope: ['markup.bold', 'punctuation.definition.bold'],
      settings: { foreground: p.textPrimary, fontStyle: 'bold' },
    },
    {
      name: 'Italic',
      scope: ['markup.italic', 'punctuation.definition.italic'],
      settings: { foreground: p.textPrimary, fontStyle: 'italic' },
    },
    {
      name: 'Heading',
      scope: ['markup.heading'],
      settings: { foreground: p.accent, fontStyle: 'bold' },
    },
    {
      name: 'Quote',
      scope: ['markup.quote'],
      settings: { foreground: p.textTertiary, fontStyle: 'italic' },
    },
    {
      name: 'Separator',
      scope: ['meta.separator'],
      settings: { foreground: p.textSecondary },
    },
    {
      name: 'Lists',
      scope: ['markup.list'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Inline Code',
      scope: ['markup.inline.raw'],
      settings: { foreground: p.green },
    },
    {
      name: 'Inserted',
      scope: ['markup.inserted'],
      settings: { foreground: p.green },
    },
    {
      name: 'Deleted',
      scope: ['markup.deleted'],
      settings: { foreground: p.red },
    },
    {
      name: 'Changed',
      scope: ['markup.changed'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Temporary/Unsolved',
      scope: ['invalid.breadcrumb', 'entity.name.filename'],
      settings: { foreground: p.textPrimary },
    },
    {
      name: 'Invalid',
      scope: ['invalid', 'invalid.illegal'],
      settings: { foreground: p.red },
    },
    {
      name: 'Language names / identifiers',
      scope: ['source', 'variable.language'],
      settings: { foreground: p.textPrimary },
    },
    {
      name: 'Python - Self Keyword',
      scope: ['variable.parameter.function.language.special.self.python'],
      settings: { foreground: p.pink, fontStyle: 'italic' },
    },
    {
      name: 'Python - Self/cls Parameter',
      scope: ['variable.parameter.function.language.special.cls.python'],
      settings: { foreground: p.pink, fontStyle: 'italic' },
    },
    {
      name: 'Python - Decorator',
      scope: ['source.python meta.function.decorator.support.1'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Python - Function Call',
      scope: ['source.python meta.function-call.generic'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Python - Dictionary Value',
      scope: ['meta.dict.python'],
      settings: { foreground: p.textPrimary },
    },
    {
      name: 'Python - Format String',
      scope: ['meta.format.python'],
      settings: { foreground: p.green },
    },
    {
      name: 'TypeScript/JS - Import/Export',
      scope: ['keyword.control.import', 'keyword.control.export'],
      settings: { foreground: p.accent },
    },
    {
      name: 'TypeScript/JS - Module',
      scope: ['variable.other.readwrite.alias'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Rust - Macro',
      scope: ['entity.name.function.macro.rs', 'support.macro.rs'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Rust - Lifetime',
      scope: ['storage.type.life.rs', 'punctuation.definition.lifetime.rs'],
      settings: { foreground: p.textSecondary },
    },
    {
      name: 'Rust - Module Path',
      scope: ['entity.name.type.rs'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Rust - Predeclared struct',
      scope: ['support.type.std.rs'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Rust - Preprocessor keyword',
      scope: ['keyword.other.rgba.rs'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Rust - Storage type',
      scope: ['storage.type.rs'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Rust - Support function',
      scope: ['support.function.rs'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Go - Package',
      scope: ['storage.type.string.go'],
      settings: { foreground: p.green },
    },
    {
      name: 'Go - Import Path',
      scope: ['constant.other.key.go'],
      settings: { foreground: p.green },
    },
    {
      name: 'Go - Function/Method',
      scope: ['keyword.other.function.go'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Go - Function Call',
      scope: ['meta.function.go entity.name.function.go'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Go - Types',
      scope: ['storage.type.go'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Go - Constants',
      scope: ['constant.language.go'],
      settings: { foreground: p.pink },
    },
    {
      name: 'SQL - Databases',
      scope: ['support.type.sql'],
      settings: { foreground: p.amber },
    },
    {
      name: 'INI/ TOML - Lists',
      scope: ['markup.list.toml'],
      settings: { foreground: p.accent },
    },
    {
      name: 'INI/ TOML - Key',
      scope: ['entity.name.section.group-title.ini'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Lua - Tables',
      scope: ['entity.name.type.lua'],
      settings: { foreground: p.amber },
    },
    {
      name: 'Shell',
      scope: ['markup.heading.changelog'],
      settings: { foreground: p.accent },
    },
    {
      name: 'Shell - Process substitution',
      scope: ['meta.brace.shell'],
      settings: { foreground: p.textPrimary },
    },
    {
      name: 'Custom - Brackets, Braces, Parentheses',
      scope: ['support.type.property-name.css', 'keyword.operator.css', 'keyword.other.unit.css'],
      settings: { foreground: p.textSecondary },
    },
  ]
}

// ─── Theme Generator ─────────────────────────────────────────────────────────

function generateTheme(name: string, palette: ColorPalette, type: 'dark' | 'light'): VSCodeTheme {
  return {
    $schema: 'vscode://schemas/color-theme',
    type,
    colors: mapColors(palette),
    tokenColors: mapTokenColors(palette),
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

const themesDir = path.join(__dirname, '..', 'themes')

const themeConfigs: Array<{ name: string; key: string; type: 'dark' | 'light' }> = [
  { name: 'xora.json', key: 'xora', type: 'dark' },
  { name: 'xora-dark.json', key: 'xora-dark', type: 'dark' },
  { name: 'xora-light.json', key: 'xora-light', type: 'light' },
]

console.log('🎨 Generating Xora themes...\n')

for (const config of themeConfigs) {
  const palette = palettes[config.key]
  if (!palette) {
    console.error(`✗ Palette not found: ${config.key}`)
    process.exit(1)
  }

  const theme = generateTheme(config.key, palette, config.type)
  const outputPath = path.join(themesDir, config.name)

  fs.writeFileSync(outputPath, JSON.stringify(theme, null, 2) + '\n', 'utf-8')
  console.log(
    `✓ ${config.name} (${config.type}) — ${Object.keys(theme.colors).length} UI colors, ${theme.tokenColors.length} token rules`,
  )
}

console.log(`\n✅ All themes generated in ${themesDir}`)
