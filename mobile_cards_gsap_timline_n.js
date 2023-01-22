let is_mobile = window.innerWidth < 991;

window.addEventListener("resize", function (event) {
  is_mobile = window.innerWidth < 991;
});

function cards_mobile() {
  if (is_mobile) {
    let trigger_element_mobile = document.querySelector(
      `[trigger_element="cards"]`
    );

    let inner_progress_mobile_vertical = document.querySelector(
      "[inner_progress_mobile='vertical']"
    );
    let inner_progress_mobile_horizontal = document.querySelector(
      "[inner_progress_mobile='horizontal']"
    );

    let how_it_works_bag_mobile = document.querySelector(
      "[how_it_works_bag='horizontal']"
    );

    const sections_mobile = gsap.utils.toArray(
      "[animate_section_m]:not(:first-child)"
    );

    // update your variables
    let end_animation_mobile =
      trigger_element_mobile.offsetHeight * sections_mobile.length;

    window.addEventListener("resize", function (event) {
      end_animation_mobile =
        trigger_element_mobile.offsetHeight * sections_mobile.length;
    });

    let tl_mobile = gsap.timeline({
      // yes, we can add it to an entire timeline!
      scrollTrigger: {
        trigger: trigger_element_mobile,
        pin: true, // pin the trigger element while active
        start: "top 62", // when the top of the trigger hits the top of the viewport
        end: end_animation_mobile, // end after scrolling 500px beyond the start
        scrub: 0, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 1],
          directional: true,
          duration: { min: 0.2, max: 0.6 },
          ease: "Power1.easeOut",
          delay: 0
        },
        onUpdate: (self) => {
          console.log(self.progress);

          /* 1.2 beacuse we want to finish on 80% (Dot number 5) */
          inner_progress_mobile_vertical.style.height = `${
            self.progress * 100 * 1.2
          }%`;
          inner_progress_mobile_horizontal.style.width = `${
            self.progress * 100
          }%`;

          /* BAG animation horizontal ==>  */
          if (self.progress < 0.96 && self.progress > 0.02) {
            how_it_works_bag_mobile.style.left = `calc(${
              self.progress * 100 * 1
            }% - 20px)`;
          }

          const offset = 4;
          //console.log(self.progress);
          if (self.progress >= (1 / offset) * 0) {
            removeClass_mobile([2, 3, 4, 5], "dot");
            removeClass_mobile([2, 3, 4, 5], "dot_horizontal");
          }
          if (self.progress >= (1 / offset) * 1) {
            addClass_mobile(2, "dot");
            addClass_mobile(2, "dot_horizontal");
          }
          if (self.progress >= (1 / offset) * 2) {
            addClass_mobile(3, "dot");
            addClass_mobile(3, "dot_horizontal");
          }
          if (self.progress >= (1 / offset) * 3) {
            addClass_mobile(4, "dot");
            addClass_mobile(4, "dot_horizontal");
          }
          if (self.progress >= (1 / offset) * 4) {
            addClass_mobile(5, "dot");
            addClass_mobile(5, "dot_horizontal");
          }
        }
      }
    });

    //gsap.set("[animate_section]", {zIndex: (i, target, targets) => targets.length - i});

    sections_mobile.forEach((section, i) => {
      console.log(i);
      /* "this" iterate elements */
      /* section 1 */
      // add animations and labels to the timeline
      tl_mobile
        .from(section, {
          y: "100%",
          ease: "none"
        })
        .from(
          i === 0 ? "[animate_section_m]:first-child" : sections_mobile[i - 1],
          {
            autoAlpha: "100%",
            ease: "Power1.easeOut"
          },
          "<"
        );
    }); /* end for each */

    function removeClass_mobile(arraindex, item_name) {
      arraindex.forEach((i) => {
        let item = document.querySelector(
          `[dots] div:nth-child(${i}) [${item_name}]`
        );
        if (item !== null) {
          item.classList.remove("active");
        }
      });
    }

    function addClass_mobile(index, item_name) {
      let item = document.querySelector(
        `[dots] div:nth-child(${index}) [${item_name}]`
      );

      if (item !== null) {
        item.classList.add("active");
      }
    }
  }
}
 
cards_mobile();
