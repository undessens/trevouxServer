<template>
  <div id="app">
    
    <router-view></router-view>
    
    <!-- <router-view/> -->
    <!-- </keep-alive> -->
  </div>
</template>



<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';

@Component({
  // components:{Auto,Manual,Toggle}
})
export default class MainView extends Vue {
  
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
  background-color:#DBDAE0;;
}

.switchText{
  text-align: center;
  font-size: 15px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: bold;
}


/*.fade-enter-active, .fade-leave-active {
  transition: opacity .9s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}*/
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





</style>
