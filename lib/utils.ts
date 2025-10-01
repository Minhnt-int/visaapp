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

export const truncateText = (text: string, maxLength: number = 50): string => {
   // 1. Kiểm tra nếu chuỗi ngắn hơn độ dài tối đa
   if (text.length <= maxLength) {
       return text;
   }

   // 2. Cắt chuỗi ban đầu ở độ dài tối đa
   let truncated = text.substring(0, maxLength);

   // 3. Tìm vị trí khoảng trắng cuối cùng trong chuỗi đã cắt
   const lastSpace = truncated.lastIndexOf(' ');

   // 4. Kiểm tra nếu có khoảng trắng và không ở cuối chuỗi
   if (lastSpace !== -1 && lastSpace < maxLength - 1) {
       // Cắt lại chuỗi tại vị trí khoảng trắng cuối cùng
       truncated = truncated.substring(0, lastSpace);
   }
   
   // 5. Trả về chuỗi đã cắt kèm dấu ba chấm
   return truncated.trim() + '...';
};