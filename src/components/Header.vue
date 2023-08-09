<template>
  <div class="flex justify-end items-center py-6 px-8 gap-2 border-b border-b-culqi-gray-300">
    <p class="text-center rounded-[50%] p-[6px] text-sm font-bold text-white bg-[#EB6F25]">{{ getInitials(user.nombre) }}</p>
    <p class="text-culqi-gray-900 text-[12px] font-bold leading-5">{{ user.nombre }}</p>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '../store/session';

const sessionStore = useSessionStore();
const user = sessionStore.user.data.user;
const getInitials = (name: string) => {
  const names = name.split(' ');
  let initials = '';
  for (const n of names) {
    initials += n[0].toUpperCase();
  }
  return initials;
};
</script>
