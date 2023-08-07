<template>
    <div class="signin-container login">
        <div class="container">
            <div class="col-12">
                <a href="#" class="video-btn">
                    <span>Видео</span>
                    <i class="club-play"></i>
                </a>
    
                <div class="logo">
                    <img src="/assets/images/logo.svg" alt="Clubinno Logo">
                </div>
    
                <form method="POST" @submit.prevent="login">
                    <inputEl :type="'email'" :name="'email'" :placeholder="'Телефонен номер или Email'" :icon="'club-user'" v-model="loginInputs.email" />

                    <inputEl :type="'password'" :name="'password'" :placeholder="'Парола'" :icon="'club-password'" v-model="loginInputs.password" />

                    <a href="#" class="forgotten-password">Забравена парола?</a>
                    <input type="submit" class="default-btn" value="Вход">
                </form>
    
                <span class="signin-separator">или</span>
                <div class="auth-items">
                    <a href="#">
                        <img src="/assets/images/google.svg" alt="Google Auth">
                    </a>
                    <a href="#">
                        <img src="/assets/images/facebook.svg" alt="Facebook Auth">
                    </a>
                </div>
                <div class="bottom-links">
                    <span>Нямаш профил?</span>
                    <RouterLink :to="{ name: 'register' }">
                        Регистрация
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import inputEl from '@/components/Input.vue'
    import { ref } from "vue";
    import { useAuthStore } from '@/stores/auth';

    const loginInputs =  ref({
        email: '',
        password: ''
    })

    const store = useAuthStore()

    const login = async () => {
        await store.login(loginInputs.value)
    }
</script>

<style lang="scss" scoped>
@import '@sass/layout/_login.scss';
</style>