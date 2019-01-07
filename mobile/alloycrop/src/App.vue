<template>
<div id="app">
    <h1>腾讯前端探究-移动端</h1>
    <div id="nav">
        <router-link to="/">web图片裁剪</router-link>
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
