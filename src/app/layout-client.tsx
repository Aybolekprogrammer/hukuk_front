'use client';
import { Provider } from "react-redux";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import GlobalLoader from "@/component/Loader/loading";
import { usePathname } from "next/navigation";
import { ContextProvider } from "@/store/context";
import { store } from "@/store";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideGlobalLoader = pathname === '/';

  return (
    <Provider store={store}>
      <ContextProvider>
        <MantineProvider defaultColorScheme="light">
          {!hideGlobalLoader && <GlobalLoader />}
          {children}
        </MantineProvider>
      </ContextProvider>
    </Provider>
  );
}
