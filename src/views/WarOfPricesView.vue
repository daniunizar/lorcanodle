<template>
  <div class="game-container">

<HeaderComponent
  v-bind:title="title"
  v-bind:edition="edition"
/>

<main class="game-panel">

  <!-- Pregunta -->
  <label class="game-question">
    ¿Cuál es más cara?
  </label>


  <!-- ========================= -->
  <!-- CARGANDO PARTIDA           -->
  <!-- ========================= -->

  <div
    v-if="isLoading"
    class="loading-panel"
  >

    <div class="loading-spinner"></div>

    <div class="loading-message">
      Preparando partida...
    </div>

  </div>


  <!-- ========================= -->
  <!-- CONTENIDO DEL JUEGO        -->
  <!-- ========================= -->

  <template v-else>

    <!-- ========================= -->
    <!-- CARTAS                     -->
    <!-- ========================= -->

    <div class="cards-grid">

      <!-- Carta A -->
      <div class="card-option">

        <SolutionImage
          v-bind:src="srcCardA"
        />

        <!-- Precio oculto hasta resolver -->
        <span
          v-if="showResult"
          class="card-price"
        >
          {{ priceCardA }}$
        </span>

      </div>


      <!-- Espacio central -->
      <div></div>


      <!-- Carta B -->
      <div class="card-option">

        <SolutionImage
          v-bind:src="srcCardB"
        />

        <!-- Precio oculto hasta resolver -->
        <span
          v-if="showResult"
          class="card-price"
        >
          {{ priceCardB }}$
        </span>

      </div>

    </div>


    <!-- ========================= -->
    <!-- BOTONES DE RESPUESTA       -->
    <!-- ========================= -->

    <div
      v-if="!showResult"
      class="buttons-grid"
    >

      <!-- Botón Carta A -->
      <div class="button-option">

        <button
          class="solution-button"
          v-bind:disabled="isLoading"
          v-on:click="selectedOption('cardA')"
        >
          Card A
        </button>

      </div>


      <!-- Botón empate -->
      <div class="button-option">

        <button
          class="solution-button"
          v-bind:disabled="isLoading"
          v-on:click="selectedOption('equals')"
        >
          =
        </button>

      </div>


      <!-- Botón Carta B -->
      <div class="button-option">

        <button
          class="solution-button"
          v-bind:disabled="isLoading"
          v-on:click="selectedOption('cardB')"
        >
          Card B
        </button>

      </div>

    </div>


    <!-- ========================= -->
    <!-- RESULTADO                 -->
    <!-- ========================= -->

    <div
      v-if="showResult"
      class="result-panel"
    >

      <!-- Acierto -->
      <div
        v-if="isCorrect"
        class="result-message success"
      >
        ¡Acertaste!
      </div>


      <!-- Fallo -->
      <div
        v-else
        class="result-message error"
      >
        ¡Fallaste!
      </div>


      <!-- Siguiente ronda -->
      <button
        v-if="isCorrect"
        class="solution-button next-button"
        v-on:click="nextRound"
      >
        Siguiente
      </button>


      <!-- Fin de partida -->
      <div
        v-else
        class="game-over"
      >

        <div class="attempts-message">
          Has completado
          <strong>{{ successfulAttempts }}</strong>
          {{ successfulAttempts === 1 ? 'intento' : 'intentos' }}
          correctamente.
        </div>


        <button
          class="solution-button new-game-button"
          v-on:click="startNewGame"
        >
          Nueva partida
        </button>

      </div>

    </div>

  </template>

</main>
</div>
</template>

<script setup>

import HeaderComponent from '@/components/HeaderComponent.vue';
import SolutionImage from '@/components/SolutionImage.vue';
import { ref, onBeforeMount } from 'vue';


const API_URL = 'https://api.lorcast.com/v0/cards/search';


// =========================
// CARTAS
// =========================

let cards = null;

const cardA = ref(null);
const cardB = ref(null);


// =========================
// IMÁGENES
// =========================

const srcCardA = ref(null);
const srcCardB = ref(null);


// =========================
// PRECIOS
// =========================

const priceCardA = ref(null);
const priceCardB = ref(null);


// =========================
// PARTIDA
// =========================

// Número de ronda actual
let round = 1;

// Número de respuestas correctas consecutivas
const successfulAttempts = ref(0);


