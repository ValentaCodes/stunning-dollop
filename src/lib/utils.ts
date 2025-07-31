import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 1000) + 1
}

export function xpToNextLevel(xp: number): number {
  return 1000 - (xp % 1000)
}

export function progressToNextLevel(xp: number): number {
  return ((xp % 1000) / 1000) * 100
}
