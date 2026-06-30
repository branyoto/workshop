# Workshop CMS

A handcrafted goods shop with a static JSON CMS. The admin page edits the CMS JSON directly — there is no backend.

## Language

### Catalog

**Item**: A handcrafted product available for sale. Has a price, availability status, bilingual title and description, tags, and optional characteristics (colors, dimension, material, weight).
_Avoid_: Product, article, object.

**Category**: A thematic grouping of items. Categories form a tree (parents and children) with no depth limit. A category carries a list of tag ids that define which items belong to it.
_Avoid_: Group, collection, section.

**Tag**: A cross-cutting label attached to both items and categories. Identified by a stable key; carries bilingual display names (fr/en). Tags on an item describe what it is; tags on a category define the set of items it displays.
_Avoid_: Label, keyword, filter.

**Color**: A visual characteristic option for an item. Identified by a stable key; carries bilingual display names (fr/en). Colors live in a glossary and are referenced by key from item characteristics.
_Avoid_: Variant, option.

**Featured**: A curated, ordered list of item ids or category ids shown prominently on the home page. Order is significant — first entry is displayed first.
_Avoid_: Highlighted, promoted, pinned.

### Data

**CMS**: The single JSON file (`public/cms.json`) that holds all catalog content: categories, items, tags, colors, featured lists, contact, and legal links.

**Localized text**: A text value with a required French translation (`fr`) and an optional English translation (`en`).
_Avoid_: i18n string, translation, multilingual field.

**Key** (of a tag or color): The stable string identifier used to reference a tag or color from items and categories. Distinct from the display name. Renaming a key must be propagated to all references.
_Avoid_: Id (when referring specifically to tag/color identifiers, prefer "key" to distinguish from entity ids).

