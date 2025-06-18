import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const removeEmptyFields = <T extends Record<string, any>>(obj: T): Partial<T> =>{
  return Object.keys(obj).reduce<Partial<T>>((acc, key) => {
    if (obj[key] !== "") {
      acc[key as keyof T] = obj[key];
    }
    return acc;
  }, {});
}