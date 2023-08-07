import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { useAuthStore } from '@/stores/auth';

const pinia = createPinia()
const app = createApp(App)

/* DECLARE NASA API KEY */
declare global {
    interface Window { apiURL: typeof globalThis | any }
}

window.apiURL = 'https://freelance-projects.cloud/clubinnoapp/'

app.use(pinia)

const store = useAuthStore()

/* CALL THE store.loggedIn() ACTION */
store.loggedIn().then(() => {
    app.use(router)
    app.mount('#app')
});
