# Grid Layout Structure

## Overview
A CSS Grid layout container with the following sections:

## Grid Areas

```
┌─────────────────────────────────────────┐
│           HEADER                        │
├──────────┬──────────────────────────────┤
│          │                              │
│          │                              │
│  MENU    │      MAIN CONTENT            │
│          │                              │
│          │                              │
│          │                              │
├──────────┴──────────────────────────────┤
│           FOOTER                        │
└─────────────────────────────────────────┘
```

## Grid Template

### Grid Template Areas
```css
grid-template-areas:
  "header header header"
  "menu   main   main"
  "footer footer footer";
```

### Grid Template Rows
- Header: Fixed height (e.g., 64px or auto)
- Main content area: `1fr` (takes remaining space)
- Footer: Fixed height (e.g., 48px or auto)

### Grid Template Columns
- Menu/Sidebar: Fixed width (e.g., 250px or auto)
- Main content: `1fr` (takes remaining space)

## Complete Grid Configuration

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "menu   main   main"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 250px 1fr;
  height: 100vh;
  width: 100vw;
}

.header {
  grid-area: header;
}

.menu {
  grid-area: menu;
}

.main {
  grid-area: main;
}

.footer {
  grid-area: footer;
}
```

## Responsive Considerations

- On mobile/small screens, the menu can be hidden or converted to a drawer
- Header and footer remain fixed
- Main content area should be scrollable if content overflows

## Material-UI Styled Component Example

```typescript
export const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateAreas: `
    "header header header"
    "menu   main   main"
    "footer footer footer"
  `,
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateColumns: '250px 1fr',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
}));

export const Header = styled(Box)(({ theme }) => ({
  gridArea: 'header',
}));

export const Menu = styled(Box)(({ theme }) => ({
  gridArea: 'menu',
  overflowY: 'auto',
}));

export const MainContent = styled(Box)(({ theme }) => ({
  gridArea: 'main',
  overflowY: 'auto',
  padding: theme.spacing(2),
}));

export const Footer = styled(Box)(({ theme }) => ({
  gridArea: 'footer',
}));
```

