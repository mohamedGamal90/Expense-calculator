import { View, Form } from "tamagui";
import { useRouter } from "expo-router";
import { StyledButton, StyledText } from "@aurora/components";
import { AuthLayout } from "../components/AuthLayout";
import { Icon } from "@aurora/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledField } from "@aurora/blocks";

import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";

enum FormFields {
  Email = "email",
}

const forgetPasswordFormResolver = yup.object().shape({
  [FormFields.Email]: yup.string().email().required(),
});

type FormValues = yup.InferType<typeof forgetPasswordFormResolver>;

export const ForgotPasswordScreen = () => {
  const router = useRouter();
  const form = useForm({
    resolver: yupResolver(forgetPasswordFormResolver),
    defaultValues: {
      [FormFields.Email]: "",
    },
  });

  function handleSubmit(data: FormValues) {
    router.push("auth/new-password");
  }

  return (
    <Form flex={1} onSubmit={form.handleSubmit(handleSubmit)}>
      <FormProvider {...form}>
        <AuthLayout>
          <View flex={1} paddingHorizontal="$s" backgroundColor="$white">
            <StyledButton
              variant="outlined"
              borderColor={"$gray9"}
              paddingVertical={"$xs"}
              marginBottom={"$m"}
              width={50}
              icon={<Icon name="arrow-left" color="black" />}
              onPress={() => router.push("auth/login")}
            />

            <StyledText mt={"$4xl"} variant="Heading4xl" color={"$secondary900"} marginBottom="$xl">
              Forget Password
            </StyledText>

            <ControlledField
              fieldName={FormFields.Email}
              type="textInput"
              placeholder="Enter your email"
              label="Email"
              iconLeft="email"
            />

            <Form.Trigger mt="$auto" asChild>
              <StyledButton>Submit</StyledButton>
            </Form.Trigger>
          </View>
        </AuthLayout>
      </FormProvider>
    </Form>
  );
};
