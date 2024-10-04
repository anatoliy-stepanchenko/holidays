import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ToastService from 'primevue/toastservice'
import ProgressSpinner from 'primevue/progressspinner'
import ConfirmationService from 'primevue/confirmationservice'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ToastService)
app.use(ConfirmationService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.component('app-button', Button)
app.component('app-input-text', InputText)
app.component('app-progress-spinner', ProgressSpinner)

app.mount('#app')
