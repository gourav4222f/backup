// animations.js
gsap.from("#hero-title", { y: 50, opacity: 0, duration: 1 });
gsap.from("#hero-cta",   { y: 50, opacity: 0, delay: 0.5, duration: 1 });
gsap.to("section", {
  backgroundPosition: "50% 100%",
  ease: "none",
  scrollTrigger: { scrub: true }
});


gsap.utils.toArray("#story-carousel .snap-start").forEach((card, i) => {
    gsap.from(card, {
      x: 200, opacity: 0,
      scrollTrigger: {
        trigger: card,
        start: "left center",
        end: "right center",
        scrub: true
      }
    });
  });

  
  [1000, 250, 50].forEach((end, i) => {
    let obj = { val: 0 };
    gsap.to(obj, {
      val: end, duration: 2, scrollTrigger: {
        trigger: `#count-${i+1}`,
        start: "top 80%"
      },
      onUpdate: () => document.getElementById(`count-${i+1}`).textContent = Math.floor(obj.val)
    });
  });
  gsap.utils.toArray("[data-year]").forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0,
      scrollTrigger: { trigger: el, start: "top 90%" }
    });
  });

  
  document.querySelectorAll("[data-amt]").forEach(btn =>
    btn.addEventListener("click", e => document.getElementById("amount").value = e.target.dataset.amt)
  );
  document.querySelector("#donate form").addEventListener("submit", e => {
    e.preventDefault();
    gsap.fromTo("#donation-success", { scale: 0 }, { scale: 1, duration: 0.5, display: "block" });
  });

  
  setTimeout(() => document.getElementById("cta-banner").classList.remove("hidden"), 30000);


  