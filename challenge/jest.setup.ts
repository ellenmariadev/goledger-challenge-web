import "@testing-library/jest-dom";

// Base UI + virtualized lists rely on browser APIs not present in JSDOM.

class ResizeObserverMock {
  observe() { }
  unobserve() { }
  disconnect() { }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).ResizeObserver = (globalThis as any).ResizeObserver ?? ResizeObserverMock;

class IntersectionObserverMock {
  observe() { }
  unobserve() { }
  disconnect() { }
  takeRecords() {
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IntersectionObserver =
  (globalThis as any).IntersectionObserver ?? IntersectionObserverMock;

// matchMedia is used by some UI libraries.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).matchMedia =
  (globalThis as any).matchMedia ??
  ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => { },
    removeListener: () => { },
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: () => false,
  }));

// Avoid noisy errors for scroll helpers.
// eslint-disable-next-line @typescript-eslint/no-empty-function
HTMLElement.prototype.scrollIntoView = HTMLElement.prototype.scrollIntoView ?? function () { };
