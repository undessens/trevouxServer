<template>
  <div id="app">
    <div id="nav" >
      <span class="switchText" > mode actuel : {{ modeToDisplay }} </span>
      <label class="switch">
        <input type="checkbox" v-model="autoMode">
        <span class="slider round"></span>
      </label>
<!-- 
      <router-link to="/auto">Auto</router-link> |
      <router-link to="/manual">Manual</router-link> -->
    </div>
    <keep-alive>
      <component :is=viewedComponent></component>
      <!-- <Auto v-if="autoMode" />
      <Manual v-else /> -->
    </keep-alive>
    
    <!-- <router-view/> -->
    <!-- </keep-alive> -->
  </div>
</template>



<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';
import {sendAuto} from "@/lib/sender"

// import router from "./router"

import Auto from "@/views/Auto.vue"
import Manual from "@/views/Manual.vue"

@Component({
  components:{Auto,Manual}
})
export default class MainView extends Vue {
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
html{
  height:100%;

}
body {
  margin: 0; /* pour éviter les marges */
  user-select: none; /*discard text selection*/
  min-height:100%;
  background:black;
}
#app{
  min-height:100%;
  background:lightgray;
}
#nav{
  display:flex;
  justify-content: space-between;
  padding: 30px;
  background:white;
}

.switchText{
  text-align: center;
  font-size: 15px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: bold;
}

.
.fade-enter-active, .fade-leave-active {
  transition: opacity .9s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/*
.top{
  position: relative;
  height : auto;
  background-color:#DDDDDD;
  margin: 0em;
  border-radius: 15px;

}

.middle{
  background-color: white;

  }*/

  .switch {
    position: relative;
    /*left:50%;*/
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }





</style>
