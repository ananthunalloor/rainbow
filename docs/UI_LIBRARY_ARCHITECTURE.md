# UI Component Library — Architecture Specification

**Status:** Proposed
**Phase:** 1 — Architecture & Requirements
**Architecture baseline:** Greenfield
**Implementation:** Lit + standards-based Web Components
**Primary goal:** Framework-independent components with first-class theming and Tailwind integration

## 1. Purpose

This document defines the architectural contract for a new UI component library.

The library is a **Web Platform component library first**. Lit is the implementation technology. React, Vue, Svelte, Solid, Angular, Astro, and other frameworks are consumers.

The architecture must not inherit structural, styling, packaging, or API decisions from an existing application or framework-specific component library. Existing libraries may be researched for UX and API conventions, but their implementation architecture is not the starting point.

## 2. Architecture principles

### 2.1 Web Platform first

The public contract is based on:

- Custom Elements
- Shadow DOM
- HTML attributes and properties
- DOM events
- slots
- CSS custom properties
- CSS parts
- standard form and accessibility APIs

Example:

```html
<cell-button variant="primary">Save</cell-button>
```

Framework wrappers must never become the canonical API.

### 2.2 Lit is an implementation detail

Lit provides rendering, reactive properties, templating, lifecycle handling, and component authoring. Consumers must not need Lit knowledge to use the library.

The core package must have no runtime dependency on React, Vue, Svelte, Solid, Angular, or another UI framework.

### 2.3 Standards over reinvention

Prefer native HTML and browser APIs whenever they provide the required semantics or behavior.

Examples:

- native `<button>` before an ARIA button abstraction
- native form semantics before a custom form model
- `ElementInternals`/form-associated custom elements where appropriate
- native `<dialog>` capabilities where they satisfy the requirements
- DOM events instead of framework-specific callbacks

ARIA must follow the WAI-ARIA specification and WAI-ARIA Authoring Practices Guide. Incorrect ARIA is worse than no ARIA.

### 2.4 Encapsulation

Shadow DOM should be the default component boundary. Internal DOM structure is not public API.

Supported customization mechanisms are:

1. documented attributes and properties
2. CSS custom properties
3. CSS parts
4. slots
5. documented host-level styling

Consumers must not depend on undocumented internal selectors.

### 2.5 Accessibility is architectural

Accessibility is part of the component contract, not a later QA activity.

Every interactive component must define:

- semantic role
- accessible-name/description requirements
- keyboard interaction
- focus behavior
- disabled/readonly behavior
- state communication where applicable
- reduced-motion behavior where applicable

Patterns should follow native platform conventions and WAI-ARIA APG.

## 3. Public component API

Every component must document:

### Element

```text
<cell-button>
```

### Attributes

```text
variant
size
disabled
```

### Properties

Typed properties may expose richer values than their serialized attributes.

### Events

Events must be standard DOM events or typed `CustomEvent`s. Names and payloads must be stable and documented.

Example:

```text
cell-change
cell-open
cell-close
```

### Slots

Slots must be explicit and documented:

```text
default
prefix
suffix
```

### CSS custom properties

Only documented variables are public API:

```css
--cell-button-background
--cell-button-color
--cell-button-radius
```

### CSS parts

Use `::part()` for intentionally exposed internal styling surfaces:

```css
cell-button::part(base) { }
```

Parts must be minimal and semantically named.

### Methods

Methods are allowed when behavior cannot reasonably be represented by attributes, properties, or events. Methods must be documented, typed, and stable.

## 4. Naming

The library will use a stable custom-element prefix. The proposed prefix is `cell-`:

```text
cell-button
cell-input
cell-dialog
cell-tabs
```

The prefix is a public compatibility boundary. Changing it after 1.0 is a breaking change.

The naming convention must be finalized before the first component is published.

## 5. Styling architecture

### 5.1 Single source of truth

Design tokens must have one canonical source.

```text
Primitive tokens
      |
      v
Semantic tokens
      |
      v
Component tokens
      |
      +-------------------+
      |                   |
      v                   v
Lit component CSS     Tailwind theme
```

A component must not hard-code values that should be represented by tokens.

### 5.2 Token layers

**Primitive tokens** represent raw values:

```text
blue-500
gray-900
space-4
radius-md
```

**Semantic tokens** represent meaning:

```text
color-background
color-foreground
color-primary
color-danger
color-border
```

**Component tokens** represent component-specific decisions:

```text
button-primary-background
button-primary-foreground
button-radius
```

### 5.3 CSS custom properties

Theme values must be exposed as CSS custom properties and consumed by components through inheritance.

```css
:root {
  --cell-color-primary: ...;
  --cell-color-background: ...;
  --cell-color-foreground: ...;
}
```

