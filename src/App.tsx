import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import { CmsGate } from './pages/cms/CmsGate';
import { queryClient } from './queryClient';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CmsGate>
          <AppRoutes />
        </CmsGate>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
