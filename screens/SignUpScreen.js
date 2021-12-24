import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../firebase";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
        navigation.navigate("SignIn");
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch", paddingHorizontal: 30 }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          keyboardType={"email-address"}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
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
