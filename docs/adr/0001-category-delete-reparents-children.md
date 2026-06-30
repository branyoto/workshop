# Category deletion re-parents children rather than cascading

When a category is deleted, its children are moved to the deleted category's parent (or become root categories if the deleted category had no parent). We chose re-parenting over cascade deletion because losing a subtree of categories would silently orphan items from the catalog — a destructive and hard-to-recover outcome. Re-parenting keeps the data intact and lets the editor decide what to do with the children afterward.

