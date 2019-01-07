<template>
<div id="app">
    <h1>腾讯前端探究-移动端</h1>
    <div id="nav">
        <router-link to="/">60帧触摸（旋转）</router-link> |
        <router-link to="/about">60帧触摸（平移）</router-link>
    </div>
    <router-view />
</div>
</template>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    h1 {
        font-size: 20px
    }
}

#nav {
    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