## 6. Theme architecture

The theme system must support:

- light
- dark
- system preference
- custom themes
- runtime switching
- nested theme scopes
- user overrides
- reduced motion
- forced-colors/high-contrast considerations
- RTL/LTR directionality

Theme selection must be framework-independent.

A theme may be scoped using an attribute:

```html
<html data-cell-theme="light">
```

Nested scopes must be possible:

```html
<section data-cell-theme="dark">
  <cell-button>Action</cell-button>
</section>
```

Theme switching should primarily change inherited CSS variables rather than mutate every component instance from JavaScript.

## 7. Tailwind integration

Tailwind is an integration layer, not the component's internal styling engine.

Lit component styles own internal structure, state, interaction presentation, and accessibility presentation inside Shadow DOM.

Tailwind may control application-level layout, spacing, sizing, responsive layout, containers, and host-element styling.

Example:

```html
<div class="mx-auto flex max-w-xl gap-4 p-6">
  <cell-button class="w-full">Save</cell-button>
</div>
```

The library must render correctly without Tailwind.

### 7.1 Token bridge

The same canonical design-token source must be exportable to Tailwind. The exact Tailwind integration mechanism will be selected after the token schema is finalized.

The desired consumer experience is token-aligned utilities such as:

```html
<div class="bg-cell-primary text-cell-foreground"></div>
```

The library must not require Tailwind to penetrate the Shadow DOM.

## 8. Framework interoperability

The core library must be framework-neutral.

Required validation targets:

| Environment | Requirement |
|---|---|
| Plain HTML | Required |
| Vite | Required |
| React | Required |
| Vue | Required |
| Svelte | Required |
| Solid | Required |
| Astro | Required |
| Angular | Compatibility target |
| Next.js | Compatibility target |
| Nuxt | Compatibility target |
| SvelteKit | Compatibility target |

Framework-specific packages, if required later, must be thin interoperability layers and must not duplicate component implementations.

## 9. Package architecture

The package layout must be derived from dependency boundaries rather than an existing repository.

Initial logical boundaries are:

```text
ui-core
ui-tokens
ui-theme
ui-components
ui-icons
ui-testing
ui-tailwind
```

These may later be consolidated or split based on measured dependency and distribution requirements.

The published library must support:

- ESM
- TypeScript declarations
- tree-shaking
- explicit package exports
- clear side-effect declarations
- source maps
- documented browser targets
- stable entry points

Importing one component must not require loading unrelated components.

## 10. Component registration

Components must use the standards-based Custom Elements registry.

The architecture must explicitly define policies for:

- automatic registration
- explicit registration
- duplicate registration
- lazy registration
- SSR
- hydration
- custom-element name collisions

Registration behavior must be deterministic.

## 11. SSR and hydration

SSR compatibility must be considered from the beginning.

Components must:

- avoid browser-only work during module evaluation
- avoid requiring `window`/`document` during server evaluation
- defer browser-only behavior to appropriate lifecycle stages
- tolerate server-rendered markup and delayed client initialization

The concrete SSR strategy will be selected and validated during the foundation phase.

## 12. Forms

Form-associated components must use native form behavior where appropriate.

The architecture must evaluate `ElementInternals` and form-associated custom elements before inventing a custom form abstraction.

Requirements include:

- value
- disabled
- required
- validation
- reset
- submission
- labels
- descriptions
- errors
- validity state

## 13. Events

Events must be:

- DOM-native
- cancelable where cancellation is meaningful
- composed when they must cross Shadow DOM
- consistently named
- typed
- documented

The library must not make framework callback conventions the canonical API.

## 14. Testing architecture

Every component must be tested at multiple levels.

### Unit

- state
- properties
- attributes
- rendering
- events

### DOM

- slots
- shadow DOM
- focus
- keyboard interaction

### Accessibility

- automated accessibility checks
- accessible names
- ARIA state
- keyboard behavior
- focus management

### Visual

- light
- dark
- system
- custom themes
- RTL
- forced colors/high contrast where supported

### Browser

At minimum, validate supported behavior in Chromium, Firefox, and WebKit.

### Framework integration

Representative framework applications must consume the built package, not source internals.

## 15. Documentation contract

Every component must document:

1. purpose
2. installation/import
3. HTML usage
4. attributes
5. properties
6. methods
7. events
8. slots
9. CSS custom properties
10. CSS parts
11. accessibility
12. keyboard behavior
13. theming
14. Tailwind usage
15. framework usage
16. limitations

Documentation examples must use only public APIs.

## 16. Versioning and compatibility

Use Semantic Versioning.

Breaking changes include:

