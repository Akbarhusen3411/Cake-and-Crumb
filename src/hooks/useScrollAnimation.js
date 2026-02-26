import { useEffect, useCallback } from 'react'

export function useScrollAnimation() {
  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    const selectors = '.fade-up, .fade-in, .slide-left, .slide-right, .scale-in, .blur-in, .img-reveal'
    const elements = document.querySelectorAll(selectors)
    elements.forEach((el) => observer.observe(el))

    // Re-observe on DOM changes (for tab switching etc.)
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll(selectors)
      newElements.forEach((el) => {
        if (!el.classList.contains('visible')) {
          observer.observe(el)
        }
      })
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  // Parallax on scroll
  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const parallaxElements = document.querySelectorAll('[data-parallax]')
          parallaxElements.forEach((el) => {
            const speed = parseFloat(el.dataset.parallax) || 0.15
            const rect = el.getBoundingClientRect()
            const centerY = rect.top + rect.height / 2
            const viewportCenter = window.innerHeight / 2
            const offset = (centerY - viewportCenter) * speed
            el.style.transform = `translateY(${offset}px)`
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
