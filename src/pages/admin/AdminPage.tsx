import { useSearchParams } from 'react-router';
import { AdminItemList } from './list/AdminItemList';
import { AdminItemForm } from './form/AdminItemForm';
import { AdminHeader } from './AdminHeader';
import { AdminModificationProvider } from './ModificationProvider/AdminModificationProvider';
import { AdminCategoriesTab } from './categories/AdminCategoriesTab';
import { AdminFeaturedTab } from './featured/AdminFeaturedTab';
import { AdminColorsAndTagsTab } from './colorsAndTags/AdminColorsAndTagsTab';
import clsx from 'clsx';

type AdminTab = 'items' | 'categories' | 'featured' | 'colorsAndTags';

const VALID_TABS: AdminTab[] = ['items', 'categories', 'featured', 'colorsAndTags'];

const TABS: { id: AdminTab; label: string }[] = [
  { id: 'items', label: 'Produits' },
  { id: 'categories', label: 'Catégories' },
  { id: 'featured', label: 'À la une' },
  { id: 'colorsAndTags', label: 'Couleurs & Libellés' },
];

export function AdminPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as AdminTab | null;
  const activeTab: AdminTab = tabParam && VALID_TABS.includes(tabParam) ? tabParam : 'items';
  const setActiveTab = (tab: AdminTab) => setSearchParams({ tab });

  return (
    <AdminModificationProvider>
      <section className="space-y-6" aria-labelledby="admin-heading">
        <AdminHeader />
        <div className="flex gap-1 border-b border-neutral/50">
          {TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'px-4 py-2 text-sm font-medium transition-colors -mb-px border-b-2',
                activeTab === tab.id ? 'border-accent text-accent' : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-neutral/50',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'items' && (
          <div className="flex gap-4">
            <AdminItemList />
            <AdminItemForm />
          </div>
        )}
        {activeTab === 'categories' && <AdminCategoriesTab />}
        {activeTab === 'featured' && <AdminFeaturedTab />}
        {activeTab === 'colorsAndTags' && <AdminColorsAndTagsTab />}
      </section>
    </AdminModificationProvider>
  );
}
