import { Route, Routes } from 'react-router';
import { AppShell } from '../layout/AppShell';
import { CatalogPage } from '../pages/catalog/CatalogPage';
import { CheckoutPage } from '../pages/checkout/CheckoutPage';
import { ContactPage } from '../pages/contact/ContactPage';
import { HomePage } from '../pages/home/HomePage';
import { ItemPage } from '../pages/item/ItemPage';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="catalog/:categoryId" element={<CatalogPage />} />
        <Route path="catalog/:categoryId/:subcategoryId" element={<CatalogPage />} />
        <Route path="catalog/:categoryId/:subcategoryId/:subId" element={<CatalogPage />} />
        <Route path="item/:id" element={<ItemPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
