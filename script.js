const tulips = document.querySelectorAll(".tulip");
const effects = document.getElementById("effects");

tulips.forEach((tulip) => {
  tulip.addEventListener("click", (event) => {
    if (tulip.dataset.animating === "true") return;

    tulip.dataset.animating = "true";

    explodeTulip(
      event.clientX,
      event.clientY,
      tulip
    );
  });
});


function explodeTulip(x, y, tulip) {

  // --------------------------------
  // 1. CREATE PETAL EXPLOSION
  // --------------------------------

  createPetalExplosion(x, y);

  // --------------------------------
  // 2. CREATE SPARKLE EXPLOSION
  // --------------------------------

  createSparkles(x, y, 35);

  // --------------------------------
  // 3. CREATE SMALL HEARTS
  // --------------------------------

  setTimeout(() => {
    createMiniHearts(x, y, 12);
  }, 100);

  // --------------------------------
  // 4. REMOVE THE ORIGINAL TULIP
  // --------------------------------

  tulip.style.visibility = "hidden";

  // --------------------------------
  // 5. BIG HEART APPEARS
  // --------------------------------

  setTimeout(() => {
    createHeart(x, y);
  }, 180);


  // --------------------------------
  // 6. RESPAWN TULIP
  // --------------------------------

  setTimeout(() => {

    tulip.style.visibility = "visible";

    // Reset animation
    tulip.classList.remove("respawning");

    void tulip.offsetWidth;

    // Start smooth respawn
    tulip.classList.add("respawning");

    setTimeout(() => {
      tulip.classList.remove("respawning");
      tulip.dataset.animating = "false";
    }, 1200);

  }, 1200);
}


/* =================================
   PETAL EXPLOSION
================================= */

function createPetalExplosion(x, y) {

  const colors = [
    "#ff9cc7",
    "#ff6fae",
    "#ff3f89",
    "#f23d83",
    "#ffb2d3",
    "#d90062"
  ];

  const petalCount = 18;

  for (let i = 0; i < petalCount; i++) {

    const petal =
      document.createElement("div");

    petal.className =
      "exploding-petal";

    const angle =
      (Math.PI * 2 / petalCount) * i +
      (Math.random() - 0.5) * 0.5;

    const distance =
      70 + Math.random() * 110;

    const dx =
      Math.cos(angle) * distance;

    const dy =
      Math.sin(angle) * distance;

    const size =
      8 + Math.random() * 14;

    petal.style.left = `${x}px`;
    petal.style.top = `${y}px`;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.5}px`;

    petal.style.background =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];

    petal.style.setProperty(
      "--dx",
      `${dx}px`
    );

    petal.style.setProperty(
      "--dy",
      `${dy}px`
    );

    petal.style.setProperty(
      "--rotation",
      `${Math.random() * 720 - 360}deg`
    );

    petal.style.animationDelay =
      `${Math.random() * 0.08}s`;

    effects.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 1100);
  }
}


/* =================================
   HEART
================================= */

function createHeart(x, y) {

  const heart =
    document.createElement("div");

  heart.className = "heart";

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  effects.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1800);
}


/* =================================
   SPARKLES
================================= */

function createSparkles(x, y, amount) {

  for (let i = 0; i < amount; i++) {

    const sparkle =
      document.createElement("div");

    sparkle.className =
      "sparkle";

    const angle =
      Math.random() *
      Math.PI *
      2;

    const distance =
      50 +
      Math.random() * 160;

    const offsetX =
      Math.cos(angle) *
      distance;

    const offsetY =
      Math.sin(angle) *
      distance;

    sparkle.style.left =
      `${x}px`;

    sparkle.style.top =
      `${y}px`;

    sparkle.style.setProperty(
      "--x",
      `${offsetX}px`
    );

    sparkle.style.setProperty(
      "--y",
      `${offsetY}px`
    );

    const size =
      3 +
      Math.random() * 8;

    sparkle.style.width =
      `${size}px`;

    sparkle.style.height =
      `${size}px`;

    effects.appendChild(
      sparkle
    );

    setTimeout(() => {
      sparkle.remove();
    }, 1100);
  }
}


/* =================================
   FLOATING HEARTS
================================= */

function createMiniHearts(x, y, amount) {

  for (let i = 0; i < amount; i++) {

    const miniHeart =
      document.createElement("div");

    miniHeart.className =
      "mini-heart";

    miniHeart.textContent = "♥";

    const angle =
      Math.random() *
      Math.PI *
      2;

    const distance =
      70 +
      Math.random() *
      130;

    miniHeart.style.left =
      `${x}px`;

    miniHeart.style.top =
      `${y}px`;

    miniHeart.style.setProperty(
      "--x",
      `${Math.cos(angle) * distance}px`
    );

    miniHeart.style.setProperty(
      "--y",
      `${Math.sin(angle) * distance}px`
    );

    miniHeart.style.animationDelay =
      `${Math.random() * 0.2}s`;

    effects.appendChild(
      miniHeart
    );

    setTimeout(() => {
      miniHeart.remove();
    }, 1700);
  }
}
