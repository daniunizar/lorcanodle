<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');

:root {
  --navy-950: #0b1220;
  --navy-900: #111c31;
  --navy-800: #1b2b49;
  --navy-700: #263b60;

  --gold-300: #f0d58a;
  --gold-400: #d8b65c;
  --gold-500: #b88b2f;
  --gold-600: #8c681f;

  --ivory: #f8f3e7;
  --ivory-dark: #e8dfcc;

  --success: #3f9565;
  --success-bg: rgba(63, 149, 101, 0.20);

  --partial: #c79b38;
  --partial-bg: rgba(199, 155, 56, 0.22);

  --error: #bd554e;
  --error-bg: rgba(189, 85, 78, 0.20);
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  min-height: 100%;
}

body {
  font-family: 'Nunito', sans-serif;
  color: var(--navy-950);

  background:
    radial-gradient(
      circle at 15% 10%,
      rgba(255, 255, 255, 0.65),
      transparent 32%
    ),
    radial-gradient(
      circle at 85% 80%,
      rgba(184, 139, 47, 0.12),
      transparent 35%
    ),
    #ded4bd;
}

#app {
  min-height: 100vh;
}

nav {
  height: 64px;

  display: flex;
  align-items: center;
  gap: 25px;

  padding: 0 max(24px, calc((100vw - 1180px) / 2));

  background:
    linear-gradient(
      180deg,
      var(--navy-800),
      var(--navy-950)
    );

  border-bottom: 1px solid var(--gold-500);

  box-shadow:
    0 4px 18px rgba(0, 0, 0, 0.25);

  a {
    color: var(--gold-300);
    text-decoration: none;

    font-family: 'Cinzel', serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;

    transition: color 0.2s ease;

    &:hover {
      color: white;
    }

    &.router-link-exact-active {
      color: white;
    }
  }
}

@media (max-width: 600px) {
  nav {
    height: 54px;
    padding: 0 16px;

    a {
      font-size: 12px;
    }
  }
}
</style>
