<script lang='ts'>
  import { todos,saveStorage,getStorage } from "./store";

  let input
  
  $: document.title = `${$todos.filter(({done}) => done).length}/${$todos.length}`


  const handleRemove = (index) => {
    todos.update(prev => prev.filter((_, i) => i !== index))
    saveStorage($todos)
  }
  const handleAdd = (e) => {
    if (e.key !== 'Enter') return
    const text = e.target.value
    if (!text.trim()) return
    e.target.value = ''
    todos.update(prev => [...prev, {
      text,
      done: false
    }])

    saveStorage($todos)
  }
  const handleClear = () => {
    todos.set([])
    saveStorage($todos)
  }

  const handleChange = () => {
    saveStorage($todos)
  }

  const handleSend = () => {
    // if (input.key !== 'Enter') return
    const text = input.value
    if (!text.trim()) return
    input.value = ''
    todos.update(prev => [...prev, {
      text,
      done: false
    }])

    saveStorage($todos)
  }
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
    margin-bottom: auto;
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

  .clear, .send {
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

  picture {
    width: 10px;
    aspect-ratio: 1/1;
    position: relative;
  }

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1 picture {
    width: 3rem;
  }

  img {width: 100%;}

  footer {
    position: absolute;
    width: 5rem;
    bottom:0;
    right: 0;
    transition: all .4s ease;
  }

  footer:hover {
    filter: drop-shadow(0 0 5px white)
  }

  .send {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    footer {
      position: relative;
    }

    .send {
      display: block;
    }

    .clear {
      display: none;
    }
  }
</style>

<main>
  <h1><picture><img src="./svelte.svg" alt="svelte logo"/></picture>Svelte TODO App</h1>
  <div class="todos">
    {#if !$todos.length}
      Nothing to do! ✅ That's good, isn't it?
    {/if}
    {#each $todos as todo, index}
      <label class="todo {todo.done ? 'done' : ''}">
        <input class="checkbox" type="checkbox" bind:checked={todo.done} on:change={handleChange}>
        <span class="text">{todo.text}</span>
        <button class="remove-button" on:click={() => handleRemove(index)}>🗑</button>
      </label> 
    {/each}

  </div>

  <div class="bottom">
    <input class="input" bind:this={input} type="text" placeholder="Add todo" on:keydown={handleAdd}>
    <button class="clear" on:click={handleClear}>Clear</button>
    <button class="send" on:click={handleSend}>Add</button>
  </div>

</main>
<footer>
  <a href="https://github.com/LeFede/svelte-todo" target="_blank" rel="noreferrer">
    <picture>
      <img src="./github.svg" alt="github">
    </picture>
  </a>
</footer>