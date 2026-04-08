"use strict";

// theme toggle
const themeBtn = document.querySelector("[data-theme-btn]");
const storedTheme = localStorage.getItem("theme");

if (storedTheme) {
  document.body.setAttribute("data-theme", storedTheme);
}

themeBtn.addEventListener("click", function () {
  const currentTheme = document.body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const pageNames = Array.from(pages, function (page) {
  return page.dataset.page;
});
const defaultPage = pageNames[0];

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const getPageNameFromHash = function () {
  const hash = window.location.hash.substring(1).toLowerCase();

  return pageNames.includes(hash) ? hash : defaultPage;
};

const getActivePageName = function () {
  const activePage = document.querySelector("[data-page].active");

  return activePage ? activePage.dataset.page : null;
};

// function to activate a page by name
const activatePage = function (pageName) {
  const nextPage = pageNames.includes(pageName) ? pageName : defaultPage;

  if (nextPage === getActivePageName()) {
    return;
  }

  for (let i = 0; i < pages.length; i++) {
    const isActivePage = nextPage === pages[i].dataset.page;

    pages[i].classList.toggle("active", isActivePage);
    navigationLinks[i].classList.toggle("active", isActivePage);
  }

  window.scrollTo(0, 0);
};

const syncPageWithHash = function () {
  activatePage(getPageNameFromHash());
};

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = this.textContent.trim().toLowerCase();

    activatePage(pageName);

    if (window.location.hash.substring(1).toLowerCase() !== pageName) {
      history.pushState({ page: pageName }, "", `#${pageName}`);
    }
  });
}

// hash-based routing: activate page from URL hash on load
syncPageWithHash();

// handle browser back/forward and manual hash changes
window.addEventListener("popstate", syncPageWithHash);
window.addEventListener("hashchange", syncPageWithHash);
