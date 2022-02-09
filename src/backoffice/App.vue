<template>
<img
    id="background"
    src="./assets/background.jpg"
    alt=""
    >
    <div id="content" class="container-fluid p-1">
      <div class="row">
        <div class="col-8">
          <TheTitle/>
        </div>
        <div class="col">
          <div class="row justify-content-between">
            <div v-if="!this.loggedIn && !this.logging" class= "col">
              <LoginButton @logging-in="this.logging = true"/>
            </div>
            <div v-if="this.loggedIn" class="col">
              <LogoutButton @logged-out="this.loggedIn = false"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="logging">
        <LoginForm @logged-in="this.logging = false; this.loggedIn = true"
          @aborted-login="this.logging = false"/>
      </div>
      <div v-else>
        <TheBackOffice :loggedIn="this.loggedIn"/>
      </div>
    </div>
</template>

<script>
import TheTitle from './components/TheTitle.vue'
import TheBackOffice from './components/TheBackOffice.vue'
import LoginForm from './components/LoginForm.vue'
import LoginButton from './components/LoginButton.vue'
import LogoutButton from './components/LogoutButton.vue'

export default {
  name: 'App',

  data () {
    return {
      loggedIn: false,
      logging: false,
    }
  },
  components: {
    TheTitle,
    LoginForm,
    TheBackOffice,
    LoginButton,
    LogoutButton,
  }
}
</script>

<style>
#background {
  position: absolute;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#content {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app {
  overflow: hidden;
}
</style>
