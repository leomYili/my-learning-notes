<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <p>{{initCount}} 这是初始store</p>
    <button
      class="testBtn"
      v-on:click="changeInitCount"
    >更新this.count</button>
    <p>{{reversedCount}} 这是计算之后的store</p>
    <button
      class="testBtn"
      v-on:click="add"
    >更新store.count</button>
    <HelloWorld v-bind:msg="reversedCount" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import HelloWorld from "./components/HelloWorld.vue";
import store from "./store";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    // 这是state,内部状态,如果在这里使用$store,就相当于初始赋值
    return {
      initCount: this.$store.state.count
    };
  },
  computed: mapState({
    // 这是获取,也可看成是redux中的 mapStateToProps
    reversedCount(state) {
      return state.count + " 这是计算之后的store";
    }
  }),
  methods: {
    ...mapActions({ add: "increment" }),
    changeInitCount: function() {
      return this.initCount++;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.testBtn {
  background: #ccc;
  color: black;
}
</style>
