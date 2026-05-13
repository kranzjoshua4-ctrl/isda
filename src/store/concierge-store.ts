import { create } from "zustand";
import { persist } from "zustand/middleware";

import { parseVehicleRequest } from "@/lib/request-parser";
import type {
  BookingSelection,
  CustomerDetails,
  ExtractedAttributes,
  PaymentMethodId,
} from "@/types/concierge";
import { OPEN_LABEL } from "@/types/concierge";

const defaultCustomer: CustomerDetails = {
  vorname: "",
  nachname: "",
  telefon: "",
  email: "",
  standort: "",
  rueckrufzeit: "",
};

const emptyExtracted = (): ExtractedAttributes => ({
  marke: OPEN_LABEL,
  modell: OPEN_LABEL,
  budget: OPEN_LABEL,
  kilometerstand: OPEN_LABEL,
  karosserieform: OPEN_LABEL,
  kraftstoff: OPEN_LABEL,
  getriebe: OPEN_LABEL,
  wuensche: OPEN_LABEL,
  besonderheiten: OPEN_LABEL,
});

type ConciergeState = {
  vehicleRequest: string;
  extracted: ExtractedAttributes;
  customer: CustomerDetails;
  booking: BookingSelection | null;
  checkoutSessionId: string | null;
  selectedPaymentMethod: PaymentMethodId | null;
  setVehicleRequest: (text: string) => void;
  refreshExtraction: () => void;
  setExtracted: (partial: Partial<ExtractedAttributes>) => void;
  setCustomer: (partial: Partial<CustomerDetails>) => void;
  setBooking: (booking: BookingSelection | null) => void;
  setCheckoutSessionId: (id: string | null) => void;
  setSelectedPaymentMethod: (id: PaymentMethodId | null) => void;
  resetJourney: () => void;
};

export const useConciergeStore = create<ConciergeState>()(
  persist(
    (set, get) => ({
      vehicleRequest: "",
      extracted: emptyExtracted(),
      customer: { ...defaultCustomer },
      booking: null,
      checkoutSessionId: null,
      selectedPaymentMethod: null,
      setVehicleRequest: (text) =>
        set({
          vehicleRequest: text,
          extracted: parseVehicleRequest(text),
        }),
      refreshExtraction: () =>
        set({ extracted: parseVehicleRequest(get().vehicleRequest) }),
      setExtracted: (partial) =>
        set({ extracted: { ...get().extracted, ...partial } }),
      setCustomer: (partial) =>
        set({ customer: { ...get().customer, ...partial } }),
      setBooking: (booking) => set({ booking }),
      setCheckoutSessionId: (checkoutSessionId) => set({ checkoutSessionId }),
      setSelectedPaymentMethod: (selectedPaymentMethod) =>
        set({ selectedPaymentMethod }),
      resetJourney: () =>
        set({
          vehicleRequest: "",
          extracted: emptyExtracted(),
          customer: { ...defaultCustomer },
          booking: null,
          checkoutSessionId: null,
          selectedPaymentMethod: null,
        }),
    }),
    {
      name: "ichsuchdeinauto-concierge",
      partialize: (s) => ({
        vehicleRequest: s.vehicleRequest,
        extracted: s.extracted,
        customer: s.customer,
        booking: s.booking,
        checkoutSessionId: s.checkoutSessionId,
        selectedPaymentMethod: s.selectedPaymentMethod,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<ConciergeState>;
        const mergedBooking =
          p.booking != null
            ? {
                date: p.booking.date,
                slot: p.booking.slot,
                paymentMethodId: p.booking.paymentMethodId ?? null,
              }
            : current.booking;
        return {
          ...current,
          ...p,
          extracted: {
            ...current.extracted,
            ...(p.extracted ?? {}),
            getriebe:
              p.extracted?.getriebe ?? current.extracted.getriebe ?? OPEN_LABEL,
          },
          booking: mergedBooking,
          selectedPaymentMethod:
            p.selectedPaymentMethod ?? current.selectedPaymentMethod ?? null,
        };
      },
    },
  ),
);
