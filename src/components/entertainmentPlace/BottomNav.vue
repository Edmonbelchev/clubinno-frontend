<template>
    <nav class="fixed-bottom-nav">
        <router-link :to="{name: 'profile'}">
            <i class="club-home-outlined"></i>
            Начало
        </router-link>

        <a>
            <i class="club-music-note"></i>
            Участия
        </a>

        <a>
            <i class="club-reservations"></i>
            Резервации
        </a>

        <router-link :to="{name: 'entertainment-place-profiles', params: { id: id }}">
            <i class="club-people"></i>
            Профили
        </router-link>
    </nav>
</template>

<script lang="ts">
import { watch } from 'vue';

interface Props {
    id?: number;
}

export default {
    props: {
        id: Number as () => Props['id'],
    },

    setup(props: Props) {

        // watch(() => props.modelValue, (newValue) => {
        //     inputValue.value = newValue;
        // });

        return {
            props,
        };
    },
};
</script>