// =========================
// ESTADO DEL JUEGO
// =========================

// Indica si estamos mostrando el resultado
const showResult = ref(false);

// Indica si la respuesta actual es correcta
const isCorrect = ref(false);

// Indica si estamos cargando una nueva partida
const isLoading = ref(false);


// =========================
// TÍTULO
// =========================

let title = 'Guerra de Precios';

let edition = 'Infinity Edition';


// =========================
// OBTENER CARTAS DE LA API
// =========================

async function getRandomCardsFromApi() {

  const response = await fetch(
    `${API_URL}?q=format%3Acore&unique=cards`
  );

  if (!response.ok) {
    throw new Error('Error al consultar Lorcast');
  }

  const data = await response.json();


  // Solo cartas con precio
  const cardsWithPrice = data.results.filter(card =>
    card.prices &&
    card.prices.usd !== null &&
    card.prices.usd !== ''
  );


  // Mezclar cartas
  const shuffled = [...cardsWithPrice].sort(
    () => Math.random() - 0.5
  );


  return shuffled;
}


// =========================
// AL CARGAR EL COMPONENTE
// =========================

onBeforeMount(async () => {

  await startNewGame();

});


// =========================
// INICIAR NUEVA PARTIDA
// =========================

async function startNewGame() {

  // Activar estado de carga
  isLoading.value = true;


  // Ocultar resultado
  showResult.value = false;

  isCorrect.value = false;


  // Eliminar inmediatamente las cartas
  // de la partida anterior
  cardA.value = null;
  cardB.value = null;

  srcCardA.value = null;
  srcCardB.value = null;

  priceCardA.value = null;
  priceCardB.value = null;


  try {

    // Reiniciar partida
    round = 1;

    successfulAttempts.value = 0;


    // Volver a llamar a la API
    cards = await getRandomCardsFromApi();


    // Obtener primera pareja
    getNextPairOfCards(round);

  } catch (error) {

    console.error(error);

  } finally {

    // Finalizar estado de carga
    isLoading.value = false;

  }

}


// =========================
// OBTENER PAREJA
// =========================

function getNextPairOfCards(round) {

  const positions = getPositionsFromRound(round);


  const currentPairOfCards = [
    cards[positions[0]],
    cards[positions[1]]
  ];


  // =========================
  // CARTA A
  // =========================

  cardA.value = currentPairOfCards[0];

  srcCardA.value =
    cardA.value.image_uris.digital.normal;

  priceCardA.value =
    Number(cardA.value.prices.usd);


  // =========================
  // CARTA B
  // =========================

  cardB.value = currentPairOfCards[1];

  srcCardB.value =
    cardB.value.image_uris.digital.normal;

  priceCardB.value =
    Number(cardB.value.prices.usd);

}


// =========================
// POSICIONES DE LA RONDA
// =========================

function getPositionsFromRound(round) {

  const positionB = (round * 2) - 1;

  const positionA = positionB - 1;


  return [
    positionA,
    positionB
  ];

}


// =========================
// SELECCIONAR RESPUESTA
// =========================

function selectedOption(optionSelected) {

  // Protección adicional:
  // no permitir respuestas durante la carga
  if (isLoading.value) {
    return;
  }


  switch (optionSelected) {

    case 'cardA':

      isCorrect.value =
        priceCardA.value > priceCardB.value;

      break;


    case 'cardB':

      isCorrect.value =
        priceCardB.value > priceCardA.value;

      break;


    case 'equals':

      isCorrect.value =
        priceCardA.value === priceCardB.value;

      break;

  }


  // Si acertamos, incrementamos
  // el número de intentos correctos
  if (isCorrect.value) {

    successfulAttempts.value++;

  }


  // Mostrar resultado
  showResult.value = true;

}


// =========================
// SIGUIENTE RONDA
// =========================

function nextRound() {

  round++;

  getNextPairOfCards(round);

  // Ocultar precios y resultado
  showResult.value = false;

}

</script>

<style scoped>

.game-container {
  width: min(1120px, 100%);
  margin: 0 auto;
}


/* ========================= */
/* PANEL PRINCIPAL            */
/* ========================= */

.game-panel {
  position: relative;

  padding: 70px 30px 30px;

  border: 2px solid #c9a227;
  border-radius: 20px;

  background:
    linear-gradient(
      135deg,
      #f8f5e9,
      #ffffff
    );

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.15);
}


