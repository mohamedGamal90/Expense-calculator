import { Form, StyledButton, StyledText, TextInput, View } from "@aurora/components";
import { Link } from "expo-router";
import { AuthLayout } from "../components/AuthLayout";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "expo-router";
import { protectedStore, StoreKey } from "@aurora/utils";
import { ControlledField } from "@aurora/blocks";

enum FormFields {
  Username = "username",
  Password = "password",
}

const loginFormResolver = yup.object().shape({
  [FormFields.Username]: yup.string().required(),
  [FormFields.Password]: yup.string().required(),
});

type FormValues = yup.InferType<typeof loginFormResolver>;

export function LoginScreen() {
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(loginFormResolver),
    defaultValues: {
      [FormFields.Username]: "",
      [FormFields.Password]: "",
    },
  });

  const { mutate } = useLoginMutation({
    onError(error) {
      console.log("error", error);
    },
    async onSuccess(data) {
      console.log("data", data);
      await protectedStore.setValue(StoreKey.AccessToken, data.access_token);
      router.push("/dashboard");
    },
  });

  function handleLogin(data: FormValues) {
    mutate(data);
  }

  return (
    <Form flex={1} onSubmit={form.handleSubmit(handleLogin)}>
      <FormProvider {...form}>
        <AuthLayout>
          <StyledText variant="Heading4xl">Log In</StyledText>
          <View>
            <StyledText mb="$s" variant="Heading6xl">
              Welcome Back to MDP
            </StyledText>

            <StyledText mb="$xl" variant="Bodysm">
              Enter Your Credentials to access your account
            </StyledText>

            <ControlledField
              fieldName={FormFields.Username}
              type="textInput"
              placeholder="Enter your email"
              label="Email"
              iconLeft="email"
            />

            <ControlledField
              label="Password"
              fieldName={FormFields.Password}
              type="textInput"
              placeholder="Enter Password"
              secureTextEntry
              iconLeft="password"
            />

            <Link
              style={{
                alignSelf: "flex-end",
                marginTop: -20,
                marginBottom: 20,
              }}
              href={"/auth/forgot-password"}>
              <StyledText color={"$primary800"} padding="$space.s" variant="BodyBoldsm">
                Forgot your password?
              </StyledText>
            </Link>
            <Form.Trigger mb="$xl" asChild>
              <StyledButton>Login</StyledButton>
            </Form.Trigger>
            <View w={"100%"} alignItems="center">
              <View flexDirection="row" paddingBottom={"$xl"} gap={"$space.sm"} alignItems="center">
                <View h={"1px"} w={"100px"} backgroundColor={"$neutral900"}></View>
                <StyledText>Or</StyledText>
                <View h={"1px"} w={"100px"} backgroundColor={"$neutral900"}></View>
              </View>
              <StyledText>
                Don't have an account?{" "}
                <StyledText variant="BodySemiBoldsm" color={"$primary800"}>
                  Sign Up
                </StyledText>
              </StyledText>
            </View>
          </View>
        </AuthLayout>
      </FormProvider>
    </Form>
  );
}
