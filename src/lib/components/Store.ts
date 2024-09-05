import { derived, readable, readonly, writable } from "svelte/store";

const store = writable([]);

export const resultStore = readonly(store)

export function addResult(res) {
    store.update((results) => [res, ...results])
}
