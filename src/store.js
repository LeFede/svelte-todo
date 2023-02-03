import { writable } from "svelte/store";

export const todos = writable([
  { text: 'Do the laundry 👚', done: false },
  { text: 'Prepare the food 🥘', done: true },
  { text: 'Read 📖', done: false },
])