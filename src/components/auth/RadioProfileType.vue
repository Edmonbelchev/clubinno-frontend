<template>
     <div class="item-wrapper">
        <input type="radio" :name="name" :id="id" :value="value" @click="updateValue($event.target)">
        <label :for="id">
            <i :class="icon" v-if="icon"></i>
            <div class="text-wrapper">
                <h3 v-if="title">
                    {{ title }}
                </h3>
                <p v-if="text">
                    {{ text }}
                </p>
            </div>
            <i class="club-chevron-right"></i>
        </label>
    </div>
</template>
  
<script lang="ts">
import { ref, watch } from 'vue';

interface Props {
    id?:    string;
    value?: string;
    name?:  string,
    icon?:  string;
    title?: string;
    text?:  string;
    modelValue?: any
}

export default {
    props: {
        name:  String as () => Props['name'],
        id:    String as () => Props['id'],
        value: String as () => Props['value'],
        icon:  String as () => Props['icon'],
        title: String as () => Props['title'],
        text:  String as () => Props['text'],
        modelValue: {
            type: String,
            required: true,
        },
    },

    emits: ['update:modelValue'],

    setup(props: Props, { emit }) {
        const errorMessage = ref<string | null>(null);

        const inputValue = ref(props.modelValue);

        watch(() => props.modelValue, (newValue) => {
            inputValue.value = newValue;
        });

        // Emit the updated value back to the parent component
        const updateValue = (target: EventTarget | any) => {
            inputValue.value = target.value;
            emit('update:modelValue', target.value);
        };

        return {
            props, 
            errorMessage,
            updateValue
        };
    },
};
</script>
  
<style lang="scss" scoped>
.item-wrapper{
    margin-bottom: 20px;

    i {
        color: $main;

        &:first-of-type {
            width: 60px;
            height: 60px;
            min-width: 60px;
            min-height: 60px;
            margin-right: 30px;
            border: 1px solid $main;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28px;

            @media (max-width: 360px) {
                width: 50px;
                height: 50px;
                min-width: 50px;
                min-height: 50px;
                margin-right: 10px;
            }
        }

        &:last-of-type {
            position: absolute;
            right: 5px;
            top: 0;
            bottom: 0;
            margin: auto 0;
            font-size: 40px;
            display: flex;
            align-items: center;
        }
    }

    input {
        display: none;

        &:checked~label {
            background: #624ca1;

            i,
            .text-wrapper,
            h3,
            p {
                color: $light;
            }

            i {
                border-color: $light;
            }
        }
    }

    label {
        position: relative;
        background: $light;
        display: flex;
        border-radius: 10px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding: 15px 45px 15px 25px;
        cursor: pointer;
        transition: background .3s;

        @media (max-width: 360px) {
            padding: 15px 40px 15px 15px;
        }
    }

    .text-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        line-height: 1.3;
        color: $main;

        h3 {
            font-size: 20px;
            margin-bottom: 7px;

            @media (max-width: 360px) {
                font-size: 18px;
                margin-bottom: 3px;
            }
        }

        p {
            font-size: 12px;
        }
    }
}
</style>
  