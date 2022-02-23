<template>
  <div id="app">
    <div id="nav">
      <button @click="setGlobal">change</button>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>


<script>
import {vue3} from './main'

export default {
  methods: {
    setGlobal(){
      vue3.setGlobalState({
        formData:{
          test:'test form'
        }
      })
    }
  },
}

</script>


<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
