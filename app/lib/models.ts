import modelsData from "../models.json";
import type { Model, ModelFilters, SortOption } from "../types";

const models = modelsData as Model[];

export async function getAllModels(): Promise<Model[]> {
  return [...models];
}

export async function getModelById(
  id: string | number
): Promise<Model | undefined> {
  return models.find((model) => model.id.toString() === id.toString());
}

export function getSortOption(value?: string): SortOption {
  const options: SortOption[] = ["newest", "oldest", "popular", "name"];
  return options.includes(value as SortOption)
    ? (value as SortOption)
    : "newest";
}

export function searchModels({
  query = "",
  category = "",
  sort = "newest",
}: ModelFilters = {}): Model[] {
  const term = query.trim().toLowerCase();

  const results = models.filter((model) => {
    const matchesCategory = !category || model.category === category;
    const matchesQuery =
      !term ||
      model.name.toLowerCase().includes(term) ||
      model.description.toLowerCase().includes(term) ||
      model.category.toLowerCase().includes(term);

    return matchesCategory && matchesQuery;
  });

  return sortModels(results, sort);
}

export function sortModels(modelList: Model[], sort: SortOption): Model[] {
  const sorted = [...modelList];

  switch (sort) {
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
      );
    case "popular":
      return sorted.sort((a, b) => b.likes - a.likes);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
  }
}

export function getFeaturedModels(limit = 4): Model[] {
  return sortModels(models, "popular").slice(0, limit);
}

export function getLatestModels(limit = 4): Model[] {
  return sortModels(models, "newest").slice(0, limit);
}

export function getRelatedModels(model: Model, limit = 3): Model[] {
  const sameCategory = models.filter(
    (candidate) =>
      candidate.id !== model.id && candidate.category === model.category
  );
  const others = sortModels(
    models.filter((candidate) => candidate.id !== model.id),
    "popular"
  );

  const related = [...sameCategory, ...others].filter(
    (candidate, index, list) =>
      list.findIndex((item) => item.id === candidate.id) === index
  );

  return related.slice(0, limit);
}

export function getModelStats() {
  const totalLikes = models.reduce((sum, model) => sum + model.likes, 0);
  const categoryCount = new Set(models.map((model) => model.category)).size;

  return {
    totalModels: models.length,
    totalLikes,
    totalCategories: categoryCount,
  };
}
