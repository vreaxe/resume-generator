<template>
  <div class="a4-page">
    <slot />
  </div>
</template>

<style>
.a4-page {
  width: 210mm;
}
@page {
  margin: 1cm 0;
}
@page:first{
  margin: 0;
};
</style>
