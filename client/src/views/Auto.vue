<template>
  <div class="auto">

    <h1>mode auto</h1>
          <Toggle v-model=isPlaying></Toggle>
    
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';
import {sendPlayStopVid} from '@/lib/sender'
import Toggle from '@/components/Toggle.vue'

@Component({components:{Toggle}})
export default class MediaControls extends Vue {
  
  
  private _isPlaying=true;

  set isPlaying(p: boolean){
    console.log('playing',p)
    this._isPlaying=p
    
    sendPlayStopVid(this._isPlaying)
  }
  get isPlaying(){return this._isPlaying}

  togglePlay(){this.isPlaying = !this.isPlaying}

}


</script>
