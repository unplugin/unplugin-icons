import { component$ } from '@builder.io/qwik'
import RiFlashlightLine from '~icons/ri/flashlight-line'

export default component$(() => {
  return (
    <h1>
      {' '}
      <RiFlashlightLine style="font-size: 2em; color: red" />
      {' '}
      Welcome To Qwik With Icons
      {' '}
    </h1>
  )
})
