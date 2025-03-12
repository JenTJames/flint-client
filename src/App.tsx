import Router from "@/components/router";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/providers/theme-provider";

const App = () => {
  return (
    <div className="flex min-h-screen w-screen bg-secondary justify-center items-center">
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster />
        <Router />
      </ThemeProvider>
    </div>
  );
};

export default App;
