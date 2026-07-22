# flow-ui-kit

A set of Lightning Web Components for building richer Screen Flow UIs — action buttons with branching output, record pickers, consent checkboxes, formatted read-only fields, event cards, and a modal wrapper for embedding a flow in a page or Experience Cloud site.

## Components

### `flowActionButton`

A button for Flow screens. Sets its `Selected` output to `true` and advances the flow when clicked. Drag one per action and branch on the `Selected` output in a Decision element.

| Property/Method | Type | Direction | Description |
|---|---|---|---|
| `buttonLabel` | String | input | Label displayed on the button. |
| `buttonIcon` | String | input | SLDS icon name, e.g. `utility:edit` or `action:delete`. |
| `selected` | Boolean | output | Set to `true` when clicked. Map to a flow variable and branch on it. |

### `flowCollectionPicker`

Displays a collection of SObject records as a visual picker (radio-button style) and returns the selected record to the flow. Has a matching custom property editor (`flowCollectionPickerEditor`) for configuring it in Flow Builder.

| Property/Method | Type | Direction | Description |
|---|---|---|---|
| `records` | `T[]` | input | Collection of SObject records to display. |
| `labelFieldName` | String | input | API name of the field to use as each item's label. Defaults to `Name`. |
| `descriptionFieldName` | String | input | API name of the field to use as each item's description. Optional. |
| `iconName` | String | input | SLDS icon name to display on each item, e.g. `standard:location`. Optional. |
| `required` | Boolean | input | If `true`, the user must select a record before proceeding. |
| `selectedRecord` | `T` | output | The SObject record the user selected. |
| `validate()` | `{ isValid, errorMessage? }` | — | Called automatically by the flow runtime when `required` is set. |

### `flowConsent`

A required consent checkbox for Flow screens. Accepts rich text (including links) as its label and blocks screen advancement until ticked.

| Property/Method | Type | Direction | Description |
|---|---|---|---|
| `label` | String | input | The consent statement displayed beside the checkbox. Supports HTML markup, e.g. links. |
| `isChecked` | Boolean | input/output | Whether the checkbox is ticked. |
| `validate()` | `{ isValid, errorMessage? }` | — | Fails validation until `isChecked` is `true`. |

Dispatches a standard `FlowAttributeChangeEvent` for `isChecked` whenever the checkbox is toggled.

### `flowEventCard`

Displays event or session details (name, start, end) as a card on a Flow screen. Collapses the date/time display when start and end fall on the same day, otherwise shows both dates in full.

| Property | Type | Direction | Description |
|---|---|---|---|
| `name` | String | input | Event name. |
| `startDatetime` | String | input | ISO start datetime. |
| `endDatetime` | String | input | ISO end datetime. |
| `scheduleSummary` | String | input | Optional freeform summary line shown below the date/time. |

### `flowField`

Displays a labelled value on a Flow screen, styled as a standard Salesforce read-only form field, with type-aware formatting.

| Property | Type | Direction | Description |
|---|---|---|---|
| `label` | String | input | Field label displayed above the value. |
| `value` | String | input | The value to display. |
| `fieldType` | String | input | Controls formatting. One of `text` (default), `date`, `datetime`, `number`, `currency`, `percent`, `phone`, `email`, `url`. |

### `flowHeader`

A simple section header with an optional leading icon.

| Property | Type | Direction | Description |
|---|---|---|---|
| `heading` | String | input | Heading text. Defaults to `Section`. |
| `iconName` | String | input | Optional SLDS icon name, e.g. `standard:account`. |

### `flowModal`

A button that opens a modal dialog containing a flow (or other content) in a `flow` slot. Targets Experience Cloud pages, not Flow screens directly — use it to launch a flow from a site page. Closes itself automatically when the embedded flow's status changes to `FINISHED` or `FINISHED_SCREEN`.

| Property | Type | Description |
|---|---|---|
| `buttonLabel` | String | Label on the trigger button. Default `Open`. |
| `modalLabel` | String | Modal header title. Default `Flow`. |
| `size` | String | `small` \| `standard` \| `large`. Default `standard`. |
| `width` | String | `default` \| `full`. Default `default`. |
| `alignment` | String | `left` \| `center` \| `right`. Default `left`. |

Slot: `flow` — place the embedded flow (or other content) here.

### `flowOutputField`

Displays a label and value pair on a flow screen. Automatically formats date and datetime values (ISO format) in the user's locale and timezone; any other value is shown as-is.

| Property | Type | Direction | Description |
|---|---|---|---|
| `label` | String | input | Field label. |
| `value` | String | input | Value to display. Dates/datetimes in ISO format are auto-formatted. |

### `flowRecordRedirect`

Redirects the browser to a record's view page as soon as the component loads. Useful as the last screen in a flow that should hand off to the standard record page.

| Property | Type | Direction | Description |
|---|---|---|---|
| `objectApiName` | String | input | API name of the object, e.g. `Account`. |
| `recordId` | String | input | Id of the record to redirect to. |

### `flowSectionHeader`

A sub-section heading with optional top/bottom margin spacing, for breaking up longer flow screens.

| Property | Type | Direction | Description |
|---|---|---|---|
| `heading` | String | input | Heading text. Defaults to `Section`. |
| `marginTop` | String | input | Optional CSS length above the header, e.g. `1rem`. |
| `marginBottom` | String | input | Optional CSS length below the header, e.g. `0.5rem`. |

## Development

To work on this project in a scratch org:

1. [Set up CumulusCI](https://cumulusci.readthedocs.io/en/latest/tutorial.html)
2. Run `cci flow run dev_org --org dev` to deploy this project.
3. Run `cci org browser dev` to open the org in your browser.

## TypeScript

Components are written in TypeScript. Only compiled `.js` ever gets deployed — the LWC compiler doesn't understand `.ts` directly. Two scripts drive this:

- `npm run typecheck` — type-checks everything (components and tests), no output emitted. Use this day-to-day and in CI.
- `npm run tsc` — compiles component `.ts` sources to `.js` next to their `.ts` files, ready to deploy. Excludes `__tests__` folders (those never get compiled or deployed).

## Testing

Unit tests live in `__tests__` folders alongside each component, written in TypeScript with Jest (`sfdx-lwc-jest`).

```
npm run test:unit           # run once
npm run test:unit:watch     # watch mode
npm run test:unit:coverage  # with coverage report
```