- removing a component
- removing an attribute/property
- incompatible event changes
- incompatible event payload changes
- removing public CSS custom properties
- removing public CSS parts
- changing registration semantics
- incompatible token semantics

The public API surface must be machine-checkable where practical.

## 17. Security and robustness

Components must avoid:

- unsafe HTML interpolation
- unnecessary `innerHTML`
- uncontrolled DOM injection
- global mutable state
- global CSS leakage
- undocumented global event listeners
- unnecessary runtime dependencies

Any raw HTML escape hatch must be explicit, documented, and tested.

## 18. Performance goals

The architecture should optimize for:

- tree-shaking
- low per-component runtime overhead
- lazy loading where useful
- limited global CSS
- limited global JavaScript
- predictable rendering
- minimal unnecessary observers/listeners

Performance budgets will be defined during the foundation phase and enforced in CI once baselines exist.

## 19. Decisions that require explicit approval

Before production implementation, record decisions for:

- browser support matrix
- minimum Node/TypeScript versions
- Lit version policy
- package manager/build system
- package layout
- token source format
- theme selector strategy
- automatic vs explicit registration
- SSR strategy
- testing stack
- documentation stack
- visual regression strategy
- release/versioning system
- Tailwind integration strategy
- icon strategy
- localization strategy
- RTL strategy

## 20. Phase 1 tickets

### UI-001 — Define browser support

**Deliverable:** `BROWSER_SUPPORT.md`

Acceptance:

- supported browsers documented
- unsupported browsers documented
- platform feature constraints documented

### UI-002 — Define public API conventions

**Deliverable:** `COMPONENT_API.md`

Acceptance:

- element naming
- attributes
- properties
- methods
- events
- slots
- CSS variables
- CSS parts
- naming rules

### UI-003 — Define accessibility contract

**Deliverable:** `ACCESSIBILITY.md`

Acceptance:

- WCAG target documented
- ARIA policy documented
- keyboard policy documented
- focus policy documented
- native HTML-first policy documented

### UI-004 — Define token architecture

**Deliverable:** `DESIGN_TOKENS.md`

Acceptance:

- primitive tokens
- semantic tokens
- component tokens
- naming rules
- CSS variable rules

### UI-005 — Define theme architecture

**Deliverable:** `THEMING.md`

Acceptance:

- light
- dark
- system
- custom
- nested themes
- runtime switching
- forced colors
- reduced motion
- RTL

### UI-006 — Define Tailwind contract

**Deliverable:** `TAILWIND.md`

Acceptance:

- host styling
- token bridge
- Shadow DOM boundary
- supported customization
- prohibited internal-selector assumptions

### UI-007 — Define framework compatibility matrix

**Deliverable:** `FRAMEWORK_SUPPORT.md`

Acceptance:

- plain HTML
- React
- Vue
- Svelte
- Solid
- Astro
- Angular
- Next.js
- Nuxt
- SvelteKit

### UI-008 — Define packaging contract

**Deliverable:** `PACKAGING.md`

Acceptance:

- ESM
- declarations
- exports
- tree-shaking
- side effects
- source maps
- browser targets

### UI-009 — Architecture review

**Deliverable:** `ARCHITECTURE_DECISIONS.md`

Acceptance:

- UI-001 through UI-008 reviewed
- unresolved decisions explicitly listed
- no production components started before approval

## 21. Definition of Done for Phase 1

```text
[ ] Browser support is documented
[ ] Public API contract is documented
[ ] Accessibility contract is documented
[ ] Token architecture is documented
[ ] Theme architecture is documented
[ ] Tailwind contract is documented
[ ] Framework compatibility is documented
[ ] Packaging contract is documented
[ ] Architecture decisions are recorded
[ ] No existing application architecture is assumed
[ ] No framework-specific implementation is canonical
[ ] No production component has been implemented
```

## 22. Standards references

The architecture is evaluated against:

- Web Components / Custom Elements standards
- Shadow DOM
- CSS Custom Properties
- CSS Shadow Parts
- HTML form-associated custom elements and `ElementInternals`
- WAI-ARIA
- WAI-ARIA Authoring Practices Guide
- WCAG
- ECMAScript modules
- npm package/export conventions
- TypeScript declaration/package export conventions

Standards are the architectural authority. Lit and Tailwind documentation are implementation guidance.

## 23. Explicit non-goals

Phase 1 must not:

- copy MUI APIs
- copy Mantine APIs
- copy an existing application's architecture
- make React wrappers the primary API
- make Tailwind mandatory
- make Storybook mandatory as a runtime dependency
- implement the complete component catalog
- implement production components
- select dependencies solely because another project already uses them

The library is a new, standards-first system.
