<script>
  export let op = 'login'
  export let message = 'Hi';
</script>

<div class='mymodal'>

<div class="modal-dialog modal-notify modal-warning" role="document">
  <div class="modal-content">
    <div class="modal-header text-center">
      <h4 class="modal-title white-text w-100 font-weight-bold py-2">{op}</h4>
    </div>


    <div class="modal-body">
      <div class="md-form mb-5">
        <i class="bi bi-envelope prefix grey-text"></i>
        <label data-error="wrong" data-success="right" for="form3">Email</label>
        <input type="text" id="form3" class="form-control validate">
      </div>

      <div class="md-form">
        <i class="fas fa-envelope prefix grey-text"></i>
        <label data-error="wrong" data-success="right" for="form2">Password</label>
        <input type="email" id="form2" class="form-control validate">
      </div>
    </div>

    <div class="modal-footer justify-content-center">
      <a type="button" class="btn btn-outline-warning waves-effect">Send <i class="fas fa-paper-plane-o ml-1"></i></a>
    </div>
  </div>
  </div>
</div>
