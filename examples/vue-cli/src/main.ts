import Vue from 'vue'
import VueCompostionAPI from '@vue/composition-api'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueCompostionAPI)

const app = new Vue({ render: h => h(App as any) })

app.$mount('#app')
