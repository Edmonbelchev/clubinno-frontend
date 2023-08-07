<template>
    <header class="header-nav">
        <router-link :to="{ name: 'entertainment-place', params: { id: route.params.id } }" class="light-btn">
            <i class="club-chevron-left"></i>
        </router-link>

        <span class="header-title">Профили</span>
    </header>

    <div class="signin-container">

        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="mb-4">Профил на заведението</h1>
                </div>

                <div class="col-12">
                    <div class="light-form">

                        <inputEl 
                        :type="'text'" 
                        :name="'name'" 
                        :class="'default'"
                        :placeholder="'Име'" 
                        :icon="'club-user'" 
                        v-model="registerInputs.name" 
                        />

                        <inputEl 
                        :type="'email'" 
                        :name="'email'" 
                        :class="'default'"
                        :placeholder="'Email'" 
                        :icon="'club-user'" 
                        v-model="registerInputs.email" 
                        />

                        <inputEl 
                        :type="'password'" 
                        :name="'password'" 
                        :class="'default'"
                        :placeholder="'Парола'" 
                        :icon="'club-password'" 
                        v-model="registerInputs.password" 
                        />

                        <inputEl 
                        :type="'text'" 
                        :name="'phone'" 
                        :class="'default'"
                        :placeholder="'Телефон'" 
                        :icon="'club-phone'" 
                        v-model="registerInputs.phone" 
                        />

                        <div class="radio-group active mb-2">
                            <a href="javascript:void(0);" class="heading">
                                <i class="club-user-permissions"></i>
                                Права за достъп
                                <i class="club-chevron-right toggle-icon"></i>
                            </a>

                            <div class="input-radio-wrapper mb-1">
                                <input type="radio" name="permission" value="1" id="permission_1" checked="true">
                                <label class="radio-label" for="permission_1">
                                    Право да добавя, трие и редактира участия
                                </label>
                            </div>

                            <div class="input-radio-wrapper">
                                <input type="radio" name="permission" value="0" id="permission_2">
                                <label class="radio-label" for="permission_2">
                                    Без права/само вижда участията
                                </label>
                            </div>
                        </div>

                        <button class="default-btn dark mb-3">Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import inputEl from '@/components/Input.vue'
import { useRoute } from 'vue-router'

const route: any = useRoute();

const registerInputs = ref({
    name: '',
    email: '',
    password: '',
    phone: '',
})
</script>