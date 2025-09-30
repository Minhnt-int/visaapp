import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Normalizes a Vietnamese string for searching or for use in URLs.
 * - Converts to lowercase.
 * - Removes diacritics (e.g., "mỹ" -> "my").
 * - Handles special characters like "đ".
 * - Replaces spaces with hyphens.
 * - Removes any remaining non-alphanumeric characters (except hyphens).
 */
export const normalizeVietnamese = (str: string): string => {
  if (!str) return '';

  return str
    .toLowerCase() 
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/đ/g, "d")
    .replace(/\s+/g, '-') // Replace spaces with hyphens for URLs
    .replace(/[^a-z0-9-]/g, '') // Remove all non-alphanumeric chars except hyphens
    .trim();
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
