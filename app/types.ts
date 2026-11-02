export interface Model {
  id: number;
  name: string;
  description: string;
  likes: number;
  image: string;
  category: string;
  dateAdded: string;
}

export interface Category {
  displayName: string;
  slug: string;
}

export type SortOption = "newest" | "oldest" | "popular" | "name";

export interface ModelFilters {
  query?: string;
  category?: string;
  sort?: SortOption;
}

export interface ModelCardProps {
  model: Model;
}

export interface ModelDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface ModelsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
  }>;
}

export interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export interface RootLayoutProps {
  children: React.ReactNode;
}
