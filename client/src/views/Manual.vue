<template>
  <div class="manual">

    <PotList />
  </div>
</template>

<script>
// @ is an alias to /src
import PotList from '@/components/PotList.vue'

export default {
  name: 'Auto',
  components: {
    PotList
  }
}
</script>
