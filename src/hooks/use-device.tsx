import * as React from "react";
import { useIsMobile } from "./use-mobile";

type DeviceView = "mobile" | "desktop";

interface DeviceProviderProps {
  children: React.ReactNode;
  defaultView?: DeviceView;
  storageKey?: string;
}

interface DeviceProviderState {
  view: DeviceView;
  toggleView: () => void;
  setView: (view: DeviceView) => void;
  isMobileDevice: boolean;
}

const initialState: DeviceProviderState = {
  view: "desktop",
  toggleView: () => null,
  setView: () => null,
  isMobileDevice: false,
};

const DeviceProviderContext = React.createContext<DeviceProviderState>(initialState);

export function DeviceProvider({
  children,
  defaultView = "desktop",
  storageKey = "halvi-device-view",
  ...props
}: DeviceProviderProps) {
  const isMobileDevice = useIsMobile();
  const [view, setView] = React.useState<DeviceView>(
    () => {
      // If on mobile device, default to mobile view
      if (isMobileDevice) {
        return "mobile";
      }
      // Otherwise use stored preference or default
      return (localStorage.getItem(storageKey) as DeviceView) || defaultView;
    }
  );

  React.useEffect(() => {
    // Save to localStorage
    localStorage.setItem(storageKey, view);
  }, [view, storageKey]);

  const toggleView = React.useCallback(() => {
    setView((prevView) => (prevView === "desktop" ? "mobile" : "desktop"));
  }, []);

  const value = React.useMemo(
    () => ({
      view,
      toggleView,
      setView,
      isMobileDevice,
    }),
    [view, toggleView, isMobileDevice]
  );

  return (
    <DeviceProviderContext.Provider {...props} value={value}>
      {children}
    </DeviceProviderContext.Provider>
  );
}

export const useDevice = () => {
  const context = React.useContext(DeviceProviderContext);

  if (context === undefined)
    throw new Error("useDevice must be used within a DeviceProvider");

  return context;
};
