import { writable } from "svelte/store";

export const getStorage = () => JSON.parse(localStorage.getItem('todos'))

export const saveStorage = (arr) => {
  localStorage.setItem('todos', JSON.stringify(arr))
}

const initial = getStorage() || [
  { text: 'Do the laundry 👚', done: false },
  { text: 'Prepare the food 🥘', done: true },
  { text: 'Read 📖', done: false },
]

export const todos = writable(initial)
