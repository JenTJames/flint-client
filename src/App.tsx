import Router from "@/components/router";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <div className="flex min-h-screen w-screen bg-secondary justify-center items-center">
      <Toaster />
      <Router />
    </div>
  );
};

export default App;
