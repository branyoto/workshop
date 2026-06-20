import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const cmsPath = join(rootDir, 'public', 'cms.json');
const schemaPath = join(rootDir, 'schemas', 'cms.schema.json');
const imagesDir = join(rootDir, 'public', 'images');

function fail(message) {
  console.error(message);
  process.exit(1);
}

function collectCategoryIds(categories) {
  const ids = [];

  for (const category of categories) {
    ids.push(category.id);
    if (Array.isArray(category.children) && category.children.length > 0) {
      ids.push(...collectCategoryIds(category.children));
    }
  }

  return ids;
}

function formatAjvErrors(errors) {
  return errors
    .map(error => {
      const path = error.instancePath || '/';
      const detail = error.message ?? 'invalid value';
      return `${path}: ${detail}`;
    })
    .join('\n');
}

function validateSchema(content) {
  const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const valid = validate(content);

  if (!valid) {
    fail(`CMS schema validation failed:\n${formatAjvErrors(validate.errors)}`);
  }
}

function validateImages(content) {
  const categoryIds = collectCategoryIds(content.categories ?? []);
  const itemIds = (content.items ?? []).map(item => item.id);
  const referencedIds = [...new Set([...categoryIds, ...itemIds])];
  const missing = referencedIds.filter(id => {
    const imagePath = join(imagesDir, `${id}_thumbnail.png`);
    return !existsSync(imagePath);
  });

  if (missing.length > 0) {
    const lines = missing.map(id => `  - public/images/${id}_thumbnail.png`);
    fail(`Missing thumbnail images for ${missing.length} CMS id(s):\n${lines.join('\n')}`);
  }
}

if (!existsSync(cmsPath)) {
  fail('public/cms.json was not found');
}

let content;
try {
  content = JSON.parse(readFileSync(cmsPath, 'utf8'));
} catch (error) {
  fail(`public/cms.json is not valid JSON: ${error.message}`);
}

validateSchema(content);
validateImages(content);

console.log('CMS validation passed.');
