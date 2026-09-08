<template>
  <div class="results">

    <div class="results-title">
      <span>✦</span>
      <h3>Resultados</h3>
      <span>✦</span>
    </div>

    <div class="legend">
      <span>
        <i class="green-dot"></i>
        Correcto
      </span>

      <span>
        <i class="yellow-dot"></i>
        Parcial
      </span>

      <span>
        <i class="red-dot"></i>
        Incorrecto
      </span>
    </div>

    <div class="mobile-scroll-hint">
      ← Desliza para ver la tabla completa →
    </div>

    <div class="table-container">

      <table>

        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Imagen</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edición</th>
            <th scope="col">Rareza</th>
            <th scope="col">Color</th>
            <th scope="col">Coste</th>
            <th scope="col">Entintable</th>
            <th scope="col">Subtipos</th>
            <th scope="col">Fuerza</th>
            <th scope="col">Voluntad</th>
            <th scope="col">Lore</th>
          </tr>
        </thead>

        <tbody>
          <AttemptRow
            v-for="(attempt, index) in [...attempts].reverse()"
            v-bind:key="index"
            v-bind:attempt="attempt"
            v-bind:position="attempts.length - index"
          />
        </tbody>

      </table>

    </div>

  </div>
</template>

<script setup>
import AttemptRow from '@/components/AttemptRow.vue';

defineProps({
    attempts: {
        type: Array,
        required: true
    }
});
</script>

<style scoped lang="scss">

.results {
  width: 100%;
}

.results-title {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 14px;

  margin-bottom: 8px;

  span {
    color: var(--gold-500);
    font-size: 12px;
  }
}

h3 {
  margin: 0;

  color: var(--navy-950);

  font-family: 'Cinzel', serif;
  font-size: 22px;
  font-weight: 700;
}

/* LEYENDA */

.legend {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 20px;

  margin-bottom: 14px;

  color: #756b59;

  font-size: 11px;
  font-weight: 700;

  span {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  i {
    width: 8px;
    height: 8px;

    display: block;

    border-radius: 50%;
  }
}

.green-dot {
  background: var(--success);
}

.yellow-dot {
  background: var(--partial);
}

.red-dot {
  background: var(--error);
}

/* AVISO MÓVIL */

.mobile-scroll-hint {
  display: none;

  margin-bottom: 7px;

  color: #887d68;

  font-size: 10px;
  font-weight: 700;

  text-align: center;
}

/* TABLA */

.table-container {
  width: 100%;

  overflow-x: hidden;

  border: 1px solid #cfc3a5;
  border-radius: 12px;

  box-shadow:
    0 8px 20px rgba(30, 35, 50, 0.10);

  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;

  table-layout: fixed;

  border-collapse: collapse;

  background: #faf6e9;
}

th {
  padding: 13px 8px;

  background:
    linear-gradient(
      180deg,
      var(--navy-700),
      var(--navy-900)
    );

  color: var(--gold-300);

  border-right: 1px solid rgba(255, 255, 255, 0.1);

  font-family: 'Cinzel', serif;
  font-size: 10px;
  font-weight: 600;

  letter-spacing: 0.3px;

  white-space: normal;

  &:last-child {
    border-right: 0;
  }
}

/* ANCHOS DE COLUMNAS */

th:nth-child(1),
td:nth-child(1) {
  width: 4%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 7%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 15%;
}

th:nth-child(4),
td:nth-child(4) {
  width: 11%;
}

th:nth-child(5),
td:nth-child(5) {
  width: 9%;
}

th:nth-child(6),
td:nth-child(6) {
  width: 8%;
}

th:nth-child(7),
td:nth-child(7) {
  width: 7%;
}

th:nth-child(8),
td:nth-child(8) {
  width: 8%;
}

th:nth-child(9),
td:nth-child(9) {
  width: 13%;
}

th:nth-child(10),
td:nth-child(10),
th:nth-child(11),
td:nth-child(11),
th:nth-child(12),
td:nth-child(12) {
  width: 6%;
}

/* TABLET */

@media (max-width: 768px) {

  h3 {
    font-size: 20px;
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    min-width: 700px;
  }
}

/* MÓVIL */

@media (max-width: 480px) {

  .results-title {
    gap: 9px;
  }

  h3 {
    font-size: 18px;
  }

  .legend {
    gap: 10px;
    margin-bottom: 8px;

    font-size: 9px;
  }

  .mobile-scroll-hint {
    display: block;
  }

  .table-container {
    border-radius: 9px;
  }

  table {
    min-width: 650px;
  }

  th {
    padding: 9px 5px;
    font-size: 8px;
  }
}

</style>