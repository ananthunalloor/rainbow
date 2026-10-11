import { readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [
  packageJson,
  mainConfig,
  previewConfig,
  registrySource,
  autoEntry,
  gallerySource,
  storyFiles,
] = await Promise.all([
    readFile(join(root, 'package.json'), 'utf8').then(JSON.parse),
    readFile(join(root, '.storybook/main.ts'), 'utf8'),
    readFile(join(root, '.storybook/preview.ts'), 'utf8'),
    readFile(join(root, 'src/components/index.ts'), 'utf8'),
    readFile(join(root, 'src/auto.ts'), 'utf8'),
    readFile(join(root, 'stories/AllComponents.stories.ts'), 'utf8'),
    readdir(join(root, 'stories')),
  ]);

const errors = [];
const sideEffects = packageJson.sideEffects;
if (
  !Array.isArray(sideEffects) ||
  !sideEffects.includes('./src/auto.ts') ||
  !sideEffects.includes('./dist/auto.js')
) {
  errors.push('package.json must preserve src/auto.ts and dist/auto.js as side-effectful entrypoints.');
}

if (!mainConfig.includes("'../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'")) {
  errors.push('Storybook story glob must include JS, TS, JSX, TSX, MJS, and MDX story files.');
}
if (!mainConfig.includes('useDefineForClassFields: false')) {
  errors.push('Storybook esbuild config must disable define semantics for Lit reactive class fields.');
}
if (!previewConfig.includes('defineRainbowComponents();')) {
  errors.push('Storybook preview must explicitly register Rainbow custom elements.');
}
if (!previewConfig.includes('installRainbowTheme();')) {
  errors.push('Storybook preview must explicitly install theme tokens and CSS variables.');
}
if (!autoEntry.includes('defineRainbowComponents();') || !autoEntry.includes('installRainbowTheme();')) {
  errors.push('The public auto entrypoint must register components and install theme tokens.');
}

const typedTags = [...registrySource.matchAll(/'((?:rainbow)-[a-z-]+)'\s*:/g)].map(
  (match) => match[1],
);
const galleryMatch = gallerySource.match(/const tags = \[([\s\S]*?)\];/);
const galleryTags = galleryMatch
  ? [...galleryMatch[1].matchAll(/'((?:rainbow)-[a-z-]+)'/g)].map((match) => match[1])
  : [];
if (typedTags.length !== 19) {
  errors.push(`Expected 19 typed Rainbow tags; found ${typedTags.length}.`);
}
if (new Set(typedTags).size !== typedTags.length) {
  errors.push('Typed Rainbow tag map contains duplicates.');
}
if (new Set(galleryTags).size !== galleryTags.length) {
  errors.push('All Components gallery contains duplicate tag entries.');
}
const missingGalleryTags = typedTags.filter((tag) => !galleryTags.includes(tag));
const unknownGalleryTags = galleryTags.filter((tag) => !typedTags.includes(tag));
if (missingGalleryTags.length) {
  errors.push(`Gallery is missing public elements: ${missingGalleryTags.join(', ')}.`);
}
if (unknownGalleryTags.length) {
  errors.push(`Gallery references unknown elements: ${unknownGalleryTags.join(', ')}.`);
}

const registrationBody =
  registrySource.match(/export function defineRainbowComponents\(\): void \{([\s\S]*?)\n\}/)?.[1] ??
  '';
const registrationCalls = [...registrationBody.matchAll(/\b(defineRainbow[A-Z]\w*)\(\)/g)].map(
  (match) => match[1],
);
const importedDefinitions = [...registrySource.matchAll(/import \{([^}]+)\} from '\.\/[^']+\.js';/g)]
  .flatMap((match) => match[1].split(',').map((entry) => entry.trim().split(/\s+as\s+/)[0]))
  .filter((name) => name.startsWith('defineRainbow'));
const missingRegistrationCalls = importedDefinitions.filter((name) => !registrationCalls.includes(name));
if (missingRegistrationCalls.length) {
  errors.push(`Registry omits calls: ${missingRegistrationCalls.join(', ')}.`);
}
if (new Set(registrationCalls).size !== registrationCalls.length) {
  errors.push('Registry contains duplicate registration calls.');
}
if (registrationCalls.length !== typedTags.length) {
  errors.push(`Expected ${typedTags.length} registration calls; found ${registrationCalls.length}.`);
}

const stories = storyFiles.filter((file) => /\.stories\.(?:js|jsx|mjs|ts|tsx|mdx)$/.test(file));
if (stories.length === 0) {
  errors.push('No Storybook stories were found in the stories directory.');
}

if (errors.length) {
  process.stderr.write(
    `Storybook configuration check failed:\n${errors.map((error) => `- ${error}`).join('\n')}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Storybook configuration OK: ${stories.length} story files, ${typedTags.length} public tags, ` +
      `${registrationCalls.length} registration calls, gallery coverage complete.\n`,
  );
}
