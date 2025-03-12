import { cn } from "@/lib/utils";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Brand from "./ui/brand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import useHttp from "@/hooks/use-http";
import Credential from "@/types/dto/Credential";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(5, {
      message: "Password must contain atleast 5 characters",
    })
    .max(125, {
      message: "Password must not exceed more than 125 characters",
    }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { loading, requestData } = useHttp();

  const loginHandler = async (values: z.infer<typeof formSchema>) => {
    const credentials: Credential = {
      email: values.email,
      password: values.password,
    };
    const response = await requestData("/auth/login", "POST", credentials);
    if (response.isError) {
      if (response.error?.status === 401)
        return toast("Invalid credentials. Please try again");
      return toast(response.message);
    }
  };

  const togglePasswordVisibilityHandler = () =>
    setShowPassword((currentState) => !currentState);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="space-y-3">
            <Brand />
            <div className="space-y-2">
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(loginHandler)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@domain.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Your secret password"
                              {...field}
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-1/2 -translate-y-1/2"
                              onClick={togglePasswordVisibilityHandler}
                            >
                              {showPassword ? <EyeClosed /> : <Eye />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="button" className="px-0" variant="link">
                    Forgot Password?
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?
                <Button
                  className="px-1 underline cursor-pointer"
                  variant="link"
                  type="button"
                  disabled={loading}
                  onClick={() => navigate("/sign-up")}
                >
                  Sign up
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
