<script>
import Content from './MyModal/Content.svelte';
import Modal from 'svelte-simple-modal';

import { writable } from 'svelte/store';

export const loggedIn = writable(false);

</script>

<Modal>
  <Content />
</Modal>
