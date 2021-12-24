import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../firebase";
import * as Haptics from "expo-haptics";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Todo");
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.replace("Todo");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      })
      .catch((error) => {
        console.log(error.code);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        if (error.code === "auth/invalid-email") setError("email");
        else if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/internal-error"
        )
          setError("password");
      });
  };

  const signUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch", paddingHorizontal: 30 }}>
        <TextInput
          style={error === "email" ? styles.invalidInput : styles.input}
          placeholder="Email"
          value={email}
          keyboardType={"email-address"}
          onChangeText={(text) => setEmail(text)}
        />
        {error === "email" && (
          <Text style={{ marginBottom: 5 }}>Invalid email</Text>
        )}
        <TextInput
          style={error === "password" ? styles.invalidInput : styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        {error === "password" && (
          <Text style={{ marginBottom: 5 }}>Incorrect password</Text>
        )}
        <Pressable onPress={signIn} style={styles.signInBtn}>
          <Text style={{ textAlign: "center" }}>Sign in</Text>
        </Pressable>
        <Pressable
          onPress={signUp}
          style={{ marginTop: 10 }}
          disabled={!email || !password}
        >
          <Text style={{ textAlign: "right", color: "steelblue" }}>
            Create account
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
  invalidInput: {
    backgroundColor: "silver",
    padding: 10,
    marginVertical: 5,
    borderColor: "red",
    borderWidth: 1,
  },
});
