import { create } from "zustand";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: number;
}

export interface AppState {
  sidebarOpen: boolean;
  isMobile: boolean;
  notifications: Notification[];
  setSidebarOpen: (open: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void;
  removeNotification: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  isMobile: false,
  notifications: [],

  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  setIsMobile: (isMobile: boolean) => {
    set({ isMobile, sidebarOpen: isMobile ? false : true });
  },

  addNotification: (notification) => {
    const id = "notif_" + Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: Date.now(),
    };

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, 5000);
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));
