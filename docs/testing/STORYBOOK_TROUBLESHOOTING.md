# Storybook troubleshooting

## Reactive-property warning from Lit

Rainbow uses Lit's static `properties` declarations together with TypeScript class fields. The project must compile those fields as constructor assignments rather than native class-field definitions, otherwise the fields can shadow Lit's generated reactive accessors. `tsconfig.json` therefore sets `useDefineForClassFields` to `false`; `tsconfig.storybook.json` inherits that setting.

Do not remove this option as a local workaround. If the project changes its compilation pipeline, verify that the selected TypeScript/Vite/Storybook transform preserves this behavior. The regression test `Lit reactive-property compatibility` verifies that assigning `rainbow-dialog.label` schedules an update and reflects the attribute.

## The canvas looks blank or custom elements are unstyled

1. Run Storybook from the repository root: `pnpm storybook`.
2. Make sure dependencies have been installed from the repository's lockfile (when present): `pnpm install --frozen-lockfile`.
3. Check the browser console for the first error, not just later `Uncaught (in promise)` messages. A single failed custom-element update can prevent the affected story from rendering.
4. `.storybook/preview.ts` imports `src/auto.ts`, which registers every implemented `rainbow-*` element and installs the default theme for every story.
5. Open **Rainbow / All Components** for the component catalogue. Open **Components / Button**, **Components / Input**, **Components / Overlay controls**, and other stories for isolated examples and Controls.
6. Dialogs are intentionally closed until their trigger is activated; context menus open on right-click; tooltips open on hover/focus.

## Validate before reporting a Storybook regression fixed

Run:

```sh
pnpm fmt:check
pnpm lint
pnpm typecheck
pnpm typecheck:storybook
pnpm test
pnpm build-storybook
```

Storybook's development server compiling successfully does not replace production-build validation. Likewise, the All Components gallery is a visual smoke test, not a substitute for automated accessibility and browser tests.


## Lit reactive property warning

If the console says properties such as `open`, `modal`, or `label` on `rainbow-dialog` do not trigger updates because they are class fields, confirm the root `tsconfig.json` contains `"useDefineForClassFields": false` and `.storybook/main.ts` explicitly sets `viteFinal` to pass `tsconfigRaw.compilerOptions.useDefineForClassFields: false`. Storybook's transform must read that project config. Do not patch only `RainbowDialog`: Lit's reactive accessor behavior applies to all components.

If the Storybook sidebar is present but the canvas is empty:

1. Check the first browser-console error; an exception during preview initialization can prevent every story from rendering.
2. Confirm `.storybook/preview.ts` imports `../src/auto.js` and `src/auto.ts` calls `defineRainbowComponents()`.
3. Open **Rainbow / All Components** and check the registration status at the top of the story.
4. Run `pnpm typecheck:storybook` and `pnpm build-storybook` after dependencies are installed. The All Components story is not a substitute for a production Storybook build.
5. Clear Storybook/Vite caches after changing TypeScript class-field settings, then restart the dev server.
