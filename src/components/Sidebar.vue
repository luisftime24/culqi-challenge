<template>
  <div class="flex h-screen">
    <div
      class="min-w-[280px] w-1/4 flex flex-col justify-between bg-white p-4 py-5 px-6 border-r border-r-culqi-gray-300">
      <div class="flex flex-col">
        <img src="../assets/culqi-logo-dark.svg" alt="culqi-logo" class="mb-[30px] self-center">
        <nav>
          <ul>
            <li v-for="item in menuItems" :key="item.title" class="py-4 flex gap-[10px]">
              <img :src="item.iconSrc" :alt="item.title">
              <router-link :to="item.link" class="text-sm font-bold leading-6" :class="item.active ? 'text-primary-green-300' : 'text-culqi-gray-900'">
                {{ item.title }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <button
        @click="logout"
        class="text-center text-sm font-bold leading-6 border border-black rounded-[10px] h-[48px] w-[216px] self-center">
        Salir
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '../store/session';
import { useRouter } from 'vue-router';

const router = useRouter();

const menuItems = [
  {
    title: 'Empleados',
    link: '',
    iconSrc: require('../assets/icons/users.svg'),
    active: true,
  },
  {
    title: 'Reclutamiento',
    link: '',
    iconSrc: require('../assets/icons/briefcase.svg'),
    active: false,
  },
];

const logout = () => {
  const sessionStore = useSessionStore();
  sessionStore.logout();
  router.push('/auth');
};
</script>
