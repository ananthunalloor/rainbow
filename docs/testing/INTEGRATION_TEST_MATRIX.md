# Rainbow Integration Test Matrix

The component suite must eventually be tested in these environments:

| Environment | Required |
| --- | --- |
| Plain HTML | Yes |
| Vite | Yes |
| React | Yes |
| Vue | Yes |
| Svelte | Yes |
| Solid | Yes |
| Angular | Yes |
| Astro | Yes |
| Next.js | Yes |
| Nuxt | Yes |
| Django templates | Yes |
| Django + HTMX | Yes |
| Tailwind consumer | Yes |

Django and HTMX tests should verify:

- server-rendered custom elements upgrade correctly;
- HTMX swaps preserve component initialization;
- forms submit expected names/values;
- validation remains server authoritative;
- CSRF behavior is owned by Django/HTMX;
- HTMX selectors do not depend on private Shadow DOM markup;
- explicitly integrated Shadow DOM content is processed by HTMX;
- theme tokens survive full-page and fragment swaps.
