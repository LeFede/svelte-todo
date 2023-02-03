<script lang='ts'>
  import { todos } from "./store";

  $: document.title = `${$todos.filter(({done}) => done).length}/${$todos.length}`

  const handleRemove = (index) => todos.update(prev => prev.filter((_, i) => i !== index))
  const handleAdd = (e) => {
    if (e.key !== 'Enter') return
    const text = e.target.value
    if (!text.trim()) return
    e.target.value = ''
    todos.update(prev => [...prev, {
      text,
      done: false
    }])
  }
  const handleClear = () => todos.set([])
</script>

<style>
  main {
    width: clamp(300px, 90%, 1000px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 90%;
    gap: 1rem;
  }
  .todos {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: scroll;
  }
  .todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    height: 3rem;
    background: #944c4c;
    border-radius: 1rem;
    padding: 1rem;
  }

  .todo.done {
    background: #4c946c;

  }

  .remove-button {
    max-height: 3rem;
    height: 2rem;
    background: none;
    border: none;
    background: #3c9198;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 1px 1px black;
    cursor: pointer;
    border-radius: .4rem;
  }

  .remove-button:hover {
    background: #bb6060;
  }

  .bottom {
    width: 100%;
    display: flex;
    min-height: 3rem;
  }

  .bottom > * {
    flex: 1;
  }

  .clear {
    background: none;
    border: none;
    background-color: #3c9198;
    color: white;
    text-shadow: 1px 1px black;
  }

  .input, .input::placeholder{
    text-align: center;
  }

  button, .checkbox {
    cursor: pointer;
  }
</style>

<main>
  <div class="todos">
    {#if !$todos.length}
      Nothing to do! ✅ That's good, isn't it?
    {/if}
    {#each $todos as todo, index}
      <label class="todo {todo.done ? 'done' : ''}">
        <input class="checkbox" type="checkbox" bind:checked={todo.done}>
        <span class="text">{todo.text}</span>
        <button class="remove-button" on:click={() => handleRemove(index)}>🗑</button>
      </label> 
    {/each}

  </div>

  <div class="bottom">
    <input class="input" type="text" placeholder="Add todo" on:keydown={handleAdd}>
    <button class="clear" on:click={handleClear}>Clear</button>
  </div>
</main>