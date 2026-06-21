import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { CartProvider } from './services/providers/cart/CartProvider';
import { CmsProvider } from './services/providers/cms/CmsProvider';
import { queryClient } from './services/query/queryClient';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CartProvider>
          <CmsProvider>
            <AppRoutes />
          </CmsProvider>
        </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
