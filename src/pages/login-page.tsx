import { LoginForm } from "@/components/login-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full fixed top-0 right-0 p-5 flex justify-end">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
