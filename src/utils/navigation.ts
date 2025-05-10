
/**
 * Utility function to scroll to top of the page with smooth animation
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Utility function to scroll to a specific element by ID
 * @param elementId The ID of the element to scroll to
 * @param offset Optional offset from the top in pixels
 */
export const scrollToElement = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};
