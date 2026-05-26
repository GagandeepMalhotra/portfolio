/* ============================================================
   Portfolio – script.js
   All interactive behaviour extracted from index.html
   ============================================================ */

/* ----------------------------------------------------------
   Scroll-reveal: animate .pop-up elements when they enter
   the viewport
   ---------------------------------------------------------- */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.bottom >= 0 && rect.top - windowHeight <= 150;
}

function handleScroll() {
    const popElements = document.getElementsByClassName('pop-up');
    for (let i = 0; i < popElements.length; i++) {
        if (isElementInViewport(popElements[i])) {
            popElements[i].classList.add('animate');
        }
    }
}

window.addEventListener('scroll', handleScroll);

/* ----------------------------------------------------------
   Filter bar – toggle visibility on button click, hide on
   outside click
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.getElementById('filterButton');
    const filterBar    = document.getElementById('filterbar');

    if (filterButton && filterBar) {
        filterButton.addEventListener('click', function (event) {
            event.stopPropagation();
            filterBar.classList.toggle('show');
        });

        document.addEventListener('click', function (event) {
            if (!filterBar.contains(event.target)) {
                filterBar.classList.remove('show');
            }
        });
    }
});

/* ----------------------------------------------------------
   Project filtering by category / language
   ---------------------------------------------------------- */
function toggleAllCheckboxes(checkbox) {
    const checkboxes  = document.querySelectorAll("#checkboxes input[type='checkbox']");
    const selectAllText = document.getElementById('selectAllText');

    for (let i = 1; i < checkboxes.length; i++) {
        checkboxes[i].checked = checkbox.checked;
    }

    if (selectAllText) {
        selectAllText.textContent = checkbox.checked ? 'Deselect All' : 'Select All';
    }

    filterProjects();
    handleScroll();
}

function filterProjects() {
    const checkboxes        = document.querySelectorAll("#checkboxes input[type='checkbox']");
    const projectContainers = document.querySelectorAll('#projectContainer .project');
    const selectedCategories = [];

    for (let i = 1; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedCategories.push(checkboxes[i].value);
        }
    }

    for (let j = 0; j < projectContainers.length; j++) {
        const project         = projectContainers[j];
        const projectCategory = project.dataset.category || '';

        if (
            selectedCategories.length === 0 ||
            selectedCategories.some(category => projectCategory.includes(category))
        ) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    }

    handleScroll();
}

/* ----------------------------------------------------------
   Project sorting – by date or name, ascending / descending
   ---------------------------------------------------------- */
let sortOrder = 'desc';

function sortProjects(value) {
    const container = document.getElementById('projectContainer');
    const projects  = Array.from(container.getElementsByClassName('project'));

    if (value === 'date') {
        projects.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
    } else if (value === 'name') {
        projects.sort((a, b) => {
            const nameA = a.getAttribute('data-name');
            const nameB = b.getAttribute('data-name');
            return sortOrder === 'asc'
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });
    }

    projects.forEach(project => container.appendChild(project));
    handleScroll();
}

function toggleOrder() {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const toggleBtn = document.querySelector('.toggle-btn');
    if (toggleBtn) {
        toggleBtn.innerHTML = sortOrder === 'asc'
            ? '<i class="fa fa-sort-amount-up"></i>'
            : '<i class="fa fa-sort-amount-down"></i>';
    }
    sortProjects(document.querySelector('select').value);
    handleScroll();
}

/* ----------------------------------------------------------
   Project shuffle
   ---------------------------------------------------------- */
function shuffleProjects() {
    const container = document.getElementById('projectContainer');
    const projects  = Array.from(container.getElementsByClassName('project'));
    projects.sort(() => Math.random() - 0.5);
    projects.forEach(project => container.appendChild(project));
    handleScroll();
}

/* ----------------------------------------------------------
   Navbar mobile toggler – reset margin when collapsed
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const hamburger     = document.getElementById('hamburger');

    if (navbarToggler && hamburger) {
        navbarToggler.addEventListener('click', function () {
            const allContainer = document.querySelector('.all-container');
            if (hamburger.classList.contains('collapsed')) {
                allContainer.style.marginTop = '0px';
            }
        });
    }
});

/* ----------------------------------------------------------
   Dynamic copyright year
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

/* ----------------------------------------------------------
   Smooth-scroll anchor links (removes the '#' from the URL)
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
    const anchorLinks = document.querySelectorAll("a[href^='#']");
    for (let i = 0; i < anchorLinks.length; i++) {
        anchorLinks[i].addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    handleScroll();
});

/* ----------------------------------------------------------
   Typewriter animation for headers
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
    const typewriters = document.getElementsByClassName('typewriter');
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                startTypewriter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    Array.from(typewriters).forEach(function (element) {
        observer.observe(element);
    });

    function startTypewriter(element) {
        const text = element.innerText;
        let newText = '';
        element.innerText = '';
        element.classList.add('typing');

        Array.from(text).forEach(function (character, index) {
            setTimeout(function () {
                newText += character;
                element.innerText = newText;

                if (index === text.length - 1) {
                    element.classList.remove('typing');
                    element.classList.add('typed');
                }
            }, index * 30);
        });
    }
});

/* ----------------------------------------------------------
   Read More functionality for project descriptions
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
    const descriptions = document.querySelectorAll('.project-desc');
    
    descriptions.forEach(desc => {
        // Create a wrapper for the description to handle clipping and transitions
        const wrapper = document.createElement('div');
        wrapper.className = 'project-desc-wrapper';
        desc.parentNode.insertBefore(wrapper, desc);
        wrapper.appendChild(desc);
        
        // Zero-out internal margins so wrapper accurately clips based on text height
        desc.style.marginBottom = '0';
        
        // Delay slightly to ensure fonts have rendered and heights are calculated correctly
        setTimeout(() => {
            // Check if actual text height exceeds the 4-line max-height
            if (wrapper.scrollHeight > wrapper.clientHeight + 2) {
                wrapper.classList.add('has-fade');
                
                const btn = document.createElement('button');
                btn.className = 'read-more-btn';
                btn.setAttribute('aria-expanded', 'false');
                btn.innerHTML = 'More <i class="fas fa-chevron-down"></i>';
                
                // Insert the button directly after the wrapper
                wrapper.parentNode.insertBefore(btn, wrapper.nextSibling);
                
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isExpanded = wrapper.classList.toggle('expanded');
                    btn.classList.toggle('expanded');
                    btn.setAttribute('aria-expanded', isExpanded);
                    
                    if (isExpanded) {
                        wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
                        btn.childNodes[0].nodeValue = 'Less ';
                    } else {
                        wrapper.style.maxHeight = '';
                        btn.childNodes[0].nodeValue = 'More ';
                    }
                });
            } else {
                // If it's 4 lines or fewer, add some bottom margin to match standard layout
                wrapper.style.marginBottom = '10px';
            }
        }, 150);
    });
});
