<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">列表</RouterLink>
    <RouterLink to="/draft">补记</RouterLink>
  </nav>
  <RouterView />
</template>
