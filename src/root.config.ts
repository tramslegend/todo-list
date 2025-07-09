import { currencies } from "./constants/currencies";
import { findByProperty } from "./cs-toolkit/utils";

export const PROJECT_NAME = "Crivio";
export const LOGO = "/logo.png";
export const LOGO_DARK = "/logo_dark.png";
export const PLACEHOLDER_IMAGE = "/placeholder.svg";
export const CURRENCY = "₹";
export const DEFAULT_CURRENCY = findByProperty(currencies, 'code', 'INR')!;


