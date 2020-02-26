<template>
  <div class="auto">

    <h1>mode auto</h1>
          <Toggle v-model=isPlaying :text='isPlaying?"stop":"lecture"'></Toggle>

          <Button @input="showShutdownDialog(false)" text=shutdown />
    
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';
import {sendPlayStopVid,sendShutdown} from '@/lib/sender'
import Toggle from '@/components/Toggle.vue'
import Button from '@/components/Button.vue'

@Component({components:{Toggle,Button}})
export default class MediaControls extends Vue {
  
  
  private _isPlaying=true;

  set isPlaying(p: boolean){
    console.log('playing',p)
    this._isPlaying=p
    
    sendPlayStopVid(this._isPlaying)
  }
  get isPlaying(){return this._isPlaying}

  togglePlay(){this.isPlaying = !this.isPlaying}
  showShutdownDialog(reboot:boolean){
    if(window.confirm("sûr de vouloir "+(reboot?"redémarrer":"éteindre")+"?? sûr de sûr??")){
      sendShutdown(reboot)
    }
  }

}


</script>
