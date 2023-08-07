<template>
    <div class="input-wrapper" :class="class">

        <label v-if="label" :for="name">{{ label }}</label>

        <i v-if="icon" :class="icon"></i>

        <input :type="type" :name="name" :value="modelValue" :placeholder="placeholder" @input="updateValue($event.target)">
    </div>
</template>
  
<script lang="ts">
import { ref, watch } from 'vue';

interface Props {
    type?: string;
    name?: string;
    label?: string;
    class?: string;
    placeholder?: string;
    icon?: string;
    modelValue?: any
}

export default {
    props: {
        type: {
            type: String,
            default: 'text',
        },
        name:  String as () => Props['name'],
        label: String as () => Props['label'],
        class: String as () => Props['class'],
        placeholder: String as () => Props['placeholder'],
        icon:  String as () => Props['icon'],
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
/* Your component-specific styles go here */
.input-wrapper.default{
    margin-bottom: 20px;
    input{
        border: 1px solid $main;
    }
}
</style>
  