# UI Component Inventory — MUI + Mantine

Rainbow tracking inventory of current UI components from **Material UI/MUI X** and **Mantine**. Snapshot: **2026-10-07**.

> **No-duplicate rule:** each exact component/export name appears only once in the table. When both libraries expose the same name, both columns are marked. Similar components with different names (for example MUI `Text Field` and Mantine `TextInput`) remain separate rows so no library component is silently omitted.

## Scope

- **MUI:** current Material UI component index plus MUI X component families listed by the current MUI docs.
- **Mantine:** current Mantine v9.7.1 core inventory plus official Dates, Charts, Schedule and X/extension components documented in the Mantine LLM index.
- Hooks are excluded except `useMediaQuery` because MUI currently lists it under its official Utilities component index. Mantine service APIs are tracked separately at the bottom of the inventory.

## Sources

- MUI Components: https://mui.com/components/
- MUI X: https://mui.com/x/introduction/
- MUI Versions: https://mui.com/material-ui/getting-started/versions/
- Mantine: https://mantine.dev/
- Mantine component index: https://mantine.dev/llms.txt

## Tracking

| Category | Component | MUI | Mantine | Decision | Notes |
| --- | --- | --- | --- | --- | --- |
| Actions | **ActionBar** | — | ☑ | ☐ | Mantine-only bulk-selection action bar. |
| Actions | **ActionIcon** | — | ☑ | ☐ | Mantine icon-button primitive; MUI can compose an icon-bearing Button, but the current Material UI index does not list an IconButton entry. |
| Actions | **CloseButton** | — | ☑ | ☐ |  |
| Actions | **FloatingIndicator** | — | ☑ | ☐ |  |
| Actions | **Toggle** | — | ☑ | ☐ | Mantine toggleable control; MUI provides Toggle Button. |
| Actions | **UnstyledButton** | — | ☑ | ☐ |  |
| Inputs | **AlphaSlider** | — | ☑ | ☐ |  |
| Inputs | **AngleSlider** | — | ☑ | ☐ |  |
| Inputs | **Autocomplete** | ☑ | ☑ | ☐ |  |
| Inputs | **Button** | ☑ | ☑ | ☐ |  |
| Inputs | **Button Group** | ☑ | — | ☐ |  |
| Inputs | **Cascader** | — | ☑ | ☐ |  |
| Inputs | **Checkbox** | ☑ | ☑ | ☐ |  |
| Inputs | **ColorInput** | — | ☑ | ☐ |  |
| Inputs | **ColorPicker** | — | ☑ | ☐ |  |
| Inputs | **Combobox** | — | ☑ | ☐ | Mantine low-level selection primitive; MUI Autocomplete/Select cover higher-level use cases. |
| Inputs | **ComboboxPopover** | — | ☑ | ☐ | Mantine-specific combobox overlay helper. |
| Inputs | **Fieldset** | — | ☑ | ☐ |  |
| Inputs | **FileButton** | — | ☑ | ☐ |  |
| Inputs | **FileInput** | — | ☑ | ☐ |  |
| Inputs | **Floating Action Button** | ☑ | — | ☐ | MUI Material UI input/action component; Mantine documents ActionIcon as its closest small icon-action primitive. |
| Inputs | **HueSlider** | — | ☑ | ☐ |  |
| Inputs | **Input** | — | ☑ | ☐ | Mantine low-level input base; MUI has no same-named entry in the current all-components index. |
| Inputs | **JsonInput** | — | ☑ | ☐ |  |
| Inputs | **MaskInput** | — | ☑ | ☐ |  |
| Inputs | **MultiSelect** | — | ☑ | ☐ |  |
| Inputs | **NativeSelect** | — | ☑ | ☐ |  |
| Inputs | **Number Field** | ☑ | — | ☐ | MUI numeric field; Mantine provides NumberInput. |
| Inputs | **NumberInput** | — | ☑ | ☐ | Mantine numeric input; MUI provides Number Field. |
| Inputs | **PasswordInput** | — | ☑ | ☐ |  |
| Inputs | **PillsInput** | — | ☑ | ☐ |  |
| Inputs | **PinInput** | — | ☑ | ☐ |  |
| Inputs | **Radio** | — | ☑ | ☐ | Mantine radio input; MUI uses Radio Group. |
| Inputs | **Radio Group** | ☑ | — | ☐ | MUI grouped radio input; Mantine uses Radio plus Radio.Group. |
| Inputs | **Rating** | ☑ | ☑ | ☐ |  |
| Inputs | **SegmentedControl** | — | ☑ | ☐ |  |
| Inputs | **Select** | ☑ | ☑ | ☐ |  |
| Inputs | **Slider** | ☑ | — | ☐ |  |
| Inputs | **Switch** | ☑ | ☑ | ☐ |  |
| Inputs | **TagsInput** | — | ☑ | ☐ | Mantine freeform tag entry; no direct Material UI Core component. |
| Inputs | **Text Field** | ☑ | — | ☐ | MUI text-input family; Mantine splits this into TextInput, Textarea, PasswordInput, etc. |
| Inputs | **Textarea** | — | ☑ | ☐ |  |
| Inputs | **TextInput** | — | ☑ | ☐ | Mantine string input; MUI Text Field is the usual equivalent. |
| Inputs | **Toggle Button** | ☑ | — | ☐ | MUI toggle button; Mantine provides Toggle. |
| Inputs | **Transfer List** | ☑ | — | ☐ |  |
| Inputs | **TreeSelect** | — | ☑ | ☐ | Mantine hierarchical selector; MUI Tree View + Select requires composition. |
| Data display | **Avatar** | ☑ | ☑ | ☐ |  |
| Data display | **Badge** | ☑ | ☑ | ☐ |  |
| Data display | **Blockquote** | — | ☑ | ☐ |  |
| Data display | **Chip** | ☑ | ☑ | ☐ |  |
| Data display | **Code** | — | ☑ | ☐ |  |
| Data display | **ColorSwatch** | — | ☑ | ☐ |  |
| Data display | **DataList** | — | ☑ | ☐ |  |
| Data display | **Divider** | ☑ | ☑ | ☐ |  |
| Data display | **Highlight** | — | ☑ | ☐ |  |
| Data display | **Icons** | ☑ | — | ☐ | MUI icon-related export group; kept because it appears in the official component index. |
| Data display | **Image** | — | ☑ | ☐ | Mantine image component; MUI Material UI does not list a dedicated Image component in its current component index. |
| Data display | **Indicator** | — | ☑ | ☐ |  |
| Data display | **Kbd** | — | ☑ | ☐ |  |
| Data display | **List** | ☑ | ☑ | ☐ |  |
| Data display | **Mark** | — | ☑ | ☐ |  |
| Data display | **Marquee** | — | ☑ | ☐ |  |
| Data display | **Material Icons** | ☑ | — | ☐ | MUI icon collection, not a layout/input component; kept because it appears in the official component index. |
| Data display | **NumberFormatter** | — | ☑ | ☐ |  |
| Data display | **Pill** | — | ☑ | ☐ |  |
| Data display | **RollingNumber** | — | ☑ | ☐ |  |
| Data display | **Table** | ☑ | ☑ | ☐ |  |
| Data display | **Text** | — | ☑ | ☐ |  |
| Data display | **ThemeIcon** | — | ☑ | ☐ |  |
| Data display | **Title** | — | ☑ | ☐ |  |
| Data display | **Tooltip** | ☑ | ☑ | ☐ |  |
| Data display | **Tree** | — | ☑ | ☐ |  |
| Data display | **Typography** | ☑ | ☑ | ☐ |  |
| Feedback | **Alert** | ☑ | ☑ | ☐ |  |
| Feedback | **Backdrop** | ☑ | — | ☐ |  |
| Feedback | **Collapse** | — | ☑ | ☐ |  |
| Feedback | **Dialog** | ☑ | ☑ | ☐ |  |
| Feedback | **EmptyState** | — | ☑ | ☐ | Mantine empty-content pattern; no direct MUI Material UI component. |
| Feedback | **Loader** | — | ☑ | ☐ |  |
| Feedback | **LoadingOverlay** | — | ☑ | ☐ | Mantine loading overlay convenience component; MUI can compose Backdrop + Progress. |
| Feedback | **Notification** | — | ☑ | ☐ | Mantine notification component; MUI provides Snackbar. |
| Feedback | **Progress** | ☑ | ☑ | ☐ |  |
| Feedback | **RangeSlider** | — | ☑ | ☐ |  |
| Feedback | **RingProgress** | — | ☑ | ☐ | Mantine circular progress visualization; MUI Progress supports circular progress but uses a different API. |
| Feedback | **SemiCircleProgress** | — | ☑ | ☐ | Mantine semicircular progress visualization. |
| Feedback | **Skeleton** | ☑ | ☑ | ☐ |  |
| Feedback | **Snackbar** | ☑ | — | ☐ | MUI transient notification surface; Mantine provides Notification plus its notifications system. |
| Surfaces | **Accordion** | ☑ | ☑ | ☐ |  |
| Surfaces | **App Bar** | ☑ | — | ☐ |  |
| Surfaces | **Card** | ☑ | ☑ | ☐ |  |
| Surfaces | **Paper** | ☑ | ☑ | ☐ |  |
| Navigation | **Anchor** | — | ☑ | ☐ |  |
| Navigation | **Bottom Navigation** | ☑ | — | ☐ |  |
| Navigation | **Breadcrumbs** | ☑ | ☑ | ☐ |  |
| Navigation | **Burger** | — | ☑ | ☐ |  |
| Navigation | **Drawer** | ☑ | ☑ | ☐ |  |
| Navigation | **Link** | ☑ | — | ☐ |  |
| Navigation | **Menu** | ☑ | ☑ | ☐ |  |
| Navigation | **Menubar** | ☑ | ☑ | ☐ |  |
| Navigation | **NavLink** | — | ☑ | ☐ |  |
| Navigation | **Pagination** | ☑ | ☑ | ☐ |  |
| Navigation | **Speed Dial** | ☑ | — | ☐ |  |
| Navigation | **Stepper** | ☑ | ☑ | ☐ |  |
| Navigation | **TableOfContents** | — | ☑ | ☐ |  |
| Navigation | **Tabs** | ☑ | ☑ | ☐ |  |
| Navigation | **Tour** | — | ☑ | ☐ |  |
| Layout | **AppShell** | — | ☑ | ☐ | Mantine application shell; MUI App Bar is a narrower header primitive. |
| Layout | **AspectRatio** | — | ☑ | ☐ |  |
| Layout | **BackgroundImage** | — | ☑ | ☐ |  |
| Layout | **Box** | ☑ | ☑ | ☐ |  |
| Layout | **Center** | — | ☑ | ☐ |  |
| Layout | **Container** | ☑ | ☑ | ☐ |  |
| Layout | **Flex** | — | ☑ | ☐ |  |
| Layout | **Grid** | ☑ | ☑ | ☐ |  |
| Layout | **Group** | — | ☑ | ☐ |  |
| Layout | **Image List** | ☑ | — | ☐ |  |
| Layout | **OverflowList** | — | ☑ | ☐ |  |
| Layout | **ScrollArea** | — | ☑ | ☐ |  |
| Layout | **Scroller** | — | ☑ | ☐ |  |
| Layout | **SimpleGrid** | — | ☑ | ☐ |  |
| Layout | **Space** | — | ☑ | ☐ |  |
| Layout | **Splitter** | — | ☑ | ☐ |  |
| Layout | **Stack** | ☑ | ☑ | ☐ |  |
| Overlays | **FloatingWindow** | — | ☑ | ☐ |  |
| Overlays | **HoverCard** | — | ☑ | ☐ |  |
| Overlays | **Overlay** | — | ☑ | ☐ |  |
| Overlays | **Spoiler** | — | ☑ | ☐ |  |
| Accessibility | **FocusTrap** | — | ☑ | ☐ |  |
| Accessibility | **VisuallyHidden** | — | ☑ | ☐ |  |
| Utilities | **Affix** | — | ☑ | ☐ | Mantine fixed-position portal helper. |
| Utilities | **Click-Away Listener** | ☑ | — | ☐ |  |
| Utilities | **CopyButton** | — | ☑ | ☐ |  |
| Utilities | **CSS Baseline** | ☑ | — | ☐ |  |
| Utilities | **InitColorSchemeScript** | ☑ | — | ☐ |  |
| Utilities | **Modal** | ☑ | ☑ | ☐ |  |
| Utilities | **No SSR** | ☑ | — | ☐ |  |
| Utilities | **Popover** | ☑ | ☑ | ☐ |  |
| Utilities | **Popper** | ☑ | — | ☐ |  |
| Utilities | **Portal** | ☑ | ☑ | ☐ |  |
| Utilities | **Textarea Autosize** | ☑ | — | ☐ |  |
| Utilities | **Toolbar** | — | ☑ | ☐ |  |
| Utilities | **Transition** | — | ☑ | ☐ | Mantine transition component; MUI exposes Transitions. |
| Utilities | **Transitions** | ☑ | — | ☐ | MUI transition utilities; Mantine exposes Transition. |
| Utilities | **useMediaQuery** | ☑ | — | ☐ | MUI hook rather than a visual component; kept under Utilities because the official index lists it there. |
| Dates | **Calendar** | — | ☑ | ☐ |  |
| Dates | **DateInput** | — | ☑ | ☐ |  |
| Dates | **DatePicker** | — | ☑ | ☐ |  |
| Dates | **DatePickerInput** | — | ☑ | ☐ |  |
| Dates | **DateTimePicker** | — | ☑ | ☐ |  |
| Dates | **InlineDateTimePicker** | — | ☑ | ☐ |  |
| Dates | **MiniCalendar** | — | ☑ | ☐ |  |
| Dates | **MonthPicker** | — | ☑ | ☐ |  |
| Dates | **MonthPickerInput** | — | ☑ | ☐ |  |
| Dates | **TimeGrid** | — | ☑ | ☐ |  |
| Dates | **TimeInput** | — | ☑ | ☐ |  |
| Dates | **TimePicker** | — | ☑ | ☐ |  |
| Dates | **TimeValue** | — | ☑ | ☐ |  |
| Dates | **YearPicker** | — | ☑ | ☐ |  |
| Dates | **YearPickerInput** | — | ☑ | ☐ |  |
| Charts | **AreaChart** | — | ☑ | ☐ |  |
| Charts | **BarChart** | — | ☑ | ☐ |  |
| Charts | **BarsList** | — | ☑ | ☐ |  |
| Charts | **BubbleChart** | — | ☑ | ☐ |  |
| Charts | **BulletChart** | — | ☑ | ☐ |  |
| Charts | **CandlestickChart** | — | ☑ | ☐ |  |
| Charts | **CompositeChart** | — | ☑ | ☐ |  |
| Charts | **DonutChart** | — | ☑ | ☐ |  |
| Charts | **FunnelChart** | — | ☑ | ☐ |  |
| Charts | **GaugeChart** | — | ☑ | ☐ |  |
| Charts | **Heatmap** | — | ☑ | ☐ |  |
| Charts | **LineChart** | — | ☑ | ☐ |  |
| Charts | **MatrixChart** | — | ☑ | ☐ |  |
| Charts | **PieChart** | — | ☑ | ☐ |  |
| Charts | **RadarChart** | — | ☑ | ☐ |  |
| Charts | **RadialBarChart** | — | ☑ | ☐ |  |
| Charts | **SankeyChart** | — | ☑ | ☐ |  |
| Charts | **ScatterChart** | — | ☑ | ☐ |  |
| Charts | **Sparkline** | — | ☑ | ☐ |  |
| Charts | **SunburstChart** | — | ☑ | ☐ |  |
| Charts | **Treemap** | — | ☑ | ☐ |  |
| Charts | **WaffleChart** | — | ☑ | ☐ |  |
| Schedule | **AgendaView** | — | ☑ | ☐ |  |
| Schedule | **DayView** | — | ☑ | ☐ |  |
| Schedule | **MobileMonthView** | — | ☑ | ☐ |  |
| Schedule | **MonthView** | — | ☑ | ☐ |  |
| Schedule | **ResourcesDayView** | — | ☑ | ☐ |  |
| Schedule | **ResourcesMonthView** | — | ☑ | ☐ |  |
| Schedule | **ResourcesSchedule** | — | ☑ | ☐ |  |
| Schedule | **ResourcesWeekView** | — | ☑ | ☐ |  |
| Schedule | **Schedule** | — | ☑ | ☐ |  |
| Schedule | **WeekView** | — | ☑ | ☐ |  |
| Schedule | **YearView** | — | ☑ | ☐ |  |
| Mantine X / extensions | **Carousel** | — | ☑ | ☐ |  |
| Mantine X / extensions | **CodeHighlight** | — | ☑ | ☐ |  |
| Mantine X / extensions | **Dropzone** | — | ☑ | ☐ |  |
| Mantine X / extensions | **Lightbox** | — | ☑ | ☐ |  |
| Mantine X / extensions | **NavigationProgress** | — | ☑ | ☐ |  |
| Mantine X / extensions | **Rich Text Editor** | — | ☑ | ☐ |  |
| Mantine X / extensions | **Spotlight** | — | ☑ | ☐ |  |
| Mantine services | **Modals manager** | — | ☑ | ☐ | Mantine service API for centralized modal management; tracked separately from visual components. |
| Mantine services | **Notifications system** | — | ☑ | ☐ | Mantine service/API for global notifications; tracked separately from the Notification component. |
| MUI Lab | **Masonry** | ☑ | — | ☐ | Both libraries expose a Masonry component, though their packages/APIs differ. |
| MUI Lab | **Timeline** | ☑ | ☑ | ☐ | Both libraries expose a Timeline component. |
| MUI X | **Charts** | ☑ | — | ☐ | MUI X chart suite; Mantine exposes many individual chart components under @mantine/charts. |
| MUI X | **Data Grid** | ☑ | — | ☐ | MUI X advanced data-grid component; Mantine has no official core equivalent in this inventory. |
| MUI X | **Date & Time Pickers** | ☑ | — | ☐ | MUI X picker suite; Mantine exposes multiple dedicated components under @mantine/dates. |
| MUI X | **Scheduler** | ☑ | — | ☐ | MUI X scheduler; Mantine provides a separate schedule package with multiple views. |
| MUI X | **Tree View** | ☑ | — | ☐ | MUI X hierarchical tree component; Mantine provides Tree. |

## Legend

- `☑` = component/export is present in that library inventory.
- `—` = no same-name component/export in that library inventory.
- `☐` = Rainbow implementation/design-system decision not yet recorded. Mark it `☑` after evaluation/selection.

**Unique component/export rows:** 208

## Maintenance rules

1. Keep one row per component/export name; do not add a second row for an existing name.
2. Update the snapshot date when the upstream inventories are refreshed.
3. Add newly released components to the correct library/category and preserve the no-duplicate rule.
4. Future inventory changes should be delivered as `git apply`-compatible patch files and validated with `git apply --check` before being shared.
