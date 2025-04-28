import { Logo32 } from "@/assets/icons/logo-32";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { getCookie, setCookie } from "cookies-next";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const LOGIN_MUTATION = gql`
  mutation loginAdmin($input: LoginUserInput) {
    loginAdmin(input: $input) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const token = getCookie("token");

  const [login, { loading: isLogginIn }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (token) {
      router.navigate({ to: "/home" });
    }
  }, [router]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "yelsultan.n",
      password: "123456",
    },
  });

  const { handleSubmit, control } = form;

  async function onSubmit(formData: LoginFormValues) {
    try {
      const { data } = await login({ variables: { input: formData } });

      if (!data?.loginAdmin?.token) {
        throw new Error("Invalid credentials");
      }

      setCookie("token", data.loginAdmin.token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      await router.navigate({ to: "/home" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="draglayer flex flex-col items-center gap-2">
              <Logo32 />
              <h1 className="text-xl font-bold">HJ Call Assistant</h1>
            </div>
            <div className="flex flex-col gap-4">
              <FormInput
                control={control}
                name="username"
                label="Логин"
                placeholder="Введите логин"
              />
              <FormInput
                control={control}
                name="password"
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
              />
              <Button type="submit" className="w-full" disabled={isLogginIn}>
                Войти
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
