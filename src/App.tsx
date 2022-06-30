import { BrowserRouter } from 'react-router-dom';

import './shared/forms/TranslateYup';

import { DrawerProvider, AppThemeProvider } from './shared/contexts';
import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>

          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
          
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
