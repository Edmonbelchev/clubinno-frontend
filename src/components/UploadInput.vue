<template>
    <div class="upload-wrapper" :class="class" :data-message="message">
        <span class="text" v-if="text">
           {{ text }}
        </span>
        <label for="file">
            <input type="file" name="image" id="file" :value="modelValue" @input="updateValue($event.target)">
            <i class="club-add"></i>
            <span v-if="label">
                {{ label }}
            </span>
            <img :src="previewImage ?? imageUrl" ref="previewImage">
        </label>
    </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';

interface Props {
    label?: string;
    class?: string;
    message?: string,
    text?: string;
    previewImage?: string;
    modelValue?: any
}

export default {
    props: {
        label:   String as () => Props['label'],
        text:    String as () => Props['text'],
        message: String as () => Props['message'],
        class:   String as () => Props['class'],
        previewImage: String as () => Props['previewImage'],
        modelValue: {
            type: String,
            required: true,
        },
    },

    emits: ['update:modelValue'],

    setup(props: Props, { emit }) {
        let imageUrl: string | undefined = '';
        const previewImage: any = ref(null);
        
        watch(() => props.previewImage, (newValue) => {
            previewImage.value.src = newValue;
            console.log(previewImage.value.src)
        });

        // Emit the updated value back to the parent component
        const updateValue = (target: EventTarget | any) => {
            const file = target.files[0];
            const parent = target.parentElement.parentElement;

            // Revoke previous object URL
            if (previewImage.value.src) {
                previewImage.value.src = ''
                URL.revokeObjectURL(previewImage.value.src);
            }

            if (file) {
                const fileSize = file.size / 1024 / 1024; // Convert file size to MB
                const fileExtension = file.name.split('.').pop().toLowerCase();

                // Check if file size is less than 2MB and file format is png, jpg, or webp
                if (fileSize <= 2 && ['png', 'jpg', 'webp'].includes(fileExtension)) {
                    parent.classList.add('active');

                    const reader = new FileReader();

                    reader.addEventListener('load', function() {
                        const result: any = reader.result;
                        /* CREATE BLOB ELEMENT */
                        const blob: Blob = new Blob([result], { type: file.type });

                        emit('update:modelValue', blob);

                        imageUrl = URL.createObjectURL(blob);
                        previewImage.value.src = imageUrl;

                        console.log(imageUrl);
                    });

                    reader.readAsArrayBuffer(file);
                } else {
                    // Invalid file: remove the 'active' class and clear the input value
                    parent.classList.remove('active');
                    previewImage.value.src = ''
                    imageUrl = '';
                }
            } else {
                imageUrl = '';
                parent.classList.remove('active');
                parent.querySelector('.invalid-feedback').remove();
            }
        }

        return {
            props, 
            updateValue,
            imageUrl,
            previewImage
        };
    },
};
</script>

<style lang="scss" scoped>
.upload-wrapper {
    display: flex;
    flex-direction: column;

    &.active {

        i,
        span {
            display: none;
        }

        img {
            display: block;
        }
    }

    .text {
        font-weight: 500;
        margin-bottom: 7px;
        display: block;
        order: 2;
    }

    label {
        height: 200px;
        border: 1px solid #e3e3e3;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-weight: 600;
        cursor: pointer;
        order: 3;

        i {
            font-size: 50px;
            margin-bottom: 16px;
        }
    }

    input {
        display: none;
    }

    .invalid-feedback {
        margin-top: 0;
        order: 1;
    }

    .sub-message {
        font-size: 14px;
        text-align: center;
        font-weight: 400;
        margin-top: 10px;
    }

    img {
        width: 160px;
        height: 160px;
        object-fit: cover;
        display: none;
        border-radius: 10px;
    }
}
</style>