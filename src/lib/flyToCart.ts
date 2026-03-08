// src/lib/flyToCart.ts
import gsap from 'gsap';

export const flyToCart = (
  flyer: HTMLElement,
  cartButton: HTMLElement | null,
  onComplete?: () => void
) => {
  if (!cartButton) {
    onComplete?.();
    return;
  }

  const cartRect = cartButton.getBoundingClientRect();
  const flyerRect = flyer.getBoundingClientRect();

  // Clone the element to animate independently
  const clone = flyer.cloneNode(true) as HTMLElement;
  clone.style.position = 'fixed';
  clone.style.zIndex = '9999';
  clone.style.top = `${flyerRect.top}px`;
  clone.style.left = `${flyerRect.left}px`;
  clone.style.width = `${flyerRect.width}px`;
  clone.style.height = `${flyerRect.height}px`;
  clone.style.margin = '0';
  clone.style.pointerEvents = 'none';
  document.body.appendChild(clone);

  // Animate the clone to the cart
  gsap.to(clone, {
    x: cartRect.left - flyerRect.left,
    y: cartRect.top - flyerRect.top,
    scale: 0.2,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      clone.remove();
      onComplete?.();
    },
  });
};