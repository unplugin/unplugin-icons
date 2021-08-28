import Logo from '~icons/logos/preact'

export function App() {
  return (
    <>
      <Logo style={{ fontSize: '3em' }} />
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
