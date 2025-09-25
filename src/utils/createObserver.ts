export const createObserver = (
  selector: string,
  className: string,
  options?: IntersectionObserverInit
) => {
  const els = document.querySelectorAll<HTMLElement>(selector);
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  els.forEach((el) => observer.observe(el));
  return observer;
};
