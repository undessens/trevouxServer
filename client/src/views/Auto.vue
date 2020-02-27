<template>
  <div class="auto">

    <h1>mode vidéo</h1>
          <Toggle v-model="isPlaying" :text='isPlaying?"stop":"lecture"'></Toggle>

          <div class="bottom">
          <Button @input="showShutdownDialog(false)" text=" OFF " class="shutdown"/>
          </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';
import {sendPlayStopVid,sendShutdown} from '@/lib/sender'
import Toggle from '@/components/Toggle.vue'
import Button from '@/components/Button.vue'

@Component({components:{Toggle,Button}})
export default class Auto extends Vue {
  
  
  private pisPlaying=true;

  set isPlaying(p: boolean){
    console.log('playing',p)
    this.pisPlaying=p
    
    sendPlayStopVid(this.pisPlaying)
  }
  get isPlaying(){return this.pisPlaying}
  activated(){
    console.log("activated")
    debugger
    this.$nextTick(()=>{
      debugger;
      this.isPlaying = true;})
  }
  togglePlay(){this.isPlaying = !this.isPlaying}
  showShutdownDialog(reboot:boolean){
    if(window.confirm("sûr de vouloir "+(reboot?"redémarrer":"éteindre")+"?? sûr de sûr??")){
      sendShutdown(reboot)
    }
  }

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shutdown{
  position:relative; 
  margin-right: 10px;
  margin-top: 10px;
}

.bottom{
  background-color: gray;
  position:fixed;
  text-align: right;
  width: 100%;
  height: 50px;
  bottom: 2%;
}

.auto{
  padding-bottom: 100%;
  background-color: rgb(250, 250, 250);
}

</style>