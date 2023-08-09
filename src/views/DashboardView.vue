<template>
  <div class="flex h-screen">
    <culqi-sidebar></culqi-sidebar>
    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col">
      <culqi-header></culqi-header>
      <div class="view-container flex-1 py-8 px-6 bg-culqi-lightgray">
        <culqi-employees></culqi-employees>
      </div>
    </div>
  </div>
</template>

<style>
.view-container {
  width: calc(100vw - 280px);
}
</style>