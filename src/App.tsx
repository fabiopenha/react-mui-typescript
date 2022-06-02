import { BrowserRouter } from "react-router-dom";

import { AppThemeProvider } from "./shared/contexts";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <AppThemeProvider themeName={"light"} toggleTheme={function (): void {}}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  );
};
