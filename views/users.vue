<template>
    <div id="vue-instance">
        User name: <input type="text" v-model="username">
        Email: <input type="text" v-model="email">
        <button @click="addUser()">Add user</button>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {}
        },
        methods: {
            addUser: function () {
                alert('User ' + this.username + ' added with email ' + this.email);
                user = {
                    username: this.username,
                    email: this.email
                }

                // TODO POST user here
            }
        }
    }
</script>

<style lang="css">
</style>