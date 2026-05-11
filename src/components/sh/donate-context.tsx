import { createContext, useContext } from "react";

export type OpenDonate = (amount?: number) => void;

export const DonateContext = createContext<OpenDonate>(() => {});

export const useOpenDonate = (): OpenDonate => useContext(DonateContext);
