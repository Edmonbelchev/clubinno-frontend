import router from '@/router'
import { defineStore } from 'pinia'
import axios from 'axios'

interface AuthState {
    user: any | null;
    isLogged: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({ 
        user: null,
        isLogged: false
    }),
    actions: {
        async login(value: any){
            await axios.post(`${window.apiURL}api/auth/login`, value)
            .then((response: any) => {
                /* SET STATE VALUES */
                this.user = response.data.user
                this.isLogged = true
                /* STORE TOKEN IN LOCAL STORAGE */
                localStorage.setItem('authToken', response.data.token)

                /* REDIRECT TO PROFILE */
                router.push('/profile')
            })
            .catch((error) => {
                console.log(error)
            });
        },

        async register(value: any){
            await axios.post(`${window.apiURL}api/auth/register`, value)
            .then((response: any) => {
                /* SET STATE VALUES */
                this.user = response.data.user
                this.isLogged = true

                /* STORE TOKEN IN LOCAL STORAGE */
                localStorage.setItem('authToken', response.data.token)

                if (response.data.user.type == 1){
                    router.push('/entertainment-place/register')
                }
                else if (response.data.user.type == 2){
                    router.push('/performer/register')
                }
                else if (response.data.user.type == 3){
                    router.push('/music-company/register')
                }
                else if (response.data.user.type == 4){
                    router.push('/town-hall/register')
                }
            })
            .catch((error) => {
                console.log(error)
            });
        },

        async loggedIn(){
            /* RETRIEVE LOCAL STORAGE TOKEN */
            const token = localStorage.getItem('authToken');

            await axios.get(`${window.apiURL}api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response: any) => {
                /* IF LOGGED IN -> ATTACH STATE */
                this.user = response.data
                this.isLogged = true
            })
            .catch((err) => {
                console.log(err)
                router.push('/login')
            })
        },

        async logOut(){
            localStorage.removeItem('authToken')
            /* RESET STATE */
            this.user = null
            this.isLogged = false

            /* REDIRECT TO LOGIN PAGE */
            router.push('/login')
        }
    },
})