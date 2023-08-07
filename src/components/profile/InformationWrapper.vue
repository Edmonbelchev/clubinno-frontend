<template>
    <div class="information-wrapper" v-if="data">
        <span class="section-title">
            Информация
        </span>
        <ul class="user-information">
            <li>
                <i class="club-city"></i>
                <div class="text">
                    <span class="heading"> Град </span>
                    <div class="value" v-if="data.city">
                        {{ data.city }}
                    </div>
                </div>
            </li>

            <li>
                <i class="club-address"></i>
                <div class="text">
                    <span class="heading"> Адрес </span>
                    <div class="value" v-if="data.address">
                        {{ data.address }}
                    </div>
                </div>
            </li>

            <li v-if="data.phone">
                <i class="club-phone-outlined"></i>
                <div class="text">
                    <span class="heading"> Контакт за участия </span>
                    <div class="value" v-if="data.phone">
                        <a href="tel:{{ data.phone }}">
                            {{ data.phone }}
                        </a>
                    </div>
                </div>
            </li>

            <li>
                <i class="club-star"></i>
                <div class="text">
                    <span class="heading"> Тип заведение </span>
                    <div class="value" v-if="data.type">
                        {{ data.type }}
                    </div>
                </div>
            </li>

            <li>
                <i class="club-music-note-outlined"></i>
                <div class="text">
                    <span class="heading"> Музика </span>
                    <div class="value">
                        Поп-фолк, комерсиална музика
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        data: {
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

<style lang="scss" scoped>
.information-wrapper {
    padding: 20px 10px;
    display: flex;
    flex-direction: column;

    li {
        display: flex;

        &:not(:last-of-type) {
            margin-bottom: 26px;
        }

        img {
            margin-right: 10px;
            max-width: 24px;
            width: 100%;
        }

        i {
            margin-right: 20px;
            font-size: 28px;
            width: 30px;
        }

        .text {
            color: $main;
            font-size: 14px;
            display: flex;
            flex-direction: column;

            .heading {
                margin-bottom: 5px;
                font-weight: 500;
            }

            .value {
                a {
                    text-decoration: underline;
                }
            }
        }
    }

    .profiles-list {
        display: flex;
        flex-direction: column;

        .profile-item {
            padding: 16px 35px 16px 20px;
            background: #EFEFEF;
            color: $main;
            font-size: 14px;
            font-weight: 500;
            position: relative;

            &:not(:last-of-type) {
                border-bottom: 1px solid #afafaf91;
            }

            &:first-of-type {
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
            }

            &:last-of-type {
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }

            i {
                position: absolute;
                top: 0;
                right: 15px;
                bottom: 0;
                color: #B8B8B8;
                font-size: 20px;
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>