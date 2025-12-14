// src/lib/stores/toast.ts
import type { Toast, ToastType } from '$lib/types';
import { writable } from 'svelte/store';

export const toasts = writable<Toast[]>([]);

let counter = 0;

export function addToast(message: string, type: ToastType = 'info', duration = 3000) {
  const id = ++counter;
  toasts.update(t => [...t, { id, message, type, duration }]);
  setTimeout(() => removeToast(id), duration);
}

export function removeToast(id: number) {
  toasts.update(t => t.filter(toast => toast.id !== id));
}
