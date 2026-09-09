<template>
    <header class="game-header">
        <div class="eyebrow">
            THE GREAT ILLUMINARY
        </div>

        <h1>{{ title }}</h1>

        <div class="edition">
            <span></span>
            {{ edition }}
            <span></span>
        </div>
    </header>
</template>

<script setup>
defineProps({
    title: {
        required: true,
        type: String
    },
    edition: {
        required: true,
        type: String
    }
});
</script>

<style scoped lang="scss">
/*Header*/
.game-header {
  text-align: center;
  margin-bottom: 28px;
}

.eyebrow {
  margin-bottom: 7px;

  color: var(--gold-600);

  font-family: 'Cinzel', serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 4px;
}

h1 {
  margin: 0;

  color: var(--navy-950);

  font-family: 'Cinzel', serif;
  font-size: clamp(32px, 5vw, 50px);
  font-weight: 700;

  line-height: 1.1;

  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.8),
    0 3px 4px rgba(0, 0, 0, 0.12);
}

.edition {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;

  margin-top: 12px;

  color: var(--gold-600);

  font-family: 'Cinzel', serif;
  font-size: 14px;
  font-weight: 600;
}

.edition span {
  width: 55px;
  height: 1px;
  background: var(--gold-500);
}

/* MÓVIL */

@media (max-width: 480px) {

  .game-header {
    margin-bottom: 18px;
  }

  .eyebrow {
    font-size: 8px;
    letter-spacing: 2.5px;
  }

  h1 {
    font-size: 29px;
  }

  .edition {
    gap: 7px;
    margin-top: 8px;
    font-size: 11px;
  }

  .edition span {
    width: 25px;
  }
}
</style>