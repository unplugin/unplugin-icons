import { component$, Host } from '@builder.io/qwik'
import Party from '~icons/twemoji/party-popper'

export const App = component$(() => {
  return (
    <Host>
      <p>
        <a href="https://qwik.builder.io/">
          <img
            alt="Qwik Logo"
            width={400}
            height={147}
            src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F667ab6c2283d4c4d878fb9083aacc10f"
          />
        </a>
      </p>

      <h1>
        Congratulations Qwik is working!
        <Party class="inline ml-4" />
      </h1>

      <hr/>
      <p>
        Made with ❤️ by{' '}
        <a target="_blank" href="https://www.builder.io/">
          Builder.io
        </a>
      </p>
    </Host>
  )
})
