import Logo from '~icons/logos/preact'
import RawLogo from '~icons/logos/preact?raw'

export function App() {
  return (
    <>
      <Logo style={{ fontSize: '3em' }} />
      <span dangerouslySetInnerHTML={{ __html: RawLogo }}></span>
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
