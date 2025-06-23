// script.js
document.addEventListener("DOMContentLoaded", function () {
  // TOGGLE NAVBAR
  function handleToggleButtons() {
    const toggleButtons = document.querySelectorAll('[data-toggle]');

    toggleButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const targetSelector = button.getAttribute('data-toggle');
        const targetElement = document.querySelector(targetSelector);

        const allTargets = document.querySelectorAll(targetSelector);
        allTargets.forEach(function (target) {
          target.classList.toggle("show");
        });

        const buttonsWithSameToggle = document.querySelectorAll('[data-toggle="' + targetSelector + '"]');
        buttonsWithSameToggle.forEach(function (btn) {
          btn.classList.toggle("show");
        });
      });
    });
  }
  handleToggleButtons();

  // TRANSITION ELEMENT
  function handleTransitionElements() {
    const transitionElements = document.querySelectorAll('[data-view]');
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();

      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    function handleTransition() {
      transitionElements.forEach(function (element) {
        const dataViewClasses = element.getAttribute('data-view').split(' ');

        if (isInViewport(element)) {
          dataViewClasses.forEach(function (dataViewClass) {
            element.classList.add(dataViewClass);
          });
        }
      });
    }

    handleTransition();
    window.addEventListener("scroll", handleTransition);
  }
  handleTransitionElements();

  // PROGRESS
  function ProgressBar() {
    // Function to get all elements with the data-width attribute
    const widthElements = document.querySelectorAll('[data-width]');

    // Function to check if an element is in the viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // Function to handle the width of elements based on data-width when in the viewport
    function handleWidth() {
      widthElements.forEach(function (element) {
        // Get the value of data-width from the element
        const widthValue = element.getAttribute('data-width');

        // Set the width of the element based on the data-width value only if the element is in the viewport
        if (widthValue && isInViewport(element)) {
          element.style.width = widthValue;
          element.style.paddingRight = 10 + 'px';
          element.textContent = widthValue;
        }
      });
    }

    // Call the handleWidth function when the page is loaded and scrolled
    handleWidth();
    window.addEventListener("scroll", handleWidth);
  }
  ProgressBar();

  // BACK TO TOP
  function handleBackToTop() {
    const backToTopButton = document.querySelector('[data-backtop]');

    function handleBackToTopVisibility() {
      if (window.scrollY >= 200) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    }
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    window.addEventListener('scroll', handleBackToTopVisibility);
    backToTopButton.addEventListener('click', scrollToTop);
    handleBackToTopVisibility();
  }
  handleBackToTop();

});