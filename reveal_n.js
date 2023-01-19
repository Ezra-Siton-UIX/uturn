document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  /* ## Key Features Animation ## */
  function animateFrom(elem, direction) {
    direction = direction || 1;

    var x = 0,
      y = direction * 100;
    if (elem.hasAttribute("gs_reveal_fromLeft")) {
      x = -100;
      y = 0;
    } else if (elem.hasAttribute("gs_reveal_fromRight")) {
      x = 100;
      y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(
      elem,
      { x: x, y: y, autoAlpha: 0 },
      {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
      }
    );
  }

  function hide(elem) {
    gsap.set(elem, { autoAlpha: 0 });
  }
  let gs_reveal = gsap.utils.toArray("[gs_reveal]");

  gs_reveal.forEach(function (elem) {
    if (window.innerWidth < 768) {
      return; // assure that the element is hidden when scrolled into view
    }

    hide(elem);
    ScrollTrigger.create({
      trigger: elem,
      once: false,
      markers: false,
      onEnter: function () {
        animateFrom(elem);
      },
      onEnterBack: function () {
        animateFrom(elem, -1);
      },
      onLeave: function () {
        hide(elem);
      } // assure that the element is hidden when scrolled into view
    });
  });

  /* numbers */

  // selector text (returns the raw elements wrapped in an Array)
  let counters = gsap.utils.toArray("[counter]");

  counters.forEach(function (elem) {
    let to_value = elem.innerHTML;
    ScrollTrigger.create({
      trigger: "[count_up_trigger]",
      once: false,
      start: "-15% bottom",
      markers: false,
      onEnter: function () {
        console.log("on enter to countup");
        countup(elem, to_value);
      },
      onEnterBack: function () {
        console.log("on enter to countup");
        countup(elem, to_value);
      },
      onLeave: function () {
        console.log("onLeave to countup");
        console.log("leave");
      } // assure that the element is hidden when scrolled into view
    });
  });
  let counter_duration = 2;

  function countup(elem, to_value) {
    gsap.from(elem, { textContent: 0 });

    gsap.to(elem, {
      textContent: to_value,
      autoAlpha: 1,
      duration: counter_duration,
      ease: Power1.easeOut,
      onUpdate: function () {
        this.targets()[0].innerHTML = numberWithCommas(
          Math.ceil(this.targets()[0].textContent)
        );
      }
    });
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}); /* END DOMContentLoaded */
