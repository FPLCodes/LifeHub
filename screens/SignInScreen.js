import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const SignInScreen = ({ navigation }) => {
  const signIn = () => {
    navigation.navigate("Todo");
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={signIn}>
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
