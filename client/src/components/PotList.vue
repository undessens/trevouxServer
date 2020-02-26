<template>
  <div >
    <p class="switchText" > Scene actuelle : {{ activeButtonName }} ({{activeBtn}}) </p>
    <div class="potlist">

      <!-- <transition-group name="fade" tag="span" appear mode="out-in"> -->

        <span v-for="i of numPotList" :key="i" 
        class='potElement' :class="{ active: activeBtn === i , inactive: activeBtn !== i }">



        <button 
        type="button" 
        v-on:click="setActiveBtn(i)" 
        class="potImage"
        :class="{enter:startTransition,out:!startTransition}"
        :style="{backgroundImage: `url('images/${nameButton[i]}.png')`}"
        > 

      </button>

      <div class="potText" >
        {{nameButton[i]}}

      </div>

    </span>


    <!-- </transition-group> -->
  </div>
</div>
</template>





<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {sendStep} from '@/lib/sender'


@Component
export default class PotList extends Vue {

  @Prop({default:"pot"}) 
  private msg! : string;

  
  get numPot(){return this.nameButton.length}

  get numPotList(){return [...Array(this.numPot).keys()]}
  
  private activeBtn=0;

  @Prop({default:
    ()=>{
      return ["apothicairerie","medaillon","mortier","bouteille","theriaque A","theriaque B","pot onguent","chevrette","pot cylindrique","pot canon","vase haut","rafraichissoire"] 
    }
  }) 
  private nameButton!: string []
  // private nameButton = new Array<string>()
  get activeTransition(){return this.nameButton.map(e=>e+this.startTransition)}
  public startTransition = false;
  activated(){
    this.startTransition = true;
    
  }
  deactivated(){
    this.startTransition = false;
  }
  get activeButtonName(){
    return this.nameButton[this.activeBtn]
  }
  setActiveBtn (i: number){
    // console.log(i);
    this.activeBtn = i;
    
    sendStep(this.nameButton[this.activeBtn])
  }
}


</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.potlist{
  width:100%;
  display:flex;
  flex-wrap:wrap;
  background-blend-mode: normal;

  /*min-height:80%;*/
}
.potElement{

 /*justify-self: stretch;*/
 transition: all .3s;
 font-size: 24px;

 margin-left: 2%;
 margin-right: 2%;
 margin-bottom: 2%;
 margin-top: 2%;
 min-width:180px;
 min-height:231px;
  /*max-height:463px;
  max-width:360px;*/
  display: inline-block;
  border-radius: 12px;
  border: 0px solid #4CAF50;
  background-color: #000000;
  outline-style: none;
  /* scroll 0 0 transparent*/

}
.potImage{
  outline-style: none;
  padding: 0px;
  /*height:80%;*/
  min-width:inherit;
  min-height:inherit;
  box-sizing: content-box;
  background-size: contain;
  background-repeat:no-repeat;
  
  border-radius: 12px 12px 0px 0px;

}
.potText{

  text-align: center;
  
  color: inherit;
}
.inactive{
  filter: grayscale(70%);
  
  color: white;

  border-color: #000000;
}

.inactive:hover{
  /* background: radial-gradient(circle, transparent 40%, black 125%),   url("images/bg.jpg"); */
  background-blend-mode: normal;
}


.active{


  color: black;
  background-color: white;
  border-color: white;
  box-shadow: 10px 5px 5px grey;
  
}

.enter{
  transition: all 1s;
  opacity:1;
}
.out{
  opacity:0.5;
}


/*.active:focus{
  
  }*/


</style>
