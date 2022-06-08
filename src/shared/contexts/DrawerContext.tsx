import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerOption {
  icon: string;
  path: string;
  label: string;

}

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOption: IDrawerOption[]) => void;
}

interface IDrawerContextProps {
  children?: React.ReactNode;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IDrawerContextProps> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setdrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback(
    (newDrawerOption: IDrawerOption[]) => {
      setdrawerOptions(newDrawerOption);
    },
    []
  );

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, setDrawerOptions: handleSetDrawerOptions, drawerOptions, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
