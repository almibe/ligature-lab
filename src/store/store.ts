import { writable } from 'svelte/store';

class Model {
    public datasets: Array<Dataset> = new Array();

    public addDataset(dataset: Dataset): Model {
        this.datasets.push(dataset);
        this.datasets.sort((a,b) => a.name.localeCompare(b.name.toString()))
        return this;
    }

    public removeDataset(dataset: Dataset): Model {
        const index = this.datasets.findIndex(d => dataset.name === d.name);
        if (index > -1) {
           this.datasets.splice(index, 1);
        }
        return this;
    }

    public clear(): Model {
        this.datasets.length = 0;
        return this;
    }

    public checkDuplicate(datasetName: String): Boolean {
        return this.datasets.some((v) => v.name == datasetName)
    }
}

export class Dataset {
    name: String;
    type: "Ligature" | "SPARQL";
    url: String;
}

function createModel() {
    const model = new Model()
    const { subscribe, set, update } = writable(model);

    return {
        subscribe,
        addDataset: (dataset: Dataset) => update(m => m.addDataset(dataset)),
        removeDataset: (dataset: Dataset) => update(m => m.removeDataset(dataset)),
        clear: (dataset: Dataset) => update(m => m.clear()),
        checkDuplicate: (datasetName: String) => model.checkDuplicate(datasetName)
    };
}

export const store = createModel();
