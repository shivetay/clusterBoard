import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import mainTheme from './theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={mainTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
export default ThemeProvider;
