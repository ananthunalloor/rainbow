# Rainbow Component Inventory

This is the implementation tracking catalogue for Rainbow. It normalizes overlapping concepts from the current MUI and Mantine documentation into one Rainbow component concept per row.

## Scope

The inventory uses the current top-level component entries from:

- Material UI's **All Components** catalogue, including the MUI X entries shown there.
- Mantine **Core components** catalogue.
- Mantine's official extension catalogues for dates, charts, schedule, code highlighting, notifications, spotlight, carousel, lightbox, dropzone, navigation progress, modals, and rich text editing.

Hooks, providers, stores, styling-only APIs, and implementation-only compound children are tracked as part of their parent component rather than as duplicate Rainbow components. MUI and Mantine names that represent the same UI concept are intentionally merged.

Source catalogues: Material UI All Components; Mantine Core; Mantine Extensions. These are living upstream catalogues, so this document should be re-audited when Rainbow begins a new implementation phase.

## Status legend

| Status | Meaning |
| --- | --- |
| `implemented` | Supported Rainbow component exists and passes its release gates. |
| `foundation` | Contract/token work required before implementation is complete. |
| `planned` | Accepted into the roadmap, not implemented. |
| `research` | Needs a Web Platform/accessibility architecture decision before planning. |
| `adapter` | Better provided as an optional integration/utility than as a core component. |

## Deduplicated inventory

