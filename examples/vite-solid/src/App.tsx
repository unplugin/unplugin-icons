import type { Component } from 'solid-js'

import Icon from '~icons/logos/solidjs-icon'
import styles from './App.module.css'
import logo from './logo.svg'

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Vite + Solid
        </p>
        <p><Icon /></p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  )
}

export default App
