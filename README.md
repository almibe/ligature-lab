# ligature-components

ligature-components is a set of Svelte components that support working with ligature.

## Usage

The main component of this project is `LigatureUI`.
It provides a full UI for working with Ligature and communicates with your surrounding code via a series of events.

## Events

### AddDataset

Arguments:
 * datasetName: string

Adds a Dataset and does nothing if the Dataset already exists

### RemoveDataset

Arguments:
 * datasetName: string

Removes a Dataset and does nothing if the Dataset doesn't exist

### AllDatasets

Arguments:

Requests a list of all current Datasets.

### *More to come*

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Publishing

To publish the Svelte components in this project run the following.

`npx svelte-kit package`

Then follow the instructions from that command.
