gsap.from(".produto-img", {
  rotation: -6,
  opacity: 0,
  duration: 1
});

gsap.to("#adicionar", {
  scale: 1.05,
  repeat: -1,
  yoyo: true,
  duration: .8
});
