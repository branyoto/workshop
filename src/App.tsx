import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { CartProvider } from './cart/CartContext';
import { CmsGate } from './pages/cms/CmsGate';
import { queryClient } from './queryClient';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CartProvider>
          <CmsGate>
            <AppRoutes />
          </CmsGate>
        </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
