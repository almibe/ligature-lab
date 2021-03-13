import { writable } from 'svelte/store';

class Model {
    public datasets: Array<Dataset> = new Array();

    public addDataset(dataset: Dataset): Model {
        this.datasets.push(dataset);
        return this;
    }

    public removeDataset(dataset: Dataset): Model {
        console.log("Datasets ", this.datasets);
        console.log("Removing ", dataset);
        const index = this.datasets.findIndex(d => dataset.name === d.name);
        console.log("Index " + index);
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

export class Dataset {
    name: String;
    type: "Ligature" | "SPARQL";
    url: String;
}

function createModel() {
    const { subscribe, set, update } = writable(new Model());

    return {
        subscribe,
        addDataset: (dataset: Dataset) => update(m => m.addDataset(dataset)),
        removeDataset: (dataset: Dataset) => update(m => m.removeDataset(dataset)),
        clear: (dataset: Dataset) => update(m => m.clear())
    };
}

export const store = createModel();
