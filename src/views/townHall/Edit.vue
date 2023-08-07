<template>
<header class="header-nav">
        <router-link :to="{ name: 'town-hall', params: { id: route.params.id } }" class="light-btn">
            <i class="club-chevron-left"></i>
        </router-link>

    <span class="header-title">Актуализирай</span>
</header>
<div class="container">
    <div class="row">
        <div class="col-12">
            <h1 class="mb-2">Профил на кметство/община</h1>
        </div>

        <div class="col-12">
            <div class="light-form">

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
                :placeholder="'Наименование на кметство/община'" 
                :class="'labeled default'" 
                :label="'Име на кметство/община'" 
                v-model="editInputs.name" 
                />

                <inputEl 
                :type="'text'" 
                :name="'city'" 
                :placeholder="'Изберете град'" 
                :class="'labeled default'" 
                :label="'Град'" 
                v-model="editInputs.city" 
                />

                <inputEl 
                :type="'text'" 
                :name="'address'" 
                :placeholder="'Адрес'" 
                :class="'labeled default'" 
                :label="'Адрес'" 
                v-model="editInputs.address" 
                />

                <inputEl 
                :type="'text'" 
                :name="'phone'" 
                :placeholder="'Телефонен номер'" 
                :class="'labeled default'" 
                :label="'Телефонен номер'" 
                v-model="editInputs.phone" 
                />

                <div class="fixed-button">
                    <button type="submit" class="default-btn dark" @click="storeTownHall">Запази</button>
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
        image: '',
    })

    const previewImage: string | any = ref('')
    const id = route.params.id; // Access route params using router.params.id

    const fetchProfile = async () => {
        await axios.get(`${window.apiURL}api/town-hall/${id}/edit/`)
                    .then((response) => {
                        editInputs.value.name    = response.data.profile.name;
                        editInputs.value.city    = response.data.profile.city;
                        editInputs.value.address = response.data.profile.address;
                        editInputs.value.phone   = response.data.profile.phone;
                        previewImage.value       = response.data.profile.image;
                    })
   }

    const storeTownHall = () => {
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

        axios.post(`${window.apiURL}api/town-hall/${id}/update`, 
            data, {
                headers: {
                    'Content-Type': `multipart/form-data;`
                }
            })
            .then((response) => {
                if(response.data.status){
                    /* REDIRECT TO PROFILE PAGE */
                    router.push({ name: 'town-hall', params: { id: route.params.id } });
                }
            })
    }

    onMounted(() => {
       fetchProfile()
   })
</script>

<style lang="scss" scoped>
.container{
    padding: 20px 15px;
    h1{
        font-size: 30px;
        font-weight: 800;
        color: #000;
        line-height: 1.3;
    }
}
</style>