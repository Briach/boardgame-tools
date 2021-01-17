
<template>

    <div class="modal" id="modal-cookie-consent" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <a href="#" class="close" role="button" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </a>
                <h5 class="modal-title">Cookies</h5>
                <p>
                    This Site uses only functional cookies to ensure the best experience for you. <b>No</b> personal data 
                        is collected or stored.
                </p>
                <div class="text-right mt-20"> <!-- text-right = text-align: right, mt-20 = margin-top: 2rem (20px) -->
                    <button class="btn btn-primary mr-5" type="button" v-on:click="onCookiesAccepted()">Accept</button>
                    <button class="btn btn-secondary" type="button" v-on:click="onCookiesDeclined()">Decline</button>
                </div>
            </div>
        </div>
    </div>
        
</template>

<script>
import halfmoon from 'halfmoon';

export default {
    name: "CookieConsent",
    methods: {
        onCookiesAccepted: function() {
            halfmoon.toggleModal("modal-cookie-consent");
            this.$store.commit('change', true);
            console.log(this.$store.state.cookieConsent)
        },
        onCookiesDeclined: function() {
            halfmoon.toggleModal("modal-cookie-consent");
            this.$store.commit('change', false);
            console.log(this.$store.state.cookieConsent)
        },
        onCloseModal: function() {
            halfmoon.toggleModal("modal-cookie-consent");
        },
    }
}
</script>

<style scoped>

.modal {
    position: fixed;
}

.modal-full .container {
    height: 100%;
    display: flex;
}

.modal-full {
    position: fixed;
}

.modal-full .modal-content {
    height: 100%;
}

</style>