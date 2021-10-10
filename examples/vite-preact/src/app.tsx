import '~icons/logos/preact.css'
import Logo from '~icons/logos/preact'

export function App() {
  return (
    <>
      <Logo style={{ fontSize: '3em' }} />
      <span className="logos-preact" />
      <p>Hello Vite + Preact!</p>
      <p>
        <a
          className="link"
          href="https://preactjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Preact
        </a>
      </p>
    </>
  )
}
