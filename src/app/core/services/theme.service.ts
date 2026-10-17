import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme-mode';

/**
 * Controla el tema claro/oscuro.
 * - Lee la preferencia guardada o, si no hay, la del sistema operativo.
 * - Aplica la clase `dark-theme` / `light-theme` en <html>.
 * - Guarda la elección en localStorage.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly mode = signal<ThemeMode>(this.getInitialMode());
  readonly isDark = computed(() => this.mode() === 'dark');

  constructor() {
    effect(() => {
      const mode = this.mode();
      const root = this.document.documentElement;
      root.classList.toggle('dark-theme', mode === 'dark');
      root.classList.toggle('light-theme', mode === 'light');
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        // localStorage no disponible: se ignora
      }
    });
  }

  toggle(): void {
    this.mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  private getInitialMode(): ThemeMode {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      
    }
    const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}