# Category images are not updated when a category id changes

Category thumbnail images are static files named after the category id (e.g. `amigurumi_thumbnail.png`). When a category id is renamed in the admin, the image reference breaks silently — the app falls back to a placeholder. We accepted this because image management (upload, rename, delete) is out of scope for the current admin lot. A future lot should either enforce image naming to match category ids or introduce an explicit image field on categories.

