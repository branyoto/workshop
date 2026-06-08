# Technical Spec — OneDrive JSON CMS Data

## New components and modules

- `src/cms/types.ts`
- `src/cms/client.ts`
- `src/cms/normalize.ts`
- `src/cms/imageUrl.ts`
- `src/cms/useCmsData.ts`
- `src/cms/sample-content.json`
- `src/cms/tagIndex.ts`
- `src/cms/imageManifest.ts`

## Reused components

- Reuse `Spinner` for loading CMS data.
- Reuse `EmptyState` for missing or invalid content.
- Reuse `Snackbar` for CMS load errors with retry.

## Explicit URLs

- CMS JSON URL: configured as `VITE_CMS_JSON_URL`.
- OneDrive image base URL: configured as `VITE_ONEDRIVE_IMAGE_BASE_URL`.
- The app does not hard-code a production OneDrive URL in source code.
- Example development URL: `/cms/sample-content.json`.
- Public users have read-only access to the OneDrive JSON and images.
- Write access is reserved for authenticated admins through `/admin/cms`.

## Data shape

```ts
type Locale = 'fr' | 'en';
type LocalizedText = { fr: string; en?: string };
type CharacteristicKey = 'dimension' | 'color' | 'weight' | 'material';

type CmsContent = {
  version: number;
  updatedAt: string;
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
  imageId?: string;
  tags: string[];
  children?: CategoryView[];
};

type Item = {
  id: string;
  imageId: string;
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
- Image names are derived from `imageId`.
- Thumbnail file format: `imageId_thumbnail`.
- Carousel image file format: `imageId_0-xxx`, where `xxx` is the image extension or configured suffix.
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
