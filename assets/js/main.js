/**
 * In Bloom - Main JavaScript
 * Minimal vanilla JavaScript for optional enhancements
 */

(function() {
  'use strict';

  // ===========================
  // Mobile Navigation Toggle
  // ===========================
  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('.site-nav');
    
    if (!navToggle || !siteNav) return;
    
    navToggle.addEventListener('click', function() {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.site-header')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close nav when pressing Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===========================
  // Events Filter Toggle
  // ===========================
  function initEventsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.dataset.filter;
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter events sections
        const upcomingSection = document.getElementById('upcoming-events');
        const pastSection = document.getElementById('past-events');
        
        if (!upcomingSection || !pastSection) return;
        
        if (filter === 'all') {
          upcomingSection.classList.remove('hidden');
          pastSection.classList.remove('hidden');
        } else if (filter === 'upcoming') {
          upcomingSection.classList.remove('hidden');
          pastSection.classList.add('hidden');
        } else if (filter === 'past') {
          upcomingSection.classList.add('hidden');
          pastSection.classList.remove('hidden');
        }
      });
    });
  }

  // ===========================
  // Newsletter Form Enhancement
  // ===========================
  function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
      const emailInput = form.querySelector('input[type="email"]');
      
      if (!emailInput || !emailInput.value) {
        e.preventDefault();
        alert('Please enter your email address.');
        return;
      }
      
      // Form will submit naturally (mailto: link)
    });
  }

  // ===========================
  // Set Active Navigation Link
  // ===========================
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.site-nav a');
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      // Match exact paths or parent directories
      if (currentPath === linkPath || 
          (linkPath !== '/' && currentPath.startsWith(linkPath))) {
        link.classList.add('active');
      }
    });
  }

  // ===========================
  // Initialize on DOM Ready
  // ===========================
  function init() {
    initMobileNav();
    initEventsFilter();
    initNewsletterForm();
    setActiveNavLink();
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
