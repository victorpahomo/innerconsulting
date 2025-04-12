import { useState, useMemo } from "react";

type SearchPredicate<T> = (item: T, searchTerm: string) => boolean;

export function useSearch<T>(items: T[], searchPredicate: SearchPredicate<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    return items.filter((item) => searchPredicate(item, normalizedSearchTerm));
  }, [items, searchTerm, searchPredicate]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
}
