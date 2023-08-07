<template>
    <header class="header-nav">
       <a href="javascript:void(0);" @click.prevent="logOut" class="light-btn">
           <i class="club-exit"></i>
       </a>

       <span class="header-title">
           Профил
       </span>
   </header>

   <div class="container">
       <div class="row">
           <div class="col-12">
               <div class="profile-container">
                   <div class="profiles-list">
                       <div 
                        class="profile-wrapper" 
                        v-for="(item) of profiles"
                        :key="item.id" 
                        :class="{active: item.id == route.params.id}"
                        >
                        <router-link :to="{ name: 'town-hall-edit', params: { id: item.id } }" class="edit-btn">
                            <i class="club-pen"></i>
                        </router-link>

                        <router-link :to="{ name: 'town-hall', params: { id: item.id } }" class="item">
                            <figure>
                                <img :src="item.image" :alt="item.name">
                            </figure>

                            <span class="name">
                                {{ item.name }}
                            </span>
                        </router-link>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>

   <div class="separator"></div>

   <InformationWrapper :data="mainProfile" />
   
   <nav class="fixed-bottom-nav">
       <a href="#" class="">
           <i class="club-home-outlined"></i>
           Начало
       </a>
       <a href="#" class="">
           <i class="club-music-note"></i>
           Участия
       </a>
       <a href="#">
           <i class="club-reservations"></i>
           Резервации
       </a>
       <a href="#" class="">
           <i class="club-people"></i>
           Профили
       </a>
   </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import InformationWrapper from '@/components/profile/InformationWrapper.vue'
import axios from 'axios'

/* DEFINE VARIABLES */
const route: any = useRoute();
const profiles: any = ref(null)
const mainProfile: any = ref(null)
/* GET STORE */
const store = useAuthStore()

const logOut = () => {
    store.logOut()
}

const userID = store.user.id ?? store.$state.user.id

const fetchProfile = async () => {
    const id = route.params.id; // Access route params using router.params.id

    await axios.get(`${window.apiURL}api/town-hall/${id}/`, { params: { user_id: userID } })
                .then((response) => {
                    profiles.value = response.data.profiles
                    mainProfile.value = response.data.mainProfile
                })
}

onMounted(() => {
    fetchProfile()
})
</script>