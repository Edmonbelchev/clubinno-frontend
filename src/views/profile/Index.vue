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
                    <EntertainmentPlaces 
                    :profiles="profiles" 
                    :firstProfile="firstProfile" 
                    v-if="userType == '1' && profiles" 
                    />

                    <TownHalls 
                    :profiles="profiles" 
                    :firstProfile="firstProfile" 
                    v-if="userType == '4' && profiles" 
                    />
                </div>
            </div>
        </div>
    </div>

    <div class="separator"></div>

    <InformationWrapper :data="firstProfile" />

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
    /* COMPONENTS */
    import InformationWrapper from '@/components/profile/InformationWrapper.vue'
    import EntertainmentPlaces from '@/components/profile/EntertainmentPlaces.vue'
    import TownHalls from '@/components/profile/TownHalls.vue'
    /* --- */
    import { onMounted, ref } from 'vue'
    import { useAuthStore } from '@/stores/auth';
    import axios from 'axios'

    /* VARIABLES */
    const profiles: any = ref(null)
    const firstProfile: any = ref(null)
    const profileRoute: any = ref('')

    const store = useAuthStore()
    const userID = store.user.id ?? store.$state.user.data.id
    const userType = store.user.type

    /* FUNCTIONS */
    const logOut = () => {
        store.logOut()
    }

    const fetchProfiles = async () => {
        switch(userType){
            case "1":
                profileRoute.value = 'entertainment-place'
                break;
            case "2":
                profileRoute.value = 'entertainment-place'
                break;
            case "3":
                profileRoute.value = 'entertainment-place'
                break;
            case "4":
                profileRoute.value = 'town-hall'
                break;
        }

        await axios.get(`${window.apiURL}api/${profileRoute.value}/${userID}/profiles`)
                    .then((response) => {
                        switch(userType){
                            case "1":
                                profiles.value = response.data.profiles.entertainment_places
                                firstProfile.value = response.data.profiles.entertainment_places[0]
                                break;
                            case "2":
                                profiles.value = response.data.profiles.performers
                                firstProfile.value = response.data.profiles.performers[0]
                                break;
                            case "3":
                                profiles.value = response.data.profiles.companies
                                firstProfile.value = response.data.profiles.companies[0]
                                break;
                            case "4":
                                profiles.value = response.data.profiles.town_halls
                                firstProfile.value = response.data.profiles.town_halls[0]
                                break;
                        }
                    })
    }

    /* LIFE CYCLES */
    onMounted(() => {
        fetchProfiles()
    })
</script>