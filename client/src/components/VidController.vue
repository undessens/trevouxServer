<template>
  <div >
    <p class="switchText" > Scene actuelle : {{ activeBtn }} </p>
    <div class="vidController">

        <button type="button" 
        v-on:click="setActiveBtn(i)" 
        class='potElement'
        :class="{ active: activeBtn === i , inactive: activeBtn !== i }"
        :style="{background: `url('images/${i+1}.jpg')  no-repeat scroll 0 0 transparent`}"
        > 
        {{nameButton[i]}}
      </button>


    </transition-group>
  </div>
</div>
</template>





<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {sendPlayStopVid} from '@/lib/sender'


@Component
export default class VidController extends Vue {
  private _isPlaying = true
  togglePlay(){
    this.isPlaying = !this.isPlaying

  }
  set isPlaying(v:boolean){
    this._isPlaying = v;
    // sendPlayStopVid(this._isPlaying )

  }
  get isPlaying(){return this._isPlaying}

  

  
}


</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
