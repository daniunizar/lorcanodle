<template>
  <div class="about-page">

    <div class="about-card">

      <div class="ornament ornament-top">
        ✦
      </div>

      <header class="about-header">
        <span class="eyebrow">THE GREAT ILLUMINARY</span>

        <h1>Sobre el juego</h1>

        <div class="gold-line">
          <span>◆</span>
        </div>

        <p class="intro">
          Bienvenido a <strong>Adivina la carta de Lorcana</strong>,
          un pequeño desafío para poner a prueba cuánto conoces
          las cartas de Disney Lorcana.
        </p>
      </header>


      <section class="about-section">

        <div class="section-icon">
          ✦
        </div>

        <div>
          <h2>¿Qué es esto?</h2>

          <p>
            Este proyecto nace como una forma de aprender y experimentar
            con Vue mientras disfrutamos de uno de nuestros
            juegos de cartas favoritos.
          </p>

          <p>
            El objetivo es sencillo: descubre qué carta se esconde
            detrás de la partida utilizando las pistas que aparecen
            después de cada intento.
          </p>
        </div>

      </section>


      <section class="about-section">

        <div class="section-icon">
          ✧
        </div>

        <div>
          <h2>¿Cómo se juega?</h2>

          <p>
            Escribe el nombre de una carta y selecciónala entre las
            opciones disponibles. Después de cada intento recibirás
            información sobre sus características.
          </p>

          <div class="result-legend">

            <div class="legend-item">
              <span class="legend-color correct"></span>
              <div>
                <strong>Correcto</strong>
                <span>La característica coincide.</span>
              </div>
            </div>

            <div class="legend-item">
              <span class="legend-color partial"></span>
              <div>
                <strong>Parcial</strong>
                <span>La respuesta está relacionada.</span>
              </div>
            </div>

            <div class="legend-item">
              <span class="legend-color wrong"></span>
              <div>
                <strong>Incorrecto</strong>
                <span>La característica no coincide.</span>
              </div>
            </div>

          </div>
        </div>

      </section>


      <section class="about-section">

        <div class="section-icon">
          ✦
        </div>

        <div>
          <h2>No me denuncies</h2>

          <p>
            Esta aplicación tiene fines educativos, si eres el Sr. Disney, el de la API empleada o el de alguien con algún tipo de derecho sobre este contenido
            <strong>no me denuncies</strong>: soy pobre y no tengo dinero.
          </p>

          <p>
            Contacta conmigo y felizmente retiraré el juego.
          </p>
        </div>

      </section>


      <div class="about-footer">

        <div class="footer-line"></div>

        <span>Hecho con curiosidad y muchas cartas</span>

        <div class="footer-line"></div>

      </div>

      <div class="ornament ornament-bottom">
        ✦
      </div>

    </div>

  </div>
</template>

<script setup>
</script>
<style scoped lang="scss">

.about-page {
  min-height: calc(100vh - 100px);

  display: flex;
  justify-content: center;
  align-items: flex-start;

  padding: 50px 20px 70px;

  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(184, 139, 47, 0.10),
      transparent 40%
    );
}


/* PANEL PRINCIPAL */

.about-card {
  position: relative;

  width: 100%;
  max-width: 850px;

  padding: 55px 70px;

  border: 1px solid rgba(184, 139, 47, 0.45);
  border-radius: 4px;

  background:
    linear-gradient(
      135deg,
      rgba(255, 253, 247, 0.98),
      rgba(247, 241, 225, 0.98)
    );

  box-shadow:
    0 25px 60px rgba(15, 22, 38, 0.18),
    0 4px 15px rgba(15, 22, 38, 0.08);
}


/* ORNAMENTOS */

.ornament {
  position: absolute;

  color: var(--gold-500);

  font-size: 24px;

  opacity: 0.8;
}

.ornament-top {
  top: 18px;
  left: 50%;

  transform: translateX(-50%);
}

.ornament-bottom {
  bottom: 18px;
  left: 50%;

  transform: translateX(-50%);
}


/* CABECERA */

.about-header {
  text-align: center;

  margin-bottom: 50px;
}

