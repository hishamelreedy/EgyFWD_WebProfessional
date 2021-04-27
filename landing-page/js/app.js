/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const menulinks = document.getElementById('navbar__list');
const menulinks_childs=document.getElementById('navbar__list').childNodes;
const pageoffset = 440;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const view = {
    init: function (){
        this.initmenu('#navbar__list');
        //this.active("sections");
    },
initmenu: (menuElement) => {
    const menu = document.querySelector(menuElement);
    //I can Use Let Section of Sections to iterate but I like to use loop like I do in C++
    //It is more easily this way to handle
    for (let sectioniterator=0;sectioniterator<sections.length;sectioniterator++){
        const menuLink = document.createElement('li');
        // Scroll to section on link click
        menuLink.innerHTML = 
            `<a href="#${sections[sectioniterator].id}" class="menu__link" id="i${sections[sectioniterator].id}">
                ${sections[sectioniterator].querySelector('h2').innerText}
            </a>`
        menu.appendChild(menuLink);
    }
},
}

// Build menu 
view.init();

/**
 * End Main Functions
 * Begin Events
 * 
*/
//Toggle Active state between sections by scrolling event
function toggleActiveStateByScroll() {
  const navLinks = document.querySelectorAll(".menu__link");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            for (const section of sections) {
              //It is better use this loop instead of iterator in this case 
              section.classList.remove("active");
            }
            for (const navLink of navLinks) {
              navLink.classList.remove("active");
            }
            entry.target.classList.add("active");
            //add active class to navigation link
            const equivalentNavLink = document.querySelector(
              `[href="#${entry.target.id}"]`
            );
            equivalentNavLink.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0% 0% -33% 0%" }
    );

    //Observe sections
    for (const section of sections) {
      observer.observe(section);
    }
  }
}
window.addEventListener("scroll", toggleActiveStateByScroll);

//Function to respond when clicking on menu link to smooth scroll to the section
// Scroll to section on link click
menulinks.addEventListener('click', (e) => {
  // prevent a(href) default behaviour
  e.preventDefault();
  console.dir(e.target.nodeName)
  if (e.target.nodeName == 'A') {
      for (let section of sections) {
          if (e.target.outerText == section.attributes['data-nav'].nodeValue) {
              window.scrollTo({
                  top: section.offsetTop,
                  left: section.offsetLeft,
                  behavior: 'smooth'
              })
          }
      }
  }
})