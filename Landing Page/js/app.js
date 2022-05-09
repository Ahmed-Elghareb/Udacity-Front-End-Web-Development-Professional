// defining global main tag, sections, and navigation UL
const main = document.querySelector('main');
const body = document.querySelector('body');
let sections = document.querySelectorAll('section');
const navList = document.body.querySelector('#navbar__list')
let navItems ;

// defining smoothScroll function
let smoothScroll=(section)=>{
  // const section = document.querySelector(`#${sectionId}`)
    body.scrollTo({
    top: section.offsetTop,
    left: section.offsetLeft,
    behavior: 'smooth'
    });
    if (section.className === '')
      section.className = 'your-active-class';
  }

// inserting anchors for given sections
sections.forEach((section) => { 
    const navItemName = section.getAttribute('data-nav');
    const navItemId = section.getAttribute('id');
    const htmlTextToAdd = `<li><a  onclick="smoothScroll(${navItemId});" >${navItemName}</a></li>`;
    navList.insertAdjacentHTML('beforeend', htmlTextToAdd);
 })



// styling newly added anchors dynamicly for newly added sections  
navItems = document.querySelectorAll('ul li a');
navItems.forEach((item)=>item.classList.add("anchor"));


// Adding and styling an anchor for added section
const addSectionAnchor = ()=>{
    let lastSection =  main.lastElementChild;
    const navItemName = lastSection.getAttribute('data-nav');
    const navItemId = lastSection.getAttribute('id');
    const htmlTextToAdd = `<li><a  onclick="smoothScroll(${navItemId});" >${navItemName}</a></li>`;
    navList.insertAdjacentHTML('beforeend', htmlTextToAdd);
    navItems = document.querySelectorAll('ul li a');
    const item = navItems[navItems.length-1];
    item.classList.add("anchor");
    
}


// Observing main tag for childList modifications (adding sections in this case)
const config = { childList: true };
const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
		console.log('sections have been modified.');
		addSectionAnchor();
        }
    }
};
// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
// Start observing main for modified childList
observer.observe(main, config);

// Adding and modifying new cloned section to check changes
let cln = sections[1].cloneNode(true);
cln.setAttribute("data-nav", "Section 5");
cln.setAttribute("id", "section5");
cln.querySelector('h2').textContent = 'Section 5';
main.append(cln);

// -----------------

// adding an event listener to track the screen and scrolling and update current active section 
//        if a section is consuming at least half of the screen height, then it is active
document.addEventListener('scroll', ()=>
{
  main.querySelectorAll('section').forEach((section)=>
  {
    let active = false;
    const cords = section.getBoundingClientRect();
    const y = cords.y;
    const height = cords.height;
    const screenHeight = window.innerHeight;
    if (y < 0 &&  (-y)  < height) {
      const sectionProportion = height - (-y);
      if (sectionProportion > screenHeight/2) {
        active = true;
      }
    }
    else if (y >= 0 && Math.abs(height+y)  < screenHeight) {
      const sectionProportion = height;
      if (sectionProportion > screenHeight/2) {
        active = true;
      }
    }
    else if (y >= 0 && Math.abs(screenHeight -y)  < height) {
      const sectionProportion = screenHeight - y;
      if (sectionProportion > screenHeight/2) {
        active = true;
      }
    }
    if (active) { 
      if (section.className === '')
      section.className = 'your-active-class';   
    }
    else {section.className = '';}
  })
});









