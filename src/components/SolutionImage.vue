<template>
  <div class="solution-wrapper">
    <img
      v-bind:src="url"
      v-bind:class="{ hidden: !solved }"
    >
  </div>
</template>

<script setup>

defineProps({
    url: {
        required: true,
        type: String
    },
    solved: {
        required: true,
        type: Boolean
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

.hidden {
  visibility: hidden;
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
  }

  img {
    max-width: 80%;
    max-height: 280px;
  }
}

</style>