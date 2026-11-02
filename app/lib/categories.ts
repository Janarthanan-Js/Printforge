import categoriesData from "../../categories.json";
import modelsData from "../models.json";
import type { Category, Model } from "../types";

const categories = categoriesData as Category[];
const models = modelsData as Model[];

export function getAllCategories(): Category[] {
  return [...categories];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryDisplayName(slug: string): string {
  return getCategoryBySlug(slug)?.displayName ?? slug;
}

export function getCategoryCounts(): Record<string, number> {
  return models.reduce<Record<string, number>>((counts, model) => {
    counts[model.category] = (counts[model.category] ?? 0) + 1;
    return counts;
  }, {});
}
