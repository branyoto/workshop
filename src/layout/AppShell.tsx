import { useState } from 'react';
import { Outlet } from 'react-router';
import { CartDrawer } from './cartDrawer/CartDrawer';
import { AppDrawer } from './appDrawer/AppDrawer';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function AppShell() {
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-svh flex-col bg-white">
      <SiteHeader onOpenCategoryDrawer={() => setCategoryDrawerOpen(true)} onOpenCartDrawer={() => setCartDrawerOpen(true)} />
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <SiteFooter />
      <AppDrawer open={categoryDrawerOpen} onClose={() => setCategoryDrawerOpen(false)} />
      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </div>
  );
}
