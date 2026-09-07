<template>
  <div class="search-container">

    <label class="search-label">
      ¿Qué carta es?
    </label>

    <div class="input-wrapper">

      <span class="search-icon">⌕</span>

      <input
        type="text"
        class="form-control"
        v-model="search"
        v-bind:disabled = "solved"
        @input="onInput"
        @keydown.escape="hideSuggestions"
        placeholder="Escribe el nombre de la carta..."
      >

    </div>

    <div
      v-if="showSuggestions && filteredCards.length"
      class="suggestions"
    >
      <button
        v-for="card in filteredCards"
        :key="card.id"
        type="button"
        class="suggestion"
        @click="selectCard(card)"
      >
        <span class="suggestion-star">✦</span>
        {{ card.Name }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    cards: {
        type: Array,
        required: true
    },
    solved: { type: Boolean, required: true }
});

const search = ref('');
const showSuggestions = ref(false);
const selectedCardId = ref(null);

const filteredCards = computed(()=>{
    return props.cards.filter(card => card.Name.toLowerCase().includes(search.value.toLowerCase()));
});

const emit = defineEmits(['cardSelected']);

function selectCard(card) {
    search.value = card.name;
    selectedCardId.value = card.id;
    showSuggestions.value = false;
    emit('cardSelected', card);
}

function onInput() {
    if (search.value.length === 0) {
        showSuggestions.value = false;
        return;
    }

    showSuggestions.value = true;
}

function hideSuggestions() {
    showSuggestions.value = false;
}
</script>

<style scoped lang="scss">

.search-container {
  position: relative;
  width: 100%;
}

.search-label {
  display: block;
  margin-bottom: 8px;

  color: var(--navy-800);

  font-family: 'Cinzel', serif;
  font-size: 13px;
  font-weight: 700;

  text-align: left;
}

.input-wrapper {
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;

  border: 2px solid #c9bda4;
  border-radius: 10px;

  background: rgba(255, 253, 247, 0.95);

  box-shadow:
    0 4px 12px rgba(20, 25, 40, 0.08);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus-within {
    border-color: var(--gold-500);

    box-shadow:
      0 0 0 3px rgba(184, 139, 47, 0.12),
      0 6px 16px rgba(20, 25, 40, 0.10);
  }
}

input.form-control {
  width: 100%;
  min-height: 52px;

  padding: 12px 45px;

  border: 0;
  outline: 0;

  background: transparent;

  color: var(--navy-900);

  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 600;

  text-align: center;

  box-shadow: none;

  &:focus {
    box-shadow: none;
    background: transparent;
  }

  &::placeholder {
    color: #9a907d;
    font-weight: 500;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.search-icon {
  position: absolute;
  left: 15px;

  color: var(--gold-600);

  font-size: 24px;

  pointer-events: none;
}

/* SUGERENCIAS */

.suggestions {
  position: absolute;

  z-index: 1000;

  top: calc(100% + 6px);
  left: 0;
  right: 0;

  max-height: 300px;

  overflow-y: auto;

  padding: 6px;

  border: 1px solid #c9bda4;
  border-radius: 10px;

  background: #fffdf7;

  box-shadow:
    0 15px 35px rgba(15, 22, 38, 0.18);
}

.suggestion {
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 44px;

  padding: 9px 12px;

  border: 0;
  border-radius: 7px;

  background: transparent;

  color: var(--navy-800);

  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;

  text-align: left;

  cursor: pointer;

  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover,
  &:focus {
    background: #f0e6cd;
    color: var(--gold-600);
  }
}

.suggestion-star {
  width: 25px;

  flex-shrink: 0;

  color: var(--gold-500);
}

/* MÓVIL */

@media (max-width: 480px) {

  .search-label {
    font-size: 12px;
  }

  input.form-control {
    min-height: 52px;
    font-size: 16px;
  }

  .suggestions {
    max-height: 260px;
  }

  .suggestion {
    min-height: 48px;
    font-size: 14px;
  }
}

</style>
