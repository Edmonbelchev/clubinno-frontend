<template>
    <header class="header-nav">
       <a href="javascript:void(0);" @click.prevent="logOut" class="light-btn">
           <i class="club-exit"></i>
       </a>

       <span class="header-title">
           Профил
       </span>
   </header>

   <div v-if="profiles">  
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="profile-container">
                    <EntertainmentPlaces 
                    :profiles="profiles" 
                    :firstProfile="mainProfile"
                    />
                </div>
            </div>
        </div>
    </div>
 
    <div class="separator"></div>
 
    <InformationWrapper :data="mainProfile" />
   </div>

   <div v-else> Loading... </div>
   
   <BottomNav :id="routeId" />
</template>

<script setup lang="ts">
   import { onMounted, ref } from 'vue'
   import { useRoute } from 'vue-router'
   import { useAuthStore } from '@/stores/auth';
   import InformationWrapper from '@/components/profile/InformationWrapper.vue'
   import EntertainmentPlaces from '@/components/profile/EntertainmentPlaces.vue'
   import BottomNav from '@/components/entertainmentPlace/BottomNav.vue'
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
   const routeId = route.params.id; // Access route params using router.params.id

   const fetchProfile = async () => {

        await axios.get(`${window.apiURL}api/entertainment-place/${routeId}/`, { params: { user_id: userID } })
                    .then((response) => {
                        profiles.value = response.data.profiles
                        mainProfile.value = response.data.mainProfile
                    })
   }

   onMounted(() => {
       fetchProfile()
   })
</script>