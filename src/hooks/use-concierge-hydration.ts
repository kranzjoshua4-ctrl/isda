"use client";

import { useConciergeStore } from "@/store/concierge-store";
import { useSyncExternalStore } from "react";

/**
 * Zustand `persist` rehydrates from localStorage asynchronously. Any redirect
 * that checks `vehicleRequest` must wait until this is true on the client.
 */
export function useConciergeHydration(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const unsub = useConciergeStore.persist.onFinishHydration(onStoreChange);
      if (useConciergeStore.persist.hasHydrated()) {
        queueMicrotask(onStoreChange);
      }
      return unsub;
    },
    () => useConciergeStore.persist.hasHydrated(),
    () => false,
  );
}
