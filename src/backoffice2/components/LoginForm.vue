<template>
  <div class="row justify-content-center">
    <div class="col-md-4 pt-5">
      <h3 class="h3 mb-3">BackOffice login</h3>
      <div class='mb-3'>
        <label for='LoginFormEmail' class='form-label'>Email address</label>
        <input v-model="email"
               type='email'
               class='form-control'
               id='LoginFormEmail'
               placeholder='name@example.com'>
      </div>
      <div class='mb-3'>
        <label for='LoginFormPassword' class='form-label'>Password</label>
        <input v-model="password"
               type='password'
               class='form-control'
               id='LoginFormPassword'>
      </div>
      <div class='mb-3'>
        <div class="row">
          <div class="col">
            <button v-on:click="checkLoginInfo"
                    type='submit'
                    class='btn btn-primary'
                    id='LoginFormButton'>
              Login
            </button>
          </div>
          <div class="col">
            <button v-on:click="this.$emit('aborted-login')"
                    type='submit'
                    class='btn btn-secondary'
                    id='LoginFormButton'>
              Back
            </button>
          </div>
        </div>
      </div>
      <p v-if="wrong_credentials">Incorrect email or password. Please retry.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',

  data () {
    return {
      email: '',
      password: '',
      wrong_credentials: false,
    }
  },

  methods: {

    checkLoginInfo () {
      console.log(this.email);
      console.log(this.password);
      this.wrong_credentials = this.email != this.password;
      if (!this.wrong_credentials) {
        //console.log('access granted');
        this.$emit('logged-in');
      }
      //else console.log('access denied');
    }

  }
}
</script>
