import { writable } from 'svelte/store';

class Model {
    private datasets: Array<Dataset> = new Array();

    public addDataset(dataset: Dataset): Model {
        this.datasets.push(dataset);
        return this;
    }

    public removeDataset(dataset: Dataset): Model {
        const index = this.datasets.indexOf(dataset, 0);
        if (index > -1) {
           this.datasets.splice(index, 1);
        }
        return this;
    }

    public clear(): Model {
        this.datasets.length = 0;
        return this;
    }
}

export interface Dataset {
    name: String;
    type: String;
    url: String;
}

export class LigatureDataset implements Dataset {
    name: String;
    type: String;
    url: String;
}

export class SparqlDataset implements Dataset {
    name: String;
    type: String;
    url: String;
}

function createModel() {
    const { subscribe, update } = writable(new Model());

    return {
        subscribe,
        addDataset: (dataset: Dataset) => update(m => m.addDataset(dataset)),
        removeDataset: (dataset: Dataset) => update(m => m.removeDataset(dataset)),
        clear: (dataset: Dataset) => update(m => m.clear())
    };
}

export const store = createModel();
