<template>
  <div class="game-container">

    <HeaderComponent v-bind:title="title" v-bind:edition="edition"/>

    <main class="game-panel">

      <section class="selector-section">
        <CardSelector
          v-bind:cards="allSetCards"
          v-bind:solved="solved"
          v-on:cardSelected="addAttempt"
        />
      </section>

      <button
        v-if="solved"
        type="button"
        class="new-game-button"
        v-on:click="newGame"
      >
        <span>✦</span>
        Jugar otra
      </button>

    </main>

    <section class="results-section">
      <AttemptsTable v-bind:attempts="attempts"/>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CardSelector from '@/components/CardSelector.vue';
import AttemptsTable from '@/components/AttemptsTable.vue';
import allCards from '@/data/cards.json';
import { compareCards } from '@/utils/cardComparison';
import HeaderComponent from '@/components/HeaderComponent.vue';

const allSetCards = ref([]);
const solved = ref(false);
const attempts = ref([]);
const solutionCard = ref(null);

const title = "Adivina la carta";
const edition = "Core Edition";

onMounted( () => {
  allSetCards.value = allCards.filter(checkSet)
  startGame();
})

function checkSet(card){
  return (card.Set_ID == "FAB" 
  || card.Set_ID == "WHI"
  || card.Set_ID == "WIN"
  || card.Set_ID == "WUN"
  || card.Set_ID == "AOV") && card.Type == "Character"
}

function addAttempt(selectedCard) {
  const attempt = compareCards(selectedCard, solutionCard.value);
  attempts.value.push(attempt);

  if (attempt.solved === 'correct') {
    solved.value = true;
  }
}

function startGame() { 
  const randomIndex = Math.floor( Math.random() * allSetCards.value.length );
  solutionCard.value = allSetCards.value[randomIndex]; 
}

function newGame() {
  attempts.value = [];
  solved.value = false;
  startGame();
}
</script>

<style scoped lang="scss">

.game-container {
  width: min(1120px, 100%);
  margin: 0 auto;
}

/* PANEL PRINCIPAL */

.game-panel {
  padding: 30px;

  border: 1px solid rgba(184, 139, 47, 0.55);
  border-radius: 20px;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.82),
      rgba(248, 243, 231, 0.96)
    );

  box-shadow:
    0 22px 55px rgba(24, 30, 45, 0.18),
    inset 0 1px 0 white;
}

/* BUSCADOR */

.selector-section {
  width: min(700px, 100%);
  margin: 0 auto;
}

/* BOTÓN */

.new-game-button {
  display: block;

  margin: 25px auto 0;

  padding: 13px 28px;

  border: 1px solid var(--gold-600);
  border-radius: 9px;

  background:
    linear-gradient(
      180deg,
      var(--gold-300),
      var(--gold-400)
    );

  color: #3d2c0e;

  font-family: 'Cinzel', serif;
  font-size: 13px;
  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 5px 14px rgba(100, 75, 20, 0.20),
    inset 0 1px rgba(255, 255, 255, 0.65);

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);

    box-shadow:
      0 8px 20px rgba(100, 75, 20, 0.28),
      inset 0 1px rgba(255, 255, 255, 0.65);
  }

  &:active {
    transform: translateY(0);
  }

  span {
    margin-right: 6px;
  }
}

/* RESULTADOS */

.results-section {
  margin-top: 35px;
}

/* TABLET */

@media (max-width: 768px) {

  .game-panel {
    padding: 20px;
    border-radius: 15px;
  }

  .results-section {
    margin-top: 28px;
  }
}

/* MÓVIL */

@media (max-width: 480px) {

  .game-panel {
    padding: 12px 10px 18px;
    border-radius: 12px;
  }

  .new-game-button {
    width: 100%;
    margin-top: 18px;
  }

  .results-section {
    margin-top: 22px;
  }
}

</style>
