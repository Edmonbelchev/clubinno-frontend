<template>
    <header class="header-nav">
        <router-link :to="{ name: 'entertainment-place', params: { id: route.params.id } }" class="light-btn">
            <i class="club-chevron-left"></i>
        </router-link>

        <span class="header-title">Профили</span>
    </header>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="profile-container">
                    <EntertainmentPlaces 
                    :profiles="profiles" 
                    :firstProfile="mainProfile"
                    />

                    <div class="separator"></div>

                    <div class="information-wrapper">
                        <span class="section-title">
                            Профили с достъп
                        </span>

                        <div class="personnel-list" v-if="personnel && personnel.lenght > 0">
                            <a href="#" class="profile-item" v-for="profile of personnel" :key="profile.id">
                                {{ profile.name }}
                                <i class="club-chevron-right"></i>
                            </a>
                        </div>

                        <div class="personnel-list" v-else>
                            Няма добавени профили
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="fixed-buttons-wrapper" v-if="isMainUser">
        <router-link :to="{name: 'entertainment-place-create-personnel'}" class="default-btn dark">
            Добави профил
        </router-link>
        <router-link :to="{name: 'entertainment-place-register'}" class="default-btn dark">
            Добави заведение
        </router-link>
    </div>
</template>

<script setup lang="ts">
   import { onMounted, ref } from 'vue'
   import { useRoute } from 'vue-router'
   import { useAuthStore } from '@/stores/auth';
   import EntertainmentPlaces from '@/components/profile/EntertainmentPlaces.vue'
   import axios from 'axios'

   /* DEFINE VARIABLES */
   const route: any = useRoute();
   const profiles: any = ref(null)
   const personnel: any = ref(null)
   const mainProfile: any = ref(null)
   const isMainUser: any = ref(false)
   /* GET STORE */
   const store = useAuthStore()

   const userID = store.user.id ?? store.$state.user.id
   const routeId = route.params.id; // Access route params using router.params.id

   const fetchProfile = async () => {

        await axios.get(`${window.apiURL}api/entertainment-place/${routeId}/`, { params: { user_id: userID } })
                    .then((response) => {
                        profiles.value = response.data.profiles
                        mainProfile.value = response.data.mainProfile
                        personnel.value = response.data.personnel
                        if(response.data.isMainUser){
                            isMainUser.value = true
                        }
                    })
   }

   onMounted(() => {
       fetchProfile()
   })
</script>

<style lang="scss">
.information-wrapper{
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
}
</style>