import { StyledButton, StyledText, TextInput, View } from "@aurora/components";
import { Link } from "expo-router";
import { AuthLayout } from "../components/AuthLayout";

export function LoginScreen() {
  return (
    <AuthLayout>
      <StyledText fontWeight={"$black"} variant="Heading4xl">
        Log In
      </StyledText>
      <View gap={"$space.xl"}>
        <StyledText variant="Heading4xl">Welcome Back to MDP</StyledText>
        <View gap={"$m"}>
          <TextInput borderRadius={"$s"} placeholder="Enter your email" />
          <View>
            <TextInput borderRadius={"$s"} placeholder="Enter your password" secureTextEntry />
            <Link
              style={{
                alignSelf: "flex-end",
              }}
              href={"/auth/forgot-password"}>
              <StyledText color={"$primary800"} padding="$space.s" variant="BodyBoldsm">
                Forgot your password?
              </StyledText>
            </Link>
          </View>
        </View>
        <StyledButton>Login</StyledButton>
        <View w={"100%"} alignItems="center">
          <View flexDirection="row" paddingBottom={"$3xl"} gap={"$space.sm"} alignItems="center">
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
  );
}