| ID | Rainbow concept | MUI coverage | Mantine coverage | Status |
| --- | --- | --- | --- | --- |
| RNB-001 | App Shell | App Bar | AppShell | planned |
| RNB-002 | Aspect Ratio | — | AspectRatio | planned |
| RNB-003 | Box / generic surface | Box | Box | foundation |
| RNB-004 | Center | — | Center | planned |
| RNB-005 | Container | Container | Container | planned |
| RNB-006 | Flex | — | Flex | planned |
| RNB-007 | Grid | Grid | Grid | planned |
| RNB-008 | Group | — | Group | planned |
| RNB-009 | Simple Grid | — | SimpleGrid | planned |
| RNB-010 | Space / Spacer | — | Space | planned |
| RNB-011 | Stack | Stack | Stack | planned |
| RNB-012 | Splitter | — | Splitter | planned |
| RNB-013 | Image List | Image List | — | planned |
| RNB-014 | Card | Card | Card | planned |
| RNB-015 | Paper | Paper | Paper | planned |
| RNB-016 | Divider | Divider | Divider | planned |
| RNB-017 | Scroll Area | — | ScrollArea | planned |
| RNB-018 | Scroller | — | Scroller | planned |
| RNB-019 | Collapse | — | Collapse | planned |
| RNB-020 | Transition | Transitions | Transition | planned |
| RNB-021 | Focus Trap | — | FocusTrap | planned |
| RNB-022 | Portal | Portal | Portal | planned |
| RNB-023 | Visually Hidden | — | VisuallyHidden | planned |
| RNB-024 | Toolbar | — | Toolbar | planned |
| RNB-025 | Marquee | — | Marquee | planned |
| RNB-026 | Button | Button | Button | implemented |
| RNB-027 | Button Group | Button Group | — | planned |
| RNB-028 | Floating Action Button | Floating Action Button | — | planned |
| RNB-029 | Action / icon button | — | ActionIcon | planned |
| RNB-030 | Close Button | — | CloseButton | planned |
| RNB-031 | Copy Button | — | CopyButton | planned |
| RNB-032 | File Button | — | FileButton | planned |
| RNB-033 | Toggle Button / Toggle | Toggle Button | Toggle | planned |
| RNB-034 | Unstyled / base Button | — | UnstyledButton | planned |
| RNB-035 | Text Input | Text Field | TextInput / Input | implemented |
| RNB-036 | Textarea | Textarea Autosize | Textarea | implemented |
| RNB-037 | Number Input | Number Field | NumberInput | planned |
| RNB-038 | Password Input | — | PasswordInput | planned |
| RNB-039 | Native Select | Select | NativeSelect | planned |
| RNB-040 | Select | Select | Select | implemented |
| RNB-041 | Autocomplete | Autocomplete | Autocomplete | planned |
| RNB-042 | Combobox | — | Combobox | research |
| RNB-043 | Combobox Popover | — | ComboboxPopover | research |
| RNB-044 | Multi Select | — | MultiSelect | planned |
| RNB-045 | Tags Input | — | TagsInput | planned |
| RNB-046 | Pills Input | — | PillsInput | planned |
| RNB-047 | Tree Select | — | TreeSelect | planned |
| RNB-048 | Cascader | — | Cascader | planned |
| RNB-049 | Checkbox | Checkbox | Checkbox | implemented |
| RNB-050 | Radio | Radio Group | Radio | planned |
| RNB-051 | Switch | Switch | Switch | planned |
| RNB-052 | Slider | Slider | Slider | planned |
| RNB-053 | Range Slider | — | RangeSlider | planned |
| RNB-054 | Rating | Rating | Rating | planned |
| RNB-055 | Segmented Control | — | SegmentedControl | planned |
| RNB-056 | Chip | Chip | Chip | planned |
| RNB-057 | Color Input | — | ColorInput | planned |
| RNB-058 | Color Picker | — | ColorPicker | planned |
| RNB-059 | Color Alpha Slider | — | AlphaSlider | research |
| RNB-060 | Color Hue Slider | — | HueSlider | research |
| RNB-061 | Color Angle Slider | — | AngleSlider | research |
| RNB-062 | File Input / file picker | — | FileInput | planned |
| RNB-063 | Fieldset | — | Fieldset | planned |
| RNB-064 | Masked Input | — | MaskInput | planned |
| RNB-065 | PIN Input | — | PinInput | planned |
| RNB-066 | JSON Input | — | JsonInput | planned |
| RNB-067 | Transfer List | Transfer List | — | planned |
| RNB-068 | Avatar | Avatar | Avatar | planned |
| RNB-069 | Badge | Badge | Badge | planned |
| RNB-070 | Color Swatch | — | ColorSwatch | planned |
| RNB-071 | Background Image | — | BackgroundImage | planned |
| RNB-072 | Image | — | Image | planned |
| RNB-073 | Indicator | — | Indicator | planned |
| RNB-074 | Kbd | — | Kbd | planned |
| RNB-075 | Number Formatter | — | NumberFormatter | planned |
| RNB-076 | Overflow List | — | OverflowList | planned |
| RNB-077 | Rolling Number | — | RollingNumber | planned |
| RNB-078 | Spoiler | — | Spoiler | planned |
| RNB-079 | Theme Icon | — | ThemeIcon | planned |
| RNB-080 | Timeline | Timeline | Timeline | planned |
| RNB-081 | Accordion | Accordion | Accordion | planned |
| RNB-082 | List | List | List | planned |
| RNB-083 | Table | Table | Table | planned |
| RNB-084 | Data List | — | DataList | planned |
| RNB-085 | Tooltip | Tooltip | Tooltip | planned |
| RNB-086 | Alert | Alert | Alert | planned |
| RNB-087 | Backdrop | Backdrop | — | planned |
| RNB-088 | Dialog | Dialog | Dialog | research |
| RNB-089 | Drawer | Drawer | Drawer | research |
| RNB-090 | Modal | Modal | Modal | research |
| RNB-091 | Overlay | — | Overlay | research |
| RNB-092 | Popover | Popover | Popover | research |
| RNB-093 | Popper / positioned overlay | Popper | — | research |
| RNB-094 | Menu | Menu | Menu | research |
| RNB-095 | Menubar | Menubar | Menubar | research |
| RNB-096 | Hover Card | — | HoverCard | planned |
| RNB-097 | Affix | — | Affix | planned |
| RNB-098 | Floating Indicator | — | FloatingIndicator | planned |
| RNB-099 | Floating Window | — | FloatingWindow | research |
| RNB-100 | Loading Overlay | — | LoadingOverlay | planned |
| RNB-101 | Action Bar | — | ActionBar | planned |
| RNB-102 | Tour / product walkthrough | — | Tour | research |
| RNB-103 | Speed Dial | Speed Dial | — | planned |
| RNB-104 | Spotlight / command palette | — | Spotlight | research |
| RNB-105 | Lightbox | — | Lightbox | research |
| RNB-106 | Toast / Snackbar system | Snackbar | Notifications | research |
| RNB-107 | Notification item | — | Notification | planned |
| RNB-108 | Progress | Progress | Progress | planned |
| RNB-109 | Ring Progress | — | RingProgress | planned |
| RNB-110 | Semi-circle Progress | — | SemiCircleProgress | planned |
| RNB-111 | Loader | — | Loader | planned |
| RNB-112 | Skeleton | Skeleton | Skeleton | planned |
| RNB-113 | Empty State | — | EmptyState | planned |
| RNB-114 | Anchor / Link | Link | Anchor | planned |
| RNB-115 | Breadcrumbs | Breadcrumbs | Breadcrumbs | planned |
| RNB-116 | Burger / menu toggle | — | Burger | planned |
| RNB-117 | Navigation Link | — | NavLink | planned |
| RNB-118 | Bottom Navigation | Bottom Navigation | — | planned |
| RNB-119 | Pagination | Pagination | Pagination | planned |
| RNB-120 | Stepper | Stepper | Stepper | planned |
| RNB-121 | Tabs | Tabs | Tabs | planned |
| RNB-122 | Tree | Tree View | Tree | research |
| RNB-123 | Table of Contents | — | TableOfContents | planned |
| RNB-124 | Typography / text | Typography | Typography / Text / Title | planned |
| RNB-125 | Blockquote | — | Blockquote | planned |
| RNB-126 | Code | — | Code | planned |
| RNB-127 | Highlight | — | Highlight | planned |
| RNB-128 | Mark | — | Mark | planned |
| RNB-129 | Date Picker | Date and Time Pickers | DatePicker | planned |
| RNB-130 | Date Picker Input | Date and Time Pickers | DatePickerInput | planned |
| RNB-131 | Date Input | Date and Time Pickers | DateInput | planned |
| RNB-132 | Date Time Picker | Date and Time Pickers | DateTimePicker | planned |
| RNB-133 | Inline Date Time Picker | Date and Time Pickers | InlineDateTimePicker | planned |
| RNB-134 | Month Picker | Date and Time Pickers | MonthPicker | planned |
| RNB-135 | Month Picker Input | Date and Time Pickers | MonthPickerInput | planned |
| RNB-136 | Year Picker | Date and Time Pickers | YearPicker | planned |
| RNB-137 | Year Picker Input | Date and Time Pickers | YearPickerInput | planned |
| RNB-138 | Time Input | Date and Time Pickers | TimeInput | planned |
| RNB-139 | Time Picker | Date and Time Pickers | TimePicker | planned |
| RNB-140 | Time Grid | Date and Time Pickers | TimeGrid | planned |
| RNB-141 | Mini Calendar | Date and Time Pickers | MiniCalendar | planned |
| RNB-142 | Calendar | Date and Time Pickers | Calendar | planned |
| RNB-143 | Schedule | — | Schedule | research |
| RNB-144 | Day Schedule View | — | DayView | research |
| RNB-145 | Week Schedule View | — | WeekView | research |
| RNB-146 | Month Schedule View | — | MonthView | research |
| RNB-147 | Year Schedule View | — | YearView | research |
| RNB-148 | Mobile Month Schedule View | — | MobileMonthView | research |
| RNB-149 | Agenda View | — | AgendaView | research |
| RNB-150 | Resource Day View | — | ResourcesDayView | research |
| RNB-151 | Resource Week View | — | ResourcesWeekView | research |
| RNB-152 | Resource Month View | — | ResourcesMonthView | research |
| RNB-153 | Resource Schedule | — | ResourcesSchedule | research |
| RNB-154 | Data Grid | Data Grid | — | research |
| RNB-155 | Area Chart | Charts | AreaChart | research |
| RNB-156 | Bar Chart | Charts | BarChart | research |
| RNB-157 | Line Chart | Charts | LineChart | research |
| RNB-158 | Composite Chart | Charts | CompositeChart | research |
| RNB-159 | Candlestick Chart | Charts | CandlestickChart | research |
| RNB-160 | Pie Chart | Charts | PieChart | research |
| RNB-161 | Donut Chart | Charts | DonutChart | research |
| RNB-162 | Funnel Chart | Charts | FunnelChart | research |
| RNB-163 | Radar Chart | Charts | RadarChart | research |
| RNB-164 | Scatter Chart | Charts | ScatterChart | research |
| RNB-165 | Bubble Chart | Charts | BubbleChart | research |
| RNB-166 | Radial Bar Chart | Charts | RadialBarChart | research |
| RNB-167 | Sparkline | Charts | Sparkline | research |
| RNB-168 | Heatmap | Charts | Heatmap | research |
| RNB-169 | Bars List | Charts | BarsList | research |
| RNB-170 | Bullet Chart | Charts | BulletChart | research |
| RNB-171 | Gauge Chart | Charts | GaugeChart | research |
| RNB-172 | Waffle Chart | Charts | WaffleChart | research |
| RNB-173 | Treemap | Charts | Treemap | research |
| RNB-174 | Sunburst Chart | Charts | SunburstChart | research |
| RNB-175 | Sankey Chart | Charts | SankeyChart | research |
| RNB-176 | Matrix Chart | Charts | MatrixChart | research |
| RNB-177 | Carousel | — | Carousel | research |
| RNB-178 | Dropzone | — | Dropzone | research |
| RNB-179 | Code Highlight | — | CodeHighlight | research |
| RNB-180 | Code Highlight Tabs | — | CodeHighlightTabs | research |
| RNB-181 | Inline Code Highlight | — | InlineCodeHighlight | research |
| RNB-182 | Rich Text Editor | — | RichTextEditor | research |
| RNB-183 | Navigation Progress | — | NavigationProgress | planned |
| RNB-184 | Modals Manager | — | Modals manager | adapter |
| RNB-185 | CSS Baseline | CSS Baseline | — | adapter |
| RNB-186 | Init Color Scheme Script | InitColorSchemeScript | — | adapter |
| RNB-187 | Click-Away Listener | Click-Away Listener | — | adapter |
| RNB-188 | No SSR boundary | No SSR | — | adapter |
| RNB-189 | Auto-sizing Textarea | Textarea Autosize | — | planned |
| RNB-190 | Icon system | Icons / Material Icons | ThemeIcon / icon slot patterns | planned |

