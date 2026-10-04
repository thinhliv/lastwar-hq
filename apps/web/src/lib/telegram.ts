/**
 * Telegram integration links & helpers for Monica Bot / Team Murphy
 */

export const TELEGRAM_BUY_BOT = "https://t.me/tool_lastwar_buysell_bot";
export const TELEGRAM_SUPPORT_GROUP = "https://t.me/gametoollastwar";

export interface TelegramLinkOptions {
  plan?: string;
  lang?: string;
  source?: string;
  team?: string;
}

/**
 * Generate deep-link to Telegram Buy Bot with tracking parameters
 */
export function getTelegramBuyLink(options?: TelegramLinkOptions): string {
  const base = process.env.NEXT_PUBLIC_TELEGRAM_BUY_BOT || TELEGRAM_BUY_BOT;
  if (!options) return base;

  const parts: string[] = [];
  if (options.team) parts.push(`team_${options.team}`);
  if (options.plan) parts.push(`plan_${options.plan}`);
  if (options.lang) parts.push(`lang_${options.lang}`);
  if (options.source) parts.push(`src_${options.source}`);

  if (parts.length > 0) {
    const startParam = parts.join("__").replace(/[^a-zA-Z0-9_]/g, "");
    return `${base}?start=${startParam}`;
  }

  return base;
}

/**
 * Get Telegram support group link
 */
export function getTelegramSupportLink(): string {
  return process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT_GROUP || TELEGRAM_SUPPORT_GROUP;
}
