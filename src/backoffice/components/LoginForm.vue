<template>
  <div class="row justify-content-center">
    <div class="col-4 pt-5">
      <h3 class="h3 mb-3">BackOffice login</h3>
      <div class='mb-3'>
        <label for='LoginFormEmail' class='form-label'>Email address</label>
        <input type='email' class='form-control' id='LoginFormEmail' placeholder='name@example.com'>
      </div>
      <div class='mb-3'>
        <label for='LoginFormPassword' class='form-label'>Password</label>
        <input type='password' class='form-control' id='LoginFormPassword'>
      </div>
      <div class='mb-3'>
        <button type='submit' class='btn btn-primary' id='LoginFormButton'>
          Login
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm'
}
</script>
