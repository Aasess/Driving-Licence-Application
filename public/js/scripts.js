/*!
 * Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  //  Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  //get the toast message
  const toastMessage = document.querySelector(".toast-msg");

  if (toastMessage) {
    // if toast message is present then after 3sec set `display` to none
    setTimeout(() => {
      toastMessage.style.display = "none";
    }, 3000);
  }

  const slots = document.querySelectorAll(".slot");

  if (slots) {
    slots.forEach((slot) => {
      slot.addEventListener("click", async function () {
        const date = this.getAttribute("data-date");
        const time = this.getAttribute("data-time");
        const appointmentId = this.getAttribute("data-id");
        const testType = this.getAttribute("data-type");

        try {
          const response = await fetch("/available-slots", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ date, time, appointmentId, testType }),
          });

          if (response.ok) {
            const responseData = await response.json();

            // Check if the booking was successful
            if (responseData.success) {
              // Update the page or show a success message as needed
              const successDivElement = document.createElement("div");

              successDivElement.textContent = "Appointment booked sucessfully.";
              successDivElement.classList.add(
                "bg-success",
                "text-white",
                "p-3",
                "text-center",
                "toast-msg"
              );
              slot.appendChild(successDivElement);

              setTimeout(() => {
                refreshPage();
              }, 1000);
            } else {
              // Handle the case where booking failed
              console.error(
                "Failed to book appointment:",
                responseData.message
              );
            }
          } else {
            // Handle non-OK response status
            console.error("Failed to book appointment:", response.statusText);
          }
        } catch (error) {
          // Handle fetch error
          console.error("Error during fetch:", error.message);
        }
      });
    });
  }

  const adminSlots = document.querySelectorAll(".admin-slot__not-available");

  if (adminSlots) {
    adminSlots.forEach((slot) => {
      slot.addEventListener("click", async function () {
        const date = this.getAttribute("data-date");
        const time = this.getAttribute("data-time");

        try {
          const response = await fetch("/appointment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ date, time }),
          });

          if (response.ok) {
            const responseData = await response.json();

            // Check if the booking was successful
            if (responseData.success) {
              // Update the page or show a success message as needed
              const successDivElement = document.createElement("div");

              successDivElement.textContent =
                "Appointment made available to user successfully.";
              successDivElement.classList.add(
                "bg-success",
                "text-white",
                "p-3",
                "text-center",
                "toast-msg"
              );
              slot.appendChild(successDivElement);

              setTimeout(() => {
                refreshPage();
              }, 1000);
            } else {
              // Handle the case where booking failed
              console.error(
                "Failed to make appointment available:",
                responseData.message
              );
            }
          } else {
            // Handle non-OK response status
            console.error("Failed to make appointment:", response.statusText);
          }
        } catch (error) {
          // Handle fetch error
          console.error("Error during fetch:", error.message);
        }
      });
    });
  }

  // Function to refresh the page or update the UI
  function refreshPage() {
    location.reload();
  }
});
