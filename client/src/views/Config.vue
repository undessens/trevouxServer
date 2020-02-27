<template>
  <div >
    <Toggle @input=toggleShowError text=showError />
    <Toggle @input=toggleShowPlaylist text=showPlaylist />
    <Toggle @input=toggleshowFrames text=showFrames />
    
    <Button @input="showShutdownDialog(true)" text=reboot />
    <Button @input="showShutdownDialog(false)" text=shutdown />

</div>
</template>





<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {sendToggleShowError,sendShutdown,showPlaylist,showFrames} from '@/lib/sender'
import Toggle from "@/components/Toggle.vue"
import Button from "@/components/Button.vue"

@Component({components:{Toggle,Button}})
export default class ConfigController extends Vue {
  
  toggleShowError(){
    sendToggleShowError()
  }
  
  
  showShutdownDialog(reboot:boolean){
    if(window.confirm("sûr de vouloir "+(reboot?"redémarrer":"éteindre")+"?? sûr de sûr??")){
      sendShutdown(reboot)
    }
  }
  toggleShowPlaylist(){showPlaylist()}
  toggleshowFrames(e:boolean){showFrames(e)}

  

  
}


</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
