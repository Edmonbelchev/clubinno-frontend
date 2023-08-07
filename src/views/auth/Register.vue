<template>
    <div class="signing-choose-type">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="mb-1">
                        Аз съм...
                    </h1>
                    <span class="sub-title mb-3">
                        Изберете една от опциите, за да настроим Вашия профил
                    </span>
                </div>

                <div class="col-12">
                    <div class="selection-list">
                        <RadioProfileType
                            id="profile-type-1"
                            value="1"
                            name="type"
                            icon="club-club"
                            v-model="registerInputs.type"
                            title="Заведение"
                            text="Собственик, управител, PR или част от персонала"
                        />

                        <RadioProfileType
                            id="profile-type-2"
                            value="2"
                            name="type"
                            icon="club-microphone"
                            v-model="registerInputs.type"
                            title="Музикант/DJ"
                            text="Самостоятелен зпълнител без мениджър или компания"
                        />

                        <RadioProfileType
                            id="profile-type-3"
                            value="3"
                            name="type"
                            icon="club-microphone"
                            v-model="registerInputs.type"
                            title="Муз.компания"
                            text="Мениджър или компания, които отговарят за участията на изпълнителите"
                        />

                        <RadioProfileType
                            id="profile-type-4"
                            value="4"
                            name="type"
                            icon="club-home"
                            v-model="registerInputs.type"
                            title="Кметство/Община"
                            text="Кмет или служители, които отговарят за провеждане на културните мероприятия"
                        />
                    </div>

                    <div class="bottom-wrapper">
                        <span class="have-register mb-5">
                            Имаш регистрация? 
                            <router-link :to="{name: 'login'}">
                                Вход
                            </router-link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="signin-container">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="mb-3">Регистрация на профил за достъп</h1>
                </div>

                <div class="col-12">

                    <inputEl :type="'text'" :name="'name'" :placeholder="'Име'" :icon="'club-user'" v-model="registerInputs.name" class="default" />

                    <inputEl :type="'email'" :name="'email'" :placeholder="'Email'" :icon="'club-mail'" v-model="registerInputs.email" class="default" />

                    <inputEl :type="'password'" :name="'password'" :placeholder="'Парола'" :icon="'club-password'" v-model="registerInputs.password" class="default" />

                    <inputEl :type="'phone'" :name="'phone'" :placeholder="'Телефон'" :icon="'club-phone'" v-model="registerInputs.phone" class="default" />

                    <div class="input-checkbox-wrapper mb-3">
                        <input type="checkbox" name="terms" id="terms">
                        <label for="terms" class="checkbox-label">
                            Съгласявам се да получавам известия и съобщения от платформата
                        </label>
                    </div>

                    <button type="submit" class="default-btn dark mb-3" @click="register">Регистрация</button>

                    <div class="bottom-wrapper">
                        <span class="have-register mb-3">
                            Имаш регистрация?  
                            <router-link :to="{name: 'login'}">
                                Вход
                            </router-link>
                        </span>

                        <span class="terms-text">
                            С регистрацията си декларирате, че сте прочели и се съгласявате с нашите 
                            <a href="#">Общи условия</a> и <a href="#">Политика за поверителност</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from "vue";
    import inputEl from '@/components/Input.vue'
    import RadioProfileType from '@/components/auth/RadioProfileType.vue'
    import { useAuthStore } from '@/stores/auth';

    const registerInputs =  ref({
        type: '',
        name: '',
        email: '',
        password: '',
        phone: ''
    })

    const store = useAuthStore()

    const register = async () => {
        await store.register(registerInputs.value)
    }

    watch(() => registerInputs.value.type, (newValue) => {
        if(newValue){
            const signInContainer: HTMLElement | any = document.querySelector('.signin-container')
            signInContainer.classList.add('active')
        }
    });
</script>

<style lang="scss" scoped>
@import '@sass/layout/_register.scss';
</style>