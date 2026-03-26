"use client";

const FAVORITES_KEY = "newsbook_favorites";
const USER_KEY = "newsbook_user";

export interface User {
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
}

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id: string): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } else {
    favorites.splice(index, 1);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return false;
  }
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function loginUser(name: string, email: string): User {
  const user: User = {
    name,
    email,
    avatar: name.charAt(0).toUpperCase(),
    joinedDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function logoutUser(): void {
  localStorage.removeItem(USER_KEY);
}
