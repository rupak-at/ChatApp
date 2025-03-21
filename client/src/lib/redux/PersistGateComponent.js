'use client';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

const PersistGateComponent = ({children}) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  )
}

export default PersistGateComponent