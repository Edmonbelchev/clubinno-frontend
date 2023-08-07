<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="mb-2">Профил на заведението</h1>
            </div>

            <div class="col-12">
                <div class="light-form">

                    <inputEl 
                    :type="'text'" 
                    :name="'name'" 
                    :placeholder="'Наименование на заведението'" 
                    :class="'labeled default'" 
                    :label="'Име на заведението'" 
                    v-model="registerInputs.name" 
                    />

                    <inputEl 
                    :type="'text'" 
                    :name="'city'" 
                    :placeholder="'Изберете град'" 
                    :class="'labeled default'" 
                    :label="'Град'" 
                    v-model="registerInputs.city" 
                    />

                    <inputEl 
                    :type="'text'" 
                    :name="'address'" 
                    :placeholder="'Адрес'" 
                    :class="'labeled default'" 
                    :label="'Адрес'" 
                    v-model="registerInputs.address" 
                    />

                    <inputEl 
                    :type="'text'" 
                    :name="'phone'" 
                    :placeholder="'Телефонен номер'" 
                    :class="'labeled default'" 
                    :label="'Телефонен номер'" 
                    v-model="registerInputs.phone" 
                    />

                    <div class="input-wrapper labeled mb-2">
                        <label for="">Тип</label>
                        <select name="type" id="type" v-model="registerInputs.type">
                            <option disabled default>Изберете тип на заведението</option>
                            <option value="1">Нощен Клуб</option>
                            <option value="2">Ресторант</option>
                            <option value="3">Кръчма</option>
                        </select>
                    </div>

                    <uploadInputEl 
                    :text="'Снимка на профила'" 
                    :label="'Добави снимка'" 
                    :class="'mb-2'"
                    :message="'Избери изображение по-малко от 2МБ с формат PNG, JPG или WEBP!'"
                    v-model="registerInputs.image"
                    />

                    <div class="fixed-button">
                        <button type="submit" class="default-btn dark" @click="storePlace">Запази</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import inputEl from '@/components/Input.vue'
    import uploadInputEl from '@/components/UploadInput.vue'
    import { ref } from "vue";
    import { useAuthStore } from '@/stores/auth';
    import axios from 'axios';

    const store = useAuthStore()

    const registerInputs =  ref({
        name: '',
        city: '',
        address: '',
        phone: '',
        type: 1,
        image: '',
        user_id: store.user.data.id ?? ''
    })

    
    const storePlace = () => {
        const formData = new FormData();

        for (const key in registerInputs.value) {
            if (key === 'image' && registerInputs.value[key]){
                // GENERATE FILE
                const file = new File([registerInputs.value[key]], "image_" + new Date().getTime() + ".jpg", { type: "image/jpeg", lastModified: new Date().getTime() });

                formData.append('image', file);
            }else{
                if (registerInputs.value.hasOwnProperty(key)) {
                    formData.append(key, registerInputs.value[key]);
                }
            }
        }

        axios.post(`${window.apiURL}api/entertainment-place/store`, 
            formData, {
                headers: {
                    'Content-Type': `multipart/*;`
                }
            })
            .then((response) => {
                console.log(response)
            })
    }

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