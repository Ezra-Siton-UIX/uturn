gsap.registerPlugin(ScrollTrigger);

let screen_width = window.screen.width; /* 1920 for example */

window.addEventListener("resize", function (event) {
  // update your variables
  screen_width = window.screen.width; /* 1920 for example */
});

function removeClass_value(arraindex, item_name) {
  arraindex.forEach((i) => {
    let item = document.querySelector(
      `[dots_values_wrapper] [${item_name}]:nth-child(${i})`
    );
    if (item !== null) {
      item.classList.remove("active");
    }
  });
}

function addClass_value(index, item_name) {
  let item = document.querySelector(
    `[dots_values_wrapper] [${item_name}]:nth-child(${index})`
  );
  if (item !== null) {
    item.classList.add("active");
  }
}

let m_verrical_scroll_wrapper_trigger = document.querySelector(
  `[m_verrical_scroll_wrapper]`
);

let m_slider_wrapper = document.querySelector(`[m_slider_wrapper]`);

let end_animation_v_scroll =
  m_verrical_scroll_wrapper_trigger.offsetHeight * 3.5;

let tl_slider_how_it_works = gsap.timeline({
  // yes, we can add it to an entire timeline!
  scrollTrigger: {
    trigger: m_verrical_scroll_wrapper_trigger,
    start: "top 6%",
    end: `+=${end_animation_v_scroll}`,
    scrub: 0.5,
    pin: true,
    onEnter: function () {
      console.log("enter");
    },
    onUpdate: (self) => {
      console.log("dot_mobile_value", self.progress);

      const offset = 6;
      //console.log(self.progress);
      if (self.progress >= (1 / offset) * 0) {
        removeClass_value([2, 3, 4, 5, 6], "dot_mobile_value");
      }
      if (self.progress >= (1 / offset) * 1) {
        addClass_value(2, "dot_mobile_value");
      }
      if (self.progress >= (1 / offset) * 2) {
        addClass_value(3, "dot_mobile_value");
      }
      if (self.progress >= (1 / offset) * 3) {
        addClass_value(4, "dot_mobile_value");
      }
      if (self.progress >= (1 / offset) * 4) {
        addClass_value(5, "dot_mobile_value");
      }
      if (self.progress >= (1 / offset) * 5) {
        addClass_value(6, "dot_mobile_value");
      }
    }
  }
});

tl_slider_how_it_works
  .to(m_slider_wrapper, {
    x: "0",
    duration: 0.02,
    ease: "none"
  })
  .to(m_slider_wrapper, {
    x: "-355vw",
    ease: "none"
  });
