import { StyledButton, StyledText, View } from "@aurora/components";
import { Form } from "tamagui";
import { AuthLayout } from "../components/AuthLayout";
import { Icon } from "@aurora/icons";
import { useRouter } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledField } from "@aurora/blocks";

import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";

enum FormFields {
  Password = "password",
  NewPassword = "new-password",
}

const newPasswordFormResolver = yup.object().shape({
  [FormFields.Password]: yup.string().email().required(),
  [FormFields.NewPassword]: yup.string().email().required(),
});

type FormValues = yup.InferType<typeof newPasswordFormResolver>;

export const NewPasswordScreen = () => {
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(newPasswordFormResolver),
    defaultValues: {
      [FormFields.Password]: "",
      [FormFields.NewPassword]: "",
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
              New Password
            </StyledText>
            <ControlledField
              fieldName={FormFields.Password}
              type="textInput"
              placeholder="Enter your email"
              label="New Password"
              iconLeft="password"
              secureTextEntry
            />
            <ControlledField
              fieldName={FormFields.NewPassword}
              type="textInput"
              placeholder="Confirm New Password"
              label="Confirm New Password"
              iconLeft="password"
              secureTextEntry
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
