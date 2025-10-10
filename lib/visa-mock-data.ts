
// visaCategories is a static list of continents used for navigation grouping.
// The child "countries" list is intentionally omitted here as they should come from API.
export const visaContinents = [
  { slug: "visa-chau-a", name: "Châu Á" },
  { slug: "visa-chau-au", name: "Châu Âu" },
  { slug: "visa-chau-my", name: "Châu Mỹ" },
  { slug: "visa-chau-phi", name: "Châu Phi" },
  { slug: "visa-chau-uc", name: "Châu Úc" },
];

export function visaContinentsSlugtoName(slug: string): string | null {
 // 1. Sử dụng phương thức find() để tìm đối tượng phù hợp
 const foundCategory = visaContinents.find(category => category.slug === slug);

 // 2. Trả về tên (name) nếu tìm thấy, ngược lại trả về null
 return foundCategory ? foundCategory.name : null;
}