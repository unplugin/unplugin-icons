import CustomCarA from '~icons/custom/car-a?raw'
import VueLogo from '~icons/logos/vue?raw'

// eslint-disable-next-line no-console
console.log(VueLogo)
// eslint-disable-next-line no-console
console.log(CustomCarA)

document.querySelector('#app').innerHTML = `${VueLogo}<br/>${CustomCarA}`
