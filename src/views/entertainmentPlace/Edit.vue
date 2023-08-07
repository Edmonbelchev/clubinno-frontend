<template>
    <header class="header-nav">
            <router-link :to="{ name: 'entertainment-place', params: { id: route.params.id } }" class="light-btn">
                <i class="club-chevron-left"></i>
            </router-link>

        <span class="header-title">Актуализирай</span>
    </header>

    <div class="signin-container">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="mb-2">Профил на заведението</h1>
                </div>

                <div class="col-12">
                    <div class="light-form create-place-form">

                        <uploadInputEl 
                        :text="'Снимка на профила'" 
                        :label="'Добави снимка'" 
                        :class="'mb-2 active'"
                        :message="'Избери изображение по-малко от 2МБ с формат PNG, JPG или WEBP!'"
                        :previewImage = "previewImage"
                        v-model="editInputs.image"
                        />

                        <inputEl 
                        :type="'text'" 
                        :name="'name'" 
                        :placeholder="'Наименование на заведението'" 
                        :label="'Име на заведението'" 
                        :class="'labeled default'"
                        v-model="editInputs.name" 
                        />

                        <inputEl 
                        :type="'text'" 
                        :name="'city'" 
                        :placeholder="'Изберете град'" 
                        :label="'Град'"
                        :class="'labeled default'"
                        v-model="editInputs.city" 
                        />

                        <inputEl 
                        :type="'text'" 
                        :name="'city'" 
                        :placeholder="'Адрес'" 
                        :label="'Адрес'" 
                        :class="'labeled default'"
                        v-model="editInputs.address" 
                        />

                        <inputEl 
                        :type="'text'" 
                        :name="'phone'" 
                        :placeholder="'Телефонен номер'" 
                        :label="'Контакт за участия'" 
                        :class="'labeled default'"
                        v-model="editInputs.address" 
                        />

                        <div class="input-wrapper labeled mb-2">
                            <label for="">Тип</label>
                            <select name="type" id="type" v-model="editInputs.type">
                                <option disabled default>Изберете тип на заведението</option>
                                <option value="1">Нощен Клуб</option>
                                <option value="2">Ресторант</option>
                                <option value="3">Кръчма</option>
                            </select>
                        </div>

                        <div class="fixed-button">
                            <button class="default-btn dark" @click.prevent="updateProfile">Обнови</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import inputEl from '../../components/Input.vue'
    import uploadInputEl from '@/components/UploadInput.vue'
    import { ref, onMounted } from "vue";
    import { useRoute } from 'vue-router'
    import router from '@/router'
    import axios from 'axios'

    /* DEFINE VARIABLES */
    const route: any = useRoute();

    const editInputs =  ref({
        name: '',
        city: '',
        address: '',
        phone: '',
        type: "1",
        image: '',
    })

    const previewImage: string | any = ref('')
    const id = route.params.id; // Access route params using router.params.id

    const fetchProfile = async () => {
        await axios.get(`${window.apiURL}api/entertainment-place/${id}/edit/`)
                    .then((response) => {
                        editInputs.value.name    = response.data.profile.name;
                        editInputs.value.city    = response.data.profile.city;
                        editInputs.value.address = response.data.profile.address;
                        editInputs.value.phone   = response.data.profile.phone;
                        editInputs.value.type    = response.data.profile.type;
                        previewImage.value       = response.data.profile.image;
                        // editInputs.value.image = response.data.profile.image;
                    })
   }

   const updateProfile = async () => {
        const data = new FormData();

        for (const key in editInputs.value) {
            if (key === 'image' && editInputs.value[key]){
                // GENERATE FILE
                const file = new File([editInputs.value[key]], "image_" + new Date().getTime() + ".jpg", { type: "image/jpeg", lastModified: new Date().getTime() });

                data.append('image', file);
            }else{

                if (editInputs.value.hasOwnProperty(key)) {
                    data.append(key, editInputs.value[key]);
                }
            }
        }

        await axios.post(`${window.apiURL}api/entertainment-place/${id}/update/`, 
            data, {
                headers: {
                    'Content-Type': `multipart/form-data;`
                }
            })
            .then((response) => {
                if(response.data.status){
                    /* REDIRECT TO PROFILE PAGE */
                    router.push({ name: 'entertainment-place', params: { id: route.params.id } });
                }
            })
    }   

   onMounted(() => {
       fetchProfile()
   })

</script>

<style lang="scss" scoped>
    .signin-container{
        padding-top: 20px;
        h1{
            font-size: 30px;
            font-weight: 800;
            color: $dark;
            line-height: 1.3;
        }
    }
</style>