import { AlertDialog, StyledButton, StyledText, YStack } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { useState, useImperativeHandle, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

type Message = { title: string; message: string };

type Alert = { showAlert: ({ title, message }: Message) => void; hideMessage: () => void };

class AlertManager {
  currentAlert: Alert | null = null;
  enabled: boolean = true;

  get isEnabled(): boolean {
    return this.enabled;
  }

  register(instance: Alert | null): void {
    if (!this.currentAlert) {
      this.currentAlert = instance;
    }
  }

  getCurrent(): Alert | null {
    return this.currentAlert;
  }
}

const alertManager = new AlertManager();

export function showAlert(message: Message) {
  if (alertManager.enabled) {
    const ref = alertManager.getCurrent();
    if (ref) ref.showAlert(message);
  }
}

export function hideAlert() {
  if (!!alertManager.enabled) {
    const ref = alertManager.getCurrent();
    if (!!ref) ref.hideMessage();
  }
}

export const Alert = () => {
  const [message, setMessage] = useState<Message>({ message: "", title: "" });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { t } = useTranslation();
  const messageRef = useRef<Alert | null>(null);
  useImperativeHandle(messageRef, () => {
    return {
      showAlert(message: Message) {
        toggleModal(true);
        setMessage(message);
      },

      hideMessage() {
        toggleModal(false);
      },
    };
  }, []);

  const toggleModal = (status: boolean) => setModalVisible(status);

  useEffect(() => {
    alertManager.register(messageRef.current);
  }, [messageRef]);
  return (
    <AlertDialog native open={modalVisible}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          width={500}
          elevate
          key="content"
          borderRadius="$m"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}>
          <YStack space gap="$m" width={"100%"}>
            <YStack gap="$s" justifyContent="center" alignItems="center">
              <Icon name="error" />
              <AlertDialog.Title>
                <StyledText variant="Headingl">{message.title}</StyledText>
              </AlertDialog.Title>
              <AlertDialog.Description>
                <StyledText variant="BodyBoldm">{message.message}</StyledText>
              </AlertDialog.Description>
            </YStack>

            <AlertDialog.Action asChild>
              <StyledButton onPress={() => toggleModal(false)} theme="active">
                {t("buttons.cancel")}
              </StyledButton>
            </AlertDialog.Action>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};
