# Technical Spec — Admin Login and CMS Editing

## New components and modules

- `src/pages/admin/LoginPage.tsx`
- `src/pages/admin/CmsEditPage.tsx`
- `src/pages/admin/CmsJsonEditor.tsx`
- `src/pages/admin/CmsPreview.tsx`
- `src/pages/admin/AdminToolbar.tsx`
- `src/auth/adminAuth.ts`
- `src/auth/useAdminSession.ts`
- `src/cms/cmsWriteClient.ts`
- `src/routes/RequireAdmin.tsx`

## Reused components

- `AppShell`
- `Button`
- `Card`
- `EmptyState`
- `Snackbar`
- `Spinner`
- `form-field`
- `section`
- `stack`

## Explicit URLs

- Login page: `/login`
- Admin CMS edit page: `/admin/cms`
- Successful login redirect target: `/admin/cms`
- Logout redirect target: `/`
- Unauthorized admin access redirects to `/login?redirect=/admin/cms`

## Access rules

- OneDrive CMS JSON and images are publicly readable.
- Public users must never receive OneDrive write credentials.
- CMS writes are available only after admin login.
- `/admin/cms` must be protected by `RequireAdmin`.
- Admin login must establish a short-lived admin session.
- Admin save submits the edited JSON through an authenticated write adapter.
- The first implementation can keep the write adapter isolated if the exact OneDrive write mechanism is not finalized.

## Translation keys

- `admin.login.meta.title`
- `admin.login.title`
- `admin.login.email`
- `admin.login.password`
- `admin.login.submit`
- `admin.login.submitting`
- `admin.login.error.invalid`
- `admin.login.error.generic`
- `admin.cms.meta.title`
- `admin.cms.title`
- `admin.cms.loading`
- `admin.cms.editorLabel`
- `admin.cms.preview`
- `admin.cms.validate`
- `admin.cms.save`
- `admin.cms.saving`
- `admin.cms.saved`
- `admin.cms.error.invalidJson`
- `admin.cms.error.validation`
- `admin.cms.error.saveFailed`
- `admin.cms.logout`

## CSS classes

- `admin-login-page`
- `admin-login-page__card`
- `admin-login-form`
- `admin-login-form__actions`
- `admin-cms-page`
- `admin-cms-page__header`
- `admin-cms-page__layout`
- `admin-toolbar`
- `admin-toolbar__actions`
- `cms-json-editor`
- `cms-json-editor__field`
- `cms-preview`
- `cms-preview__section`

## Implementation details

- Use React Router for protected routing and redirects.
- Use i18next translation keys for all labels and validation messages.
- Validate JSON before enabling save.
- Reuse CMS normalization before save so admin edits are checked against the same rules as public rendering.
- Keep admin write code separate from public read code.
- Use semicolons, Prettier, and ESLint.