.eyebrow {
  display: block;

  margin-bottom: 12px;

  color: var(--gold-600);

  font-family: 'Cinzel', serif;
  font-size: 12px;
  font-weight: 700;

  letter-spacing: 3px;
}

h1 {
  margin: 0;

  color: var(--navy-900);

  font-family: 'Cinzel', serif;
  font-size: 42px;
  font-weight: 800;

  letter-spacing: 1px;
}

.gold-line {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;

  margin: 20px auto 25px;

  color: var(--gold-500);

  font-size: 12px;
}

.gold-line::before,
.gold-line::after {
  content: '';

  width: 80px;
  height: 1px;

  background: linear-gradient(
    to right,
    transparent,
    var(--gold-500)
  );
}

.gold-line::after {
  background: linear-gradient(
    to left,
    transparent,
    var(--gold-500)
  );
}

.intro {
  max-width: 650px;

  margin: 0 auto;

  color: #665f51;

  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  line-height: 1.8;
}

.intro strong {
  color: var(--navy-800);
}


/* SECCIONES */

.about-section {
  display: grid;
  grid-template-columns: 55px 1fr;

  gap: 20px;

  padding: 30px 0;

  border-top: 1px solid rgba(184, 139, 47, 0.25);
}

.section-icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(184, 139, 47, 0.45);
  border-radius: 50%;

  color: var(--gold-600);

  font-size: 18px;

  background: rgba(184, 139, 47, 0.06);
}

h2 {
  margin: 3px 0 12px;

  color: var(--navy-800);

  font-family: 'Cinzel', serif;
  font-size: 21px;
  font-weight: 700;
}

.about-section p {
  margin: 0 0 12px;

  color: #6b6457;

  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  line-height: 1.75;
}

.about-section p:last-child {
  margin-bottom: 0;
}

.about-section strong {
  color: var(--navy-800);
}


/* LEYENDA */

.result-legend {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 12px;

  margin-top: 22px;
}

.legend-item {
  display: flex;
  align-items: center;

  gap: 10px;

  padding: 13px;

  border: 1px solid rgba(40, 45, 55, 0.08);
  border-radius: 7px;

  background: rgba(255, 255, 255, 0.45);
}

.legend-color {
  width: 12px;
  height: 12px;

  flex-shrink: 0;

  border-radius: 50%;
}

.legend-color.correct {
  background: #4f9b62;
}

.legend-color.partial {
  background: #d4a83f;
}

.legend-color.wrong {
  background: #b95b55;
}

.legend-item strong {
  display: block;

  margin-bottom: 2px;

  color: var(--navy-800);

  font-family: 'Nunito', sans-serif;
  font-size: 13px;
}

.legend-item span:last-child {
  display: block;

  color: #827968;

  font-family: 'Nunito', sans-serif;
  font-size: 11px;
  line-height: 1.4;
}


/* FOOTER */

.about-footer {
  display: flex;
  align-items: center;

  gap: 15px;

  margin-top: 30px;

  color: #978b77;

  font-family: 'Cinzel', serif;
  font-size: 10px;

  letter-spacing: 1px;
  text-align: center;
}

.footer-line {
  flex: 1;

  height: 1px;

  background: rgba(184, 139, 47, 0.25);
}


/* TABLET */

@media (max-width: 768px) {

  .about-page {
    padding: 30px 15px 50px;
  }

  .about-card {
    padding: 45px 35px;
  }

  h1 {
    font-size: 34px;
  }

  .result-legend {
    grid-template-columns: 1fr;
  }
}


/* MÓVIL */

@media (max-width: 480px) {

  .about-page {
    padding: 20px 10px 40px;
  }

  .about-card {
    padding: 40px 20px;
  }

  h1 {
    font-size: 28px;
  }

  .eyebrow {
    font-size: 10px;
    letter-spacing: 2px;
  }

  .intro {
    font-size: 14px;
  }

  .about-section {
    grid-template-columns: 1fr;

    gap: 12px;

    padding: 25px 0;
  }

  .section-icon {
    width: 36px;
    height: 36px;

    font-size: 15px;
  }

  h2 {
    font-size: 18px;
  }

  .about-section p {
    font-size: 14px;
  }

  .about-footer {
    font-size: 8px;
  }
}

</style>
