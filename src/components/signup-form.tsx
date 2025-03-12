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
import { toast } from "sonner";
import { useNavigate } from "react-router";
import User from "@/types/dto/User";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  firstname: z.string().nonempty("Please enter a valid firstname"),
  lastname: z.string().nonempty("Please enter a valid lastname"),
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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const { loading, requestData } = useHttp();

  const signupHandler = async (values: z.infer<typeof formSchema>) => {
    const user: User = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
    };
    const response = await requestData("/users", "POST", user);
    if (response.isError) {
      if (response.error?.status === 409)
        return form.setError("email", {
          message:
            "This email is already taken. Please login or reset your password",
          type: "manual",
        });

      return toast(response.message);
    }
    toast("Your account is created. Please login to continue.");
    navigate("/sign-in");
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
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Enter your details below to create your account
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(signupHandler)}
            >
              <div className="flex items-start gap-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input placeholder="Firstname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input placeholder="Lastname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                            className="pr-10" // Add padding-right to prevent text overlap with the button
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
              <Button type="submit" className="w-full">
                Signup
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?
                <Button
                  className="px-1 underline cursor-pointer"
                  variant="link"
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    navigate("/sign-in", {
                      replace: true,
                    })
                  }
                >
                  Sign in
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
