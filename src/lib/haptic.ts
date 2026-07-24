/**
 * NEO-LANDING-SDR · Haptic Feedback Utility (Web Vibration API wrapper)
 * 
 * Simulates native iOS Taptic Engine feedback using navigator.vibrate()
 * for supported mobile devices (e.g. Android Chrome).
 * 
 * Styles:
 * - 'light' (12ms): Selection tick / subtle click
 * - 'medium' (25ms): General button click / panel toggle
 * - 'heavy' (45ms): CTA conversion button click / form send
 * - 'double' (12ms, 60ms pause, 12ms): Message successfully received
 * - 'error' (15ms, 60ms pause, 15ms, 60ms pause, 30ms): Error or warning state
 */

export type HapticStyle = 'light' | 'medium' | 'heavy' | 'double' | 'error';

export function triggerHaptic(style: HapticStyle = 'light'): void {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    let pattern: number | number[];
    switch (style) {
      case 'light':
        pattern = 12;
        break;
      case 'medium':
        pattern = 25;
        break;
      case 'heavy':
        pattern = 45;
        break;
      case 'double':
        pattern = [12, 60, 12];
        break;
      case 'error':
        pattern = [15, 60, 15, 60, 30];
        break;
      default:
        pattern = 12;
    }
    
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Degrade gracefully if vibration fails or is blocked by browser policies
      console.debug('navigator.vibrate failed or was blocked:', e);
    }
  }
}

/**
 * Initializes global event listener for haptic feedback using event delegation.
 * Targets buttons, interactive anchors, drawer links, and details summaries.
 */
export function initGlobalHaptics(): void {
  if (typeof window === 'undefined') return;

  const handleInteraction = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target) return;

    // Find the closest interactive ancestor
    const element = target.closest<HTMLElement>(
      'button, summary, a.button, a.button-ghost, a.mobile-cta, a.text-link, [role="button"], [data-haptic]'
    );

    if (!element) return;

    // Determine haptic style
    let style: HapticStyle = 'light';
    const customStyle = element.getAttribute('data-haptic') as HapticStyle | null;

    if (customStyle && ['light', 'medium', 'heavy', 'double', 'error'].includes(customStyle)) {
      style = customStyle;
    } else {
      // Infer style from class/id/context
      if (element.id === 'chat-send-btn') {
        style = 'heavy';
      } else if (element.id === 'neo-sdr-bubble-btn') {
        style = 'medium';
      } else if (element.id === 'close-drawer-btn') {
        style = 'light';
      } else if (element.tagName === 'SUMMARY') {
        style = 'light';
      } else if (
        element.classList.contains('button') &&
        !element.classList.contains('button-small') &&
        !element.classList.contains('button-ghost')
      ) {
        style = 'medium';
      } else if (element.classList.contains('mobile-cta')) {
        style = 'medium';
      }
    }

    triggerHaptic(style);
  };

  // Bind click event with passive: true and capture: true to catch events early
  document.addEventListener('click', handleInteraction, { capture: true, passive: true });
}
