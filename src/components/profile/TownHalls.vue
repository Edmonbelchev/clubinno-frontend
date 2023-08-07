<template>
    
    <div class="profiles-list">
        <div 
            class="profile-wrapper" 
            v-for="(item) of profiles" 
            :key="item.id" 
            :class="{active: item.id == firstProfile.id}"
        >

            <router-link :to="{ name: 'town-hall-edit', params: { id: item.id } }"  class="edit-btn">
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
                    
</template>

<script lang="ts">
export default {
    props: {
        profiles: {
            type: Object,
            required: true,
        },
        firstProfile: {
            type: Object,
            required: true,
        }
    },

    setup(props) {
        return {
            props,
        };
    },
};
</script>