import { AdminItemList } from './list/AdminItemList';
import { AdminItemForm } from './form/AdminItemForm';
import { AdminHeader } from './AdminHeader';
import { AdminModificationProvider } from './utils/AdminModificationProvider';

export function AdminPage() {
  return (
    <AdminModificationProvider>
      <section className="space-y-6" aria-labelledby="admin-heading">
        <AdminHeader />
        <div className="flex gap-4">
          <AdminItemList />
          <AdminItemForm />
        </div>
      </section>
    </AdminModificationProvider>
  );
}