/* ========================= */
/* PREGUNTA                   */
/* ========================= */

.game-question {
  position: absolute;

  top: 25px;
  left: 50%;

  transform: translateX(-50%);

  font-family: 'Cinzel', serif;

  font-size: 20px;
  font-weight: bold;

  text-align: center;

  white-space: nowrap;
}


/* ========================= */
/* CARGANDO                   */
/* ========================= */

.loading-panel {
  min-height: 400px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 20px;
}


.loading-message {
  font-family: 'Cinzel', serif;

  font-size: 20px;

  font-weight: bold;

  color: #1d3557;

  text-align: center;
}


.loading-spinner {
  width: 42px;
  height: 42px;

  border: 4px solid rgba(29, 53, 87, 0.2);

  border-top-color: #1d3557;

  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}


@keyframes spin {

  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }

}


/* ========================= */
/* IMÁGENES                   */
/* ========================= */

.cards-grid {
  display: grid;

  grid-template-columns: 1fr auto 1fr;

  gap: 30px;

  align-items: start;
}


.card-option {
  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;
}


/* Precio */

.card-price {
  margin-top: 10px;

  font-family: 'Cinzel', serif;

  font-size: 20px;

  font-weight: bold;

  color: #1d3557;
}


/* ========================= */
/* BOTONES                    */
/* ========================= */

.buttons-grid {
  display: grid;

  grid-template-columns: 1fr auto 1fr;

  gap: 30px;

  margin-top: 15px;

  align-items: center;
}


.button-option {
  display: flex;

  justify-content: center;

  align-items: center;
}


/* ========================= */
/* BOTÓN GENERAL              */
/* ========================= */

.solution-button {
  min-width: 120px;

  height: 44px;

  padding: 10px 24px;

  border: 1px solid #1d3557;

  border-radius: 10px;

  background: white;

  color: #1d3557;

  font-family: 'Cinzel', serif;

  font-size: 14px;

  font-weight: bold;

  cursor: pointer;

  display: flex;

  align-items: center;

  justify-content: center;

  line-height: 1;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.solution-button:hover {

  transform: translateY(-2px);

  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.15);

}


.solution-button:disabled {

  cursor: not-allowed;

  opacity: 0.6;

}


/* ========================= */
/* RESULTADO                  */
/* ========================= */

.result-panel {

  margin-top: 20px;

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 15px;
}


.result-message {

  font-family: 'Cinzel', serif;

  font-size: 24px;

  font-weight: bold;

  text-align: center;
}


.success {
  color: #2e7d32;
}


.error {
  color: #c62828;
}


/* ========================= */
/* FIN DE PARTIDA             */
/* ========================= */

.game-over {

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 15px;
}


.attempts-message {

  font-family: 'Cinzel', serif;

  font-size: 18px;

  text-align: center;

  color: #1d3557;
}


.attempts-message strong {

  font-size: 22px;

}


/* ========================= */
/* BOTONES DE RESULTADO       */
/* ========================= */

.next-button,
.new-game-button {

  min-width: 150px;
}


/* ========================= */
/* TABLET                     */
/* ========================= */

@media (max-width: 768px) {

  .game-panel {

    padding:
      60px 20px 20px;

  }


  .game-question {

    top: 20px;

    font-size: 18px;

  }


  .loading-panel {

    min-height: 340px;

  }


  .cards-grid,
  .buttons-grid {

    gap: 20px;

  }


  .solution-button {

    min-width: 110px;

    height: 44px;

    padding:
      8px 20px;

  }

}


/* ========================= */
/* MÓVIL                     */
/* ========================= */

@media (max-width: 480px) {

  .game-panel {

    padding:
      55px 10px 18px;

  }


  .game-question {

    top: 18px;

    font-size: 16px;

  }


  .loading-panel {

    min-height: 250px;

  }


  .loading-message {

    font-size: 18px;

  }


  .cards-grid,
  .buttons-grid {

    grid-template-columns:
      1fr auto 1fr;

    gap: 10px;

  }


  .solution-button {

    min-width: 0;

    width: 100%;

    height: 44px;

    padding:
      8px 12px;

  }


  .card-price {

    font-size: 18px;

  }


  .result-message {

    font-size: 21px;

  }


  .attempts-message {

    font-size: 16px;

  }

}

</style>