## Implementation priority

The inventory is intentionally broader than the first implementation releases. Rainbow should be delivered in dependency order rather than by copying the source-library category order.

### P0 — platform contract

1. Button
2. Text Input
3. Textarea
4. Select / Native Select
5. Checkbox / Radio / Switch
6. Form Field / Fieldset
7. Dialog / Modal primitives
8. Popover / Menu primitives
9. Tabs / Disclosure primitives
10. Theme, focus, motion, RTL, forced-colors, and form semantics

### P1 — application primitives

1. Card / Paper / Surface
2. Container / Stack / Grid / Flex
3. Alert / Toast / Notification
4. Progress / Loader / Skeleton
5. Tooltip
6. Pagination / Breadcrumbs / Stepper
7. Avatar / Badge / Chip
8. Autocomplete / Combobox / Multi Select

### P2 — advanced controls

Date/time, calendars, file/dropzone, command palette, tree controls, data grid, rich text editing, carousel/lightbox, and scheduling.

### P3 — specialized visualization

Charts and other high-dependency visualization components should be isolated packages or optional modules. They must not make the core Rainbow runtime larger or impose third-party charting dependencies on applications that do not use them.

## Source verification

- Material UI component catalogue: current `mui.com/material-ui/all-components/` / `mui.com/components/`.
- Mantine Core catalogue: current `mantine.dev/core/package/`.
- Mantine Dates catalogue: current `mantine.dev/dates/getting-started/`.
- Mantine Charts catalogue: current `mantine.dev/charts/getting-started/`.
- Mantine Schedule catalogue: current `mantine.dev/schedule/schedule/`.
- Mantine official extensions: current `mantine.dev/x/extensions/`.

The upstream pages were reviewed on 2026-10-07 for this inventory. MUI currently exposes its components by Inputs, Data display, Feedback, Surfaces, Navigation, Layout, Utils, plus MUI X and Lab entries. Mantine currently exposes a Core catalogue plus official extensions; the extension catalogue includes dates, charts, schedule, code highlight, notifications, spotlight, carousel, lightbox, dropzone, navigation progress, modals, and rich text editing.
