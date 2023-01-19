document.addEventListener("DOMContentLoaded", function (event) {
  //the event occurred

  /* Shapes */
  const not_stage = true;

  function removeClass(arraindex, item_name) {
    arraindex.forEach((i) => {
      let item = document.querySelector(
        `[step_div_wrap]:nth-child(${i}) [${item_name}]`
      );
      if (item !== null) {
        item.classList.remove("active");
      }
    });
  }

  function addClass(index, item_name) {
    let item = document.querySelector(
      `[step_div_wrap]:nth-child(${index}) [${item_name}]`
    );
    if (item !== null) {
      item.classList.add("active");
    }
  }

  gsap.registerPlugin(ScrollTrigger);
  var svgContainer = document.getElementById("svgContainer");

  var loadAnimation = bodymovin.loadAnimation({
    container: document.querySelector("[scrolltrigger_svgContainer]"), // Required
    path:
      "https://uploads-ssl.webflow.com/6387ba2b5e5c1278d6b5ec3b/63c9210e064c5a51b1a88561_how_it_works_new_3.json",

    renderer: "svg", // Required
    loop: false, // Optional
    autoplay: false, // Optional
    name: "uturn how it works" // Name for future reference. Optional.
  });

  const sections = gsap.utils.toArray("[animate_section]");

  const speed = 2.3;

  let triggerElement = document.querySelector("[scrolltrigger_triggerElement]");
  let inner_progress = document.querySelector("[inner_progress]");
  let how_it_works_bag_desktop = document.querySelector(
    "[how_it_works_bag='vertical']"
  );
  let trigger_offsetTop = triggerElement.getBoundingClientRect().top;
  let end_animation = triggerElement.offsetHeight * sections.length * speed;

  window.addEventListener("resize", function (event) {
    // update your variables
    end_animation = triggerElement.offsetHeight * sections.length * speed;
    trigger_offsetTop = triggerElement.getBoundingClientRect().top;
  });

  let tl_sections = gsap.timeline({
    // yes, we can add it to an entire timeline!
    scrollTrigger: {
      trigger: triggerElement,

      snap: {
        snapTo: [0, 0.01, 0.25, 0.5, 0.75, 1],
        directional: true,
        inertia: true,
        duration: { min: 0.2, max: 0.5 },

        delay: 0
      },

      pin: true, // pin the trigger element while activelength
      start: "top top", // when the top of the trigger hits the top of the viewport
      end: "+=" + end_animation, // end after scrolling 500px beyond the start
      scrub: 0.2,
      markers: false,
      onEnter: function () {
        console.log("onEnter to how it works");
      },
      onUpdate: (self) => {
        let currentFrame = Math.floor(
          self.progress * (loadAnimation.totalFrames - 1)
        );
        console.log(self.progress);
        /* control loadAnimation */
        loadAnimation.goToAndStop(currentFrame, true);
        /* 1.2 beacuse we want to finish on 80% (Dot number 5) */
        inner_progress.style.height = `${self.progress * 100 * 1}%`;
        /* BAG animation */
        let offset_bag = 0.95;

        if (self.progress < 0.5) {
          /* slow delay on station 2 */
          how_it_works_bag_desktop.style.top = `calc(${
            self.progress * 100 * 0.95
          }%)`;
        }
        if (self.progress > 0.5) {
          how_it_works_bag_desktop.style.top = `calc(${
            self.progress * 100 * 0.935
          }%)`;
        }

        how_it_works_bag_desktop.style.top = `calc(${
          self.progress * 100 * 0.95
        }%)`;

        addClass(1, "circle");
        addClass(1, "step_menu_title");

        const divide_by = 4.15;

        if (self.progress >= (1 / divide_by) * 0) {
          removeClass([2, 3, 4, 5], "circle");
          /* labels */
          removeClass([2, 3, 4, 5], "step_menu_title");
        }
        if (self.progress >= (1 / divide_by) * 1) {
          addClass(2, "circle");
          addClass(2, "step_menu_title");
        }
        if (self.progress >= (1 / divide_by) * 2) {
          addClass(3, "circle");
          addClass(3, "step_menu_title");
        }
        if (self.progress >= (1 / divide_by) * 3) {
          addClass(4, "circle");
          addClass(4, "step_menu_title");
        }
        if (self.progress >= (1 / divide_by) * 4) {
          addClass(5, "circle");
          addClass(5, "step_menu_title");
        }
      }
    }
  });

  sections.forEach((section, i) => {
    let ease_type = "Power1.easeOut";
    let animation_duration = 0.3;
    /* "this" iterate elements */
    section.h1 = section.querySelector(`[animate_title]`);
    section.description = section.querySelector(
      `[scrollTrigger_txt_description]`
    );
    let isLastSection = sections.length - 1 === i;
    let isFirstSection = i === 0;
    /* section 1 */
    // add animations and labels to the timeline
    /* ENTER ANINATION (Disable first section animation) */
    tl_sections
      .from(section.h1, {
        y: isFirstSection ? 0 : 5,
        autoAlpha: isFirstSection ? 1 : 0,
        ease: ease_type,
        duration: animation_duration
      })
      .from(
        section.description,
        {
          y: isFirstSection ? 0 : 5,
          autoAlpha: isFirstSection ? 1 : 0,
          ease: ease_type,
          duration: animation_duration
        },
        "<"
      )
      .from(section, {
        x: 0,
        duration: 2.1
      })
      .from(section, {
        x: 0,
        duration: 2.1
      })
      .to(section.h1, {
        /* do not alpha the section if this is the last section */
        y: isLastSection ? 0 : -5,
        autoAlpha: isLastSection ? 1 : 0,
        duration: animation_duration,
        ease: ease_type
      })
      .to(
        section.description,
        {
          y: isLastSection ? 0 : -5,
          autoAlpha: isLastSection ? 1 : 0,
          duration: animation_duration,
          ease: ease_type
        },
        "<"
      )
      .to(section.description, {
        x: 0
      });
  }); /* end for each */

  /*### INNER MENU ###*/

  let links = gsap.utils.toArray("[step_div_wrap]");
  links.forEach((a, i) => {
    a.addEventListener("click", (e) => {
      //e.preventDefault();

      let scroll_to = 0;

      if (i == 0) {
        scroll_to = 0;
      }
      if (i == 1) {
        scroll_to = 0.25;
      }
      if (i == 2) {
        scroll_to = 0.5;
      }
      if (i == 3) {
        scroll_to = 0.75;
      }
      if (i == 4) {
        scroll_to = 1;
      }

      gsap.to(window, {
        duration: 1.5,
        scrollTo: trigger_offsetTop + end_animation * scroll_to,

        ease: "power2.out"
      });
    });
  });

  /* MEGA BUG - חייב להיות רשום end_2 אחרת ה לא עובד */
  tl_sections.pause("bug do not delete this line");
  /* Show the section after scrolltrigger loaded */
  document.querySelector(
    "[scrolltrigger_triggerElement='desktop']"
  ).style.opacity = "1";
});
