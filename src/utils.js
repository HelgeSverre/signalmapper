import { writable } from "svelte/store";

/**
 * A writable store that persists to local storage.
 *
 * @param key {string} The key to use in local storage.
 * @param initialValue {*} The initial value of the store.
 * @returns {Writable<*>} The writable store.
 */
export function persistentStore(key, initialValue = null) {
  const storedValue = localStorage.getItem(key);

  let parsedValue = initialValue;
  try {
    parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;
  } catch (e) {
    parsedValue = initialValue;
  }

  const store = writable(parsedValue);

  store.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
}
