import {
  Center,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Loader,
  MantineProvider,
  Stack,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants";
import Home from "./components/Home";
import LightLocatorsGeneratorTab from "./components/LightLocatorsGeneratorTab";
import { lazy, Suspense, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Privacy from "./static_pages/Privacy";
import { isDNTEnabled } from "./utils/general";
import OtherTools from "./static_pages/OtherTools";
import {
  useBeforeInstallPrompt,
  BeforeInstallPromptContext,
} from "./hooks/useIsInstalled";

const TraitsBuilderTab = lazy(() => import("./components/TraitsBuilderTab"));
const UnusedDDSFinderTab = lazy(() => import("./components/UnusedDDSFinder"));

export default function App() {
  const beforeInstallPromptContextValue = useBeforeInstallPrompt();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  // Analytics script for prod
  useEffect(() => {
    if (import.meta.env.PROD && !isDNTEnabled()) {
      const script = document.createElement("script");

      script.src = "https://athena.david-sima.dev/script.js";
      script.async = true;
      script.defer = true;
      script.setAttribute(
        "data-website-id",
        "2d43657d-0b56-43f0-864a-930b350bacef"
      );

      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <BeforeInstallPromptContext.Provider
      value={beforeInstallPromptContextValue}
    >
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications />
          <BrowserRouter>
            <Stack
              sx={{
                minHeight: "100vh",
              }}
            >
              <Header />
              <Container
                fluid
                mt="md"
                p="sm"
                sx={{
                  maxWidth: "1200px",
                  width: "100%",
                }}
              >
                <Routes>
                  <Route path={ROUTES.HOME.path} element={<Home />} />
                  <Route
                    path={ROUTES.LIGHT_LOCATORS_GENERATOR.path}
                    element={<LightLocatorsGeneratorTab />}
                  />
                  <Route
                    path={ROUTES.TRAITS_BUILDER.path}
                    element={
                      <Suspense
                        fallback={
                          <Center style={{ height: "300px" }}>
                            <Loader size="xl" variant="bars" />
                          </Center>
                        }
                      >
                        <TraitsBuilderTab />
                      </Suspense>
                    }
                  />
                  <Route
                    path={ROUTES.UNUSED_DDS_FINDER.path}
                    element={
                      <Suspense
                        fallback={
                          <Center style={{ height: "300px" }}>
                            <Loader size="xl" variant="bars" />
                          </Center>
                        }
                      >
                        <UnusedDDSFinderTab />
                      </Suspense>
                    }
                  />
                  <Route path={ROUTES.PRIVACY.path} element={<Privacy />} />
                  <Route
                    path={ROUTES.OTHER_TOOLS.path}
                    element={<OtherTools />}
                  />
                </Routes>
              </Container>
              <Footer />
            </Stack>
          </BrowserRouter>
        </MantineProvider>
      </ColorSchemeProvider>
    </BeforeInstallPromptContext.Provider>
  );
}
