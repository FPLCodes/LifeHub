import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const SignInScreen = ({ navigation }) => {
  const signIn = () => {
    navigation.navigate("Todo");
  };

  const signUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch", paddingHorizontal: 30 }}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" />
        <Pressable onPress={signIn} style={styles.signInBtn}>
          <Text style={{ textAlign: "center" }}>Sign in</Text>
        </Pressable>
        <Pressable onPress={signUp} style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "right", color: "steelblue" }}>
            Sign up
          </Text>
        </Pressable>
      </View>
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
  signInBtn: {
    padding: 15,
    backgroundColor: "silver",
    marginTop: 10,
  },
  input: {
    backgroundColor: "silver",
    padding: 10,
    marginVertical: 5,
  },
});
