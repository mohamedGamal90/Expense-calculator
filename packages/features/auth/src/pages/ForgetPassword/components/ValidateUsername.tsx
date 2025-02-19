import { ControlledField } from "@aurora/blocks";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, set, useForm } from "react-hook-form";
import * as yup from "yup";
import i18n from "i18next";
import { useValidateUsernameMutation } from "../../../hooks";
import { useRouter } from "expo-router";
import { errorHandler } from "@aurora/utils";
import { useTranslation } from "react-i18next";
import { Form, StyledButton } from "@aurora/components";

enum FormFields {
  Username = "username",
}

const validateUsernameSchema = yup.object().shape({
  [FormFields.Username]: yup.string().required(i18n.t("validation.required")),
});

type FormValues = yup.InferType<typeof validateUsernameSchema>;

export function ValidateUsername({
  setStep,
  setUsername,
}: {
  setStep: (step: "VALIDATE_USERNAME" | "RESET_PASSWORD") => void;
  setUsername: (username: string) => void;
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const form = useForm({
    resolver: yupResolver(validateUsernameSchema),
    defaultValues: {
      [FormFields.Username]: "",
    },
  });

  const { isPending, mutate: validateUsername } = useValidateUsernameMutation({
    onSuccess: (_data, { username }) => {
      setUsername(username);
      setStep("RESET_PASSWORD");
    },
    onError: error => errorHandler(error),
  });

  function handleSubmit(data: FormValues) {
    validateUsername(data);
  }

  const disabled = !(form.watch().username.length > 0);

  return (
    <Form flex={1} onSubmit={form.handleSubmit(handleSubmit)}>
      <FormProvider {...form}>
        <ControlledField
          fieldName={FormFields.Username}
          type="textInput"
          placeholder={t("placeholders.username")}
          label={t("inputs.username")}
          iconLeft="email"
        />
        <Form.Trigger mt="$m" asChild>
          <StyledButton disabled={disabled} isLoading={isPending}>
            {t("buttons.submit")}
          </StyledButton>
        </Form.Trigger>
      </FormProvider>
    </Form>
  );
}
