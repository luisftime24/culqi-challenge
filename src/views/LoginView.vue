<template>
  <div class="w-screen h-screen flex">
    <div class="w-1/2 max-w-[1150px] bg-culqi-dark">
      <img class="w-full" src="../assets/login-banner.png" alt="culqi-banner">
      <div class="border-t-[5px] border-culqi-green-dark p-[50px]">
        <img class="mb-5" src="../assets/culqi-logo.svg" alt="culqi-logo">
        <h2 class="mb-5 text-white text-4xl font-bold leading-[120%]">Dale más power ⚡ a tus empleados hoy 💪</h2>
        <p class="text-white font-manrope text-[18px] font-normal leading-6">Te ayudamos a gestionarlos de manera más sencilla</p>
      </div>
    </div>
    <div class="flex-1 h-screen flex flex-col items-center justify-center">
      <div class="w-full flex flex-col items-center">
        <form class="w-full max-w-md px-4 mb-4" @submit.prevent="login">
          <h3 class="text-center text-greyscale-900 font-semibold text-2xl leading-8 mb-8">Inicia sesión</h3>

          <div class="mb-6 flex flex-col">
            <label for="email" class="text-greyscale-900 font-medium text-base mb-3">
              Correo electrónico
              <span class="text-red-500">*</span>
            </label>
            <input
              type="email"
              v-model="email"
              @input="validateEmail"
              placeholder="Ingresa el correo electrónico"
              id="email"
              :class="emailClass"
              class="py-4 px-5 rounded-lg border border-solid text-base font-normal leading-6">
          </div>

          <div class="mb-8 flex flex-col">
            <label for="password" class="text-greyscale-900 font-medium text-base mb-3">
              Contraseña
              <span class="text-red-500">*</span>
            </label>
            <input
              type="password"
              v-model="password"
              @input="validatePassword"
              placeholder="Ingresa la contraseña"
              id="password"
              :class="passwordClass"
              class="py-4 px-5 rounded-lg border border-solid border-gray-300">
          </div>

          <div :class="errorMessageClass" class="flex gap-1">  
            <img src="../assets/icons/alert-circle.svg" alt="">
            <p class="text-culqi-text-error text-[12px] leading-6">Correo o contraseña incorrectos</p>
          </div>

          <button type="submit" class="w-full py-4 px-5 rounded-[10px] bg-gray-900 text-white text-center text-lg font-bold leading-6">Iniciar sesión</button>
          <p class="text-center mt-8 text-gray-500">¿Eres nuevo aquí? <a href="" class="text-culqi-green-dark">Crea una cuenta</a></p>
        </form>

        <p class="text-sm absolute bottom-6 text-gray-500">&copy; 2023 Culqi. Todos los derechos reservados</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../services/AuthService';
import { useSessionStore } from '../store/session';

const email = ref('');
const password = ref('');
const showErrorMsg = ref(false);
const isValidEmail = ref(false);
const isValidPassword = ref(false);

const router = useRouter();
const sessionStore = useSessionStore();

const validateEmail = () => {
  showErrorMsg.value = false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isValidEmail.value = email.value !== '' && emailRegex.test(email.value);
};

const validatePassword = () => {
  showErrorMsg.value = false;
  isValidPassword.value = password.value.length > 3;
};

const login = async () => {
  try {
    const userData = await AuthService.login(email.value, password.value);
    sessionStore.login(userData);

    router.push('/dashboard');
  } catch (error) {
    showErrorMsg.value = true;
    console.error('Error al iniciar sesión:', error);
  }
};

const emailClass = computed(() => ({
  'border-green-500': isValidEmail.value,
}));

const passwordClass = computed(() => ({
  'border-green-500': isValidPassword.value,
}));

const errorMessageClass = computed(() => ({
  'mb-8': showErrorMsg.value,
  'invisible': !showErrorMsg.value,
}));
</script>
