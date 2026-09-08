<template>
  <div class="game-container">

    <header class="game-header">
      <div class="eyebrow">
        THE GREAT ILLUMINARY
      </div>

      <h1>Adivina la carta</h1>

      <div class="edition">
        <span></span>
        Core Edition
        <span></span>
      </div>
    </header>

    <main class="game-panel">

      <div class="mobile-game-row">

        <section class="solution-section">
          <div class="section-label">
            CARTA OCULTA
          </div>

          <div class="solution-frame">
            <SolutionImage
              v-bind:url="image_url"
              v-bind:solved="solved"
            />
          </div>
        </section>

        <section class="selector-section">
          <CardSelector
            v-bind:cards="allSetCards"
            v-bind:solver="solved"
            v-on:cardSelected="addAttempt"
          />
        </section>

      </div>

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
import SolutionImage from '@/components/SolutionImage.vue';
import allCards from '@/data/cards.json';
import { compareCards } from '@/utils/cardComparison';

const allSetCards = ref([]);
const image_url = ref('');
const solved = ref(false);
const attempts = ref([]);
const solutionCard = ref(null);

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
  image_url.value = solutionCard.value.Image; 
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

/* HEADER */

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

/* CONTENIDO DEL JUEGO */

.mobile-game-row {
  display: contents;
}

/* CARTA */

.solution-section {
  text-align: center;
}

.section-label {
  margin-bottom: 12px;

  color: #81765f;

  font-family: 'Cinzel', serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}

.solution-frame {
  min-height: 410px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px;

  border: 1px solid rgba(140, 104, 31, 0.25);
  border-radius: 15px;

  background:
    radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.8),
      rgba(219, 208, 184, 0.38)
    );

  box-shadow:
    inset 0 1px 5px rgba(60, 50, 30, 0.08);
}

/* BUSCADOR */

.selector-section {
  width: min(700px, 100%);
  margin: 28px auto 0;
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

  .solution-frame {
    min-height: 350px;
  }

  .results-section {
    margin-top: 28px;
  }
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

  .game-panel {
    padding: 12px 10px 18px;
    border-radius: 12px;
  }

  /*
   * En móvil:
   * izquierda = buscador
   * derecha = carta
   */
  .mobile-game-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-items: start;
  }

  .selector-section {
    grid-column: 1;
    grid-row: 1;

    width: 100%;
    margin: 0;
  }

  .solution-section {
    grid-column: 2;
    grid-row: 1;
  }

  .section-label {
    margin-bottom: 8px;
    font-size: 9px;
  }

  .solution-frame {
    min-height: 0;
    height: 220px;

    padding: 5px;
    border-radius: 10px;
  }

  .solution-frame img {
    max-width: 100%;
    max-height: 210px;
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
