<template>
  <div class="auto">

    <h1>mode auto</h1>
          <label class="switch">
        <input type="checkbox" v-model="isPlaying">
        <span class="slider round"></span>
      </label>
    
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';
import {sendPlay} from '@/lib/sender'


@Component
export default class MediaControls extends Vue {
  
  
  private _isPlaying=false;
  set isPlaying(p: boolean){
    this._isPlaying=p
    sendPlay(this._isPlaying)
  }
  get isPlaying(){return this._isPlaying}

  private setVolume(v: number){

  }

}


</script>
