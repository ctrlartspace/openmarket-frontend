<template>
  <router-link
    v-for="(item, i) in menuItems"
    class="app-router-link"
    :class="{ 'ml-4': i != 0 }"
    :to="item.path"
    :key="i"
  >
    {{ item.title }}
  </router-link>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const menuItems = ref([
  {
    title: "Корзина",
    path: "/cart",
  },
  {
    title: "Продажи",
    path: "/sales",
  },
  {
    title: "Приход",
    path: "/income",
  },
])
</script>

<style scoped>
.app-router-link :first-child {
  margin-left: 0;
}
.app-router-link {
  color: #bdbdbd;
  text-decoration: none;
  font-weight: 700;
}
.app-router-link-active {
  color: #000;
  text-decoration: none;
  font-weight: 700;
}
</style>
