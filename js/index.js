console.clear();
// modal related changes

try {
  var modal = document.getElementById("myModal");

  // Get all buttons that open the modal
  var buttons = document.getElementsByClassName("modalBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // Function to open the modal
  function openModal() {
      modal.style.display = "block";
  }

  // Function to close the modal
  function closeModal() {
      modal.style.display = "none";
  }

  // When any button with class myBtn is clicked, open the modal
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = openModal;
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = closeModal;

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          closeModal();
      }
  }
} catch (error) {
  console.log("An error occurred:", error);
}




// slider chamges
      var slider = document.querySelector(".slider");

      var allImages = Array.from(document.querySelectorAll(".slider .image"));
      var state = {
        photo: 0,
        animationActive: false,
      };

      var elStatus = Array.from(document.querySelectorAll(".slider .stat"));
      elStatus.forEach((stat) => {
        stat.addEventListener("click", () => {
          if (!state.animationActive) {
            if (stat.dataset.key != state.photo) {
              state.animationActive = true;
              slide(stat.dataset.key, state.photo);
            }
          }
        });
      });

      // handling swipe
      var mc = new Hammer(slider);
      mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));
      // listen to events...
      mc.on("panup pandown", function (ev) {
        if (!state.animationActive) {
          state.animationActive = true;
          var dir = 1;
          if (ev.type == "panup") {
            dir = -1;
          }
          var next = state.photo + dir;
          var current = state.photo;
          slide(next, current);
        }
      });

      var button = document.getElementById("test");
      button.addEventListener("click", function(e) {
        e.stopPropagation();
        if (!state.animationActive) {
          state.animationActive = true;
          // var dir = Math.sign(e.deltaY);
          var current = state.photo;
          var next = state.photo + 1;
          // console.log(next, current, dir, e)
          slide(next, current);
        }
      });

      // handling mousewhell
      slider.addEventListener("wheel", function (e) {
        e.stopPropagation();
        if (!state.animationActive) {
          state.animationActive = true;
          var dir = Math.sign(e.deltaY);
          var next = state.photo + dir;
          var current = state.photo;
          slide(next, current);
        }
      });

      document.onkeydown = function (e) {
        if (!state.animationActive) {
          state.animationActive = true;
          switch (e.keyCode) {
            case 37:
              // left
              var next = state.photo - 1;
              var current = state.photo;
              slide(next, current);
              break;
            case 38:
              // up
              var next = state.photo + 1;
              var current = state.photo;
              slide(next, current);
              break;
            case 39:
              // right
              var next = state.photo + 1;
              var current = state.photo;
              slide(next, current);
              break;
            case 40:
              // down
              var next = state.photo - 1;
              var current = state.photo;
              slide(next, current);
              break;
          }
        }
      };

      function slide(toSlide, currentSlide) {
        //console.log('slide: to/cur '+toSlide+' / '+currentSlide )
        if (toSlide > currentSlide) {
          var direction = "down";
        }
        if (toSlide < currentSlide) {
          var direction = "up";
        }
        var ele = document.querySelector(
          '.slider .image[data-key="' + currentSlide + '"]'
        );
        if (toSlide < 0) {
          toSlide = allImages.length - 1;
        }
        if (toSlide > allImages.length - 1) {
          toSlide = 0;
        }
        nextPhoto = toSlide;
        //console.log(' nextPhoto: '+nextPhoto +' l '+allImages.length)

        currentTextEle = document.querySelector(" .slider .text .current ");
        nextTextEle = document.querySelector(
          ' .slider .text div[data-key="' + toSlide + '"] '
        );
        var textOutToTop = anime({
          targets: currentTextEle,
          translateX: "110vh",
          duration: 700,
          easing: "linear",
          autoplay: false,
          complete: function (anim) {
            currentTextEle.classList.remove("current");
            nextTextEle.classList.add("current");
          },
        });
        var textOutToBottom = anime({
          targets: currentTextEle,
          translateX: "-110vh",
          duration: 700,
          easing: "linear",
          autoplay: false,
          complete: function (anim) {
            currentTextEle.classList.remove("current");
            nextTextEle.classList.add("current");
          },
        });
        var textInFromTop = anime({
          targets: nextTextEle,
          translateX: [
            { value: "110vh", duration: 1 },
            { value: 0, duration: 700 },
          ],
          opacity: [
            { value: 0, duration: 1 },
            { value: 0.8, duration: 700 },
          ],
          scaleX: [
            { value: 1.7, duration: 1 },
            { value: 1, duration: 200, delay: 500 },
          ],
          easing: "easeInQuad",
          autoplay: false,
        });
        var textInFromBottom = anime({
          targets: nextTextEle,
          translateX: [
            { value: "-80vh", duration: 1 },
            { value: 0, duration: 700 },
          ],
          opacity: [
            { value: 0, duration: 1 },
            { value: 0.8, duration: 700 },
          ],
          scaleX: [
            { value: 1.7, duration: 1 },
            { value: 1, duration: 400, delay: 300 },
          ],
          easing: "easeInQuad",
          autoplay: false,
        });

        var eleNext = document.querySelector(
          '.slider .image[data-key="' + toSlide + '"]'
        );
        var outToBottomAni = anime({
          targets: ele,
          translateY: "110vh",
          duration: 700,
          easing: "linear",
          autoplay: false,
          complete: function (anim) {
            ele.classList.remove("current");
            var resetAni = anime({
              targets: ele,
              translateY: 0,
              duration: 1,
              autoplay: false,
              scale: 1.4,
              opacity: 0,
            });
            resetAni.play();
          },
        });
        var outToTopAni = anime({
          targets: ele,
          translateY: "-110vh",
          duration: 700,
          easing: "linear",
          autoplay: false,
          complete: function (anim) {
            ele.classList.remove("current");
            var resetAni = anime({
              targets: ele,
              translateY: 0,
              duration: 1,
              autoplay: false,
              scale: 1.4,
              opacity: 0,
            });
            resetAni.play();
          },
        });
        var inAni = anime({
          targets: eleNext,
          translateY: 0,
          scale: 1,
          opacity: 1,
          duration: 1300,
          easing: "easeOutQuart",
          autoplay: false,
          complete: function (anim) {
            eleNext.classList.add("current");
            state.animationActive = false;
          },
        });
        inAni.play();
        if (direction == "up") {
          outToBottomAni.play();
          textOutToBottom.play();
          textInFromTop.play();
        }
        if (direction == "down") {
          outToTopAni.play();
          textOutToTop.play();
          textInFromBottom.play();
        }
        state.photo = toSlide;
        var statusPoint = document.querySelector(".slider .point");
        statusPoint.dataset.current = toSlide;
      }

      var allImg = document.querySelectorAll(".slider .image:not(.current)");
      var init = anime({
        targets: allImg,
        scale: 1.4,
      });