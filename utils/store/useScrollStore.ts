import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ScrollState {
  scrollPositions: { [url: string]: number };
  setScrollPosition: (url: string, position: number) => void;
  getScrollPosition: (url: string) => number;
  pageRendered: boolean;
  setPageRendered: (loaded: boolean) => void;
}

export const useScrollStore = create<ScrollState>()(
  persist(
    (set, get) => ({
      scrollPositions: {},
      setScrollPosition: (url: string, position: number) =>
        set((state) => ({
          scrollPositions: { ...state.scrollPositions, [url]: position },
        })),
      getScrollPosition: (url: string) => get().scrollPositions[url] || 0,
      pageRendered: false,
      setPageRendered: (isRendered: boolean) => set({ pageRendered: isRendered }),
    }),
    {
      name: 'scroll-storage', // 로컬 스토리지에 저장될 키 이름
    },
  ),
);
