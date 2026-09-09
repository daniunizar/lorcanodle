<template>

  <div class="solution-wrapper">

    <img
      v-bind:src="src"
    />

  </div>

</template>


<script setup>

defineProps({

  src: {
    required: true,
    type: String
  }

})

</script>


<style scoped lang="scss">

.solution-wrapper {
  width: 100%;
  min-height: 400px;

  display: flex;

  align-items: center;

  justify-content: center;
}


img {
  display: block;

  max-width: 100%;
  max-height: 400px;

  border-radius: 12px;

  border: 2px solid rgba(184, 139, 47, 0.45);

  box-shadow:
    0 14px 32px rgba(15, 22, 38, 0.30);

  transition: opacity 0.3s ease;
}


@media (max-width: 768px) {

  .solution-wrapper {

    min-height: 340px;

  }


  img {

    max-height: 340px;

  }

}


@media (max-width: 480px) {

  .solution-wrapper {

    min-height: 0;

    height: 35vh;

  }


  img {

    max-width: 70%;

    max-height: 35vh;

  }

}

</style>