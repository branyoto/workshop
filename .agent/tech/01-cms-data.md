# Technical Spec — OneDrive JSON CMS Data

## New components and modules

- `src/pages/cms/types.ts`
- `src/pages/cms/client.ts`
- `src/pages/cms/normalize.ts`
- `src/pages/cms/imageUrl.ts`
- `src/pages/cms/useCmsData.ts`
- `src/pages/cms/sample-content.json`
- `src/pages/cms/tagIndex.ts`
- `src/pages/cms/imageManifest.ts`

## Reused components

- Reuse `Spinner` for loading CMS data.
- Reuse `EmptyState` for missing or invalid content.
- Reuse `Snackbar` for CMS load errors with retry.

## Explicit URLs

- CMS JSON URL: configured as `VITE_CMS_JSON_URL`.
- OneDrive image base URL: configured as `VITE_ONEDRIVE_IMAGE_BASE_URL`.
- The app does not hard-code a production OneDrive URL in source code.
- Example development URL: `/pages/cms/sample-content.json`.
- Public users have read-only access to the OneDrive JSON and images.
- Write access is reserved for authenticated admins through `/pages/admin/cms`.

## Data shape

```ts
type Locale = 'fr' | 'en';
type LocalizedText = { fr: string; en?: string };
type CharacteristicKey = 'dimension' | 'color' | 'weight' | 'material';

type CmsContent = {
  settings: {
    artistEmail: string;
    adminEmails: string[];
    socialLinks: Array<{ type: 'instagram' | 'facebook' | 'website'; url: string }>;
    address?: LocalizedText;
  };
  categories: CategoryView[];
  items: Item[];
  featuredCategoryIds: string[];
  featuredItemIds: string[];
  tags: string[];
  contact: ContactContent;
  legalLinks: Array<{ key: 'cgv' | 'cgu'; url: string }>;
};

type CategoryView = {
  id: string;
  name: LocalizedText;
  description?: LocalizedText;
  tags: string[];
  children?: CategoryView[];
};

type Item = {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  price: number;
  tags: string[];
  available: boolean;
  characteristics?: Partial<Record<CharacteristicKey, string>>;
};
```

## CMS rules

- The CMS is one JSON file provided from OneDrive.
- The CMS JSON is fetched once per page render and distributed through a provider/hook cache for that page.
- Do not refetch the CMS JSON independently in child components.
- Images are stored in the same OneDrive repository as the JSON file.
- Image storage is flat: no nested image folders.
- Image names are derived from the owning category or item `id`.
- Category thumbnail file format: `${category.id}_thumbnail.png`.
- Item thumbnail file format: `${item.id}_thumbnail.png`.
- Item carousel image file format: `${item.id}_xxx.png`, where `xxx` is the carousel image index.
- Resolve thumbnails and carousel images with `imageUrl.ts`.
- Categories are front-end views over tags, not item-owned category data.
- Categories use `id`, not `slug`, in CMS data and URLs.
- Featured homepage items come only from `featuredItemIds`; items must not include `featured: true`.
- Featured homepage categories come only from `featuredCategoryIds`; items must not include `featured: true`.
- Characteristic values stay in CMS data, but labels are translated in the front-end using stable keys.
- Available filter tags come from the CMS JSON `tags` list.
- If `tags` is absent, derive the filter tag list once while normalizing the CMS by collecting unique tags from items and category views.
- OneDrive write operations are forbidden for public visitors and allowed only for authenticated admins.

## Translation keys

- `pages.cms.loading`
- `pages.cms.error.title`
- `pages.cms.error.description`
- `pages.cms.error.retry`
- `pages.cms.empty.title`
- `pages.cms.empty.description`
- `pages.item.characteristics.dimension`
- `pages.item.characteristics.color`
- `pages.item.characteristics.weight`
- `pages.item.characteristics.material`

## CSS classes

- `cms-state`
- `cms-state--loading`
- `cms-state--error`
- `cms-state__actions`

## Validation details

- Validate required top-level arrays before rendering pages.
- Drop invalid featured item IDs from rendered lists and log a development warning.
- Keep unknown item tags; they are still usable by the tag filter.
- Missing English localized content falls back to French.
- Normalization returns a `tagList` used by catalog filters.
- Normalization returns image URLs for thumbnails and carousel images without child components rebuilding OneDrive paths.
