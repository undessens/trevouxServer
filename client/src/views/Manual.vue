<template>
  <div class="manual">

    <PotList msg="Welcome to Your PotList App"/>
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
