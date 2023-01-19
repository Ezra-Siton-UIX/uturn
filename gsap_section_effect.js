//gsap.set("[image_wrapper] div:nth-child(1)", {opacity: 1});

const sections = gsap.utils.toArray("[feature]");

gsap.set(`[image_wrapper] div:not(:first-child)`, {
  opacity: 0
});

sections.forEach(function (section, index) {
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    markers: true,
    onToggle: (self) => {
      //animate respective list item based on active state
      console.log(self);
      gsap.to(`[image_wrapper] div:nth-child(${index + 1})`, {
        duration: 0,
        opacity: self.isActive ? 1 : 0, // if active then 1 or else 0.5
        zIndex: self.isActive ? 1 : -1, // if active then 1 or else 0.5
        y: self.isActive ? -20 : 20
      });
    }
  });
});
