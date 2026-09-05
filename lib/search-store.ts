'use client';

import { useSyncExternalStore } from 'react';

type SearchState = { query: string; location: string };

let state: SearchState = { query: '', location: '' };
const subscribers = new Set<() => void>();

export function setSearch(next: Partial<SearchState>) {
  state = { ...state, ...next };
  subscribers.forEach((fn) => fn());
}

const subscribe = (fn: () => void) => {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
};

const getSnapshot = () => state;
const getServerSnapshot = (): SearchState => ({ query: '', location: '' });

export function useSearch(): SearchState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
