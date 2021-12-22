import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const SignInScreen = ({ navigation }) => {
  const signUp = () => {
    navigation.navigate("SignIn");
  };
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch", paddingHorizontal: 30 }}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" />
        <Pressable onPress={signUp} style={styles.signUpBtn}>
          <Text style={{ textAlign: "center" }}>Sign up</Text>
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
  signUpBtn: {
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
