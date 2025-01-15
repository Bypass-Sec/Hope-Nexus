'use client';

import React from 'react'
import NavbarStyles from "../../styles/NavbarStyles.module.css"


//scrolling logic
let lastScrollTop = 0;
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.classList.add('nav--hidden');
  } else {
    // Scrolling up
    navbar.classList.remove('nav--hidden');
  }
  
  lastScrollTop = scrollTop;
});


const page = () => {
  return (
    <div>page</div>
  )
}

export default page