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
}

interface Dataset {
    url: String;
}

class LigatureDataset implements Dataset {
    url: String;
}

class SparqlDataset implements Dataset {
    url: String;
}

function createModel() {
    const { subscribe, set, update } = writable(new Model());

    return {
        subscribe,
        addDataset: (dataset: Dataset) => update(m => m.addDataset(dataset)),
        removeDataset: (dataset: Dataset) => update(m => m.removeDataset(dataset)),
    };
}

export const count = createModel();
