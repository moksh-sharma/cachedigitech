/** Text fade-in: 0.4s delay + 0.6s duration. */
export const LOADER_TEXT_IN_MS = 1000;

/** Time to read copy after text is fully visible, before panels slide. */
export const LOADER_TEXT_HOLD_MS = 1500;

/** Total hold before exit animation starts. */
export const LOADER_HOLD_MS = LOADER_TEXT_IN_MS + LOADER_TEXT_HOLD_MS;

/** Exit animation: 0.6s delay + 0.6s duration (panels + background fade). */
export const LOADER_EXIT_MS = 1200;

/** Max time before forcing loader removal. */
export const LOADER_TOTAL_MS = LOADER_HOLD_MS + LOADER_EXIT_MS + 80;

/** Black curtain slide duration (route transitions). */
export const LOADER_SLIDE_MS = 1100;

/** Shared easing for curtain transforms (route overlay). */
export const CURTAIN_EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

/** Centered logo on route transition curtains. */
export const CURTAIN_LOGO_SRC = "/navbar-logo.svg";

/** Framer Page Loader branding */
export const LOADER_HEADING = "CACHE DIGITECH";
export const LOADER_SUBTITLE = "ENDEAVOURING PERFECTION";
export const LOADER_TRANSITION_COLOR = "#000000";
export const LOADER_BACKGROUND = "#000000";
export const LOADER_TEXT_COLOR = "#ffffff";

/** Framer split-panel easing */
export const LOADER_PANEL_EASING = "cubic-bezier(0.44, 0, 0.56, 1)";
