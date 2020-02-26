<template>
  <div class="main">
<div id="nav" >
      <span class="switchText" > mode actuel : {{ modeToDisplay }} </span>
      <Toggle v-model=autoMode></Toggle>
<!-- 
      <router-link to="/auto">Auto</router-link> |
      <router-link to="/manual">Manual</router-link> -->
    </div>
        
    <keep-alive>
      <!-- <transition name="fade" mode="out-in"> -->
      <component :is=viewedComponent></component>
      <!-- <Auto v-if="autoMode" />
      <Manual v-else /> -->
      <!-- </transition> -->
    </keep-alive>
  
  </div>
</template>

<script>
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';

import Toggle from "@/components/Toggle.vue"
import {sendAuto} from "@/lib/sender"
import Auto from "@/views/Auto.vue"
import Manual from "@/views/Manual.vue"

@Component({
  components:{Auto,Manual,Toggle}
})
export default class Main extends Vue {
  autoMode=true
  get viewedComponent(){
    return this.autoMode?Auto:Manual
  }
  @Watch("autoMode")
  switchMode(){
    console.log("switch Mode",this.autoMode);
    // this.viewButton = this.autoMode;
    sendAuto(this.autoMode)
    // router.push({ name: this.autoMode?'Auto':'Manual'})
    
  }


  get modeToDisplay(){
    return this.autoMode?"automatique":"manuel"
  }

  }
</script>

<style>

#nav{
  display:flex;
  justify-content: space-between;
  padding: 30px;
  background:white;
}
</style>
