import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, StatusBar } from "react-native";
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
      <StatusBar barStyle={"dark-content"} />
      <View style={{ flex: 1, marginTop: 150 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 60, fontWeight: "bold" }}>Life</Text>
          <Text style={styles.HUB}>Hub</Text>
        </View>
      </View>
      <View style={{ flex: 3, alignSelf: "stretch", paddingHorizontal: 40 }}>
        <Text>Email</Text>
        <TextInput
          style={error === "email" ? styles.invalidInput : styles.input}
          placeholder="johnsmith123@gmail.com"
          value={email}
          keyboardType={"email-address"}
          onChangeText={(text) => setEmail(text)}
        />
        {error === "email" && (
          <Text style={{ marginBottom: 5, color: "tomato" }}>
            Invalid email
          </Text>
        )}
        <Text style={{ marginTop: 10 }}>Password</Text>
        <TextInput
          style={error === "password" ? styles.invalidInput : styles.input}
          placeholder="********"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        {error === "password" && (
          <Text style={{ marginBottom: 5, color: "tomato" }}>
            Incorrect password
          </Text>
        )}
        <Pressable onPress={signIn} style={styles.signInBtn}>
          <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>
            Sign in
          </Text>
        </Pressable>
        <Pressable onPress={signUp} style={{ marginTop: 10 }}>
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
    paddingVertical: 15,
    backgroundColor: "royalblue",
    marginTop: 15,
    borderRadius: 6,
  },
  input: {
    backgroundColor: "silver",
    padding: 10,
    marginVertical: 5,
    paddingVertical: 15,
    borderRadius: 6,
  },
  invalidInput: {
    backgroundColor: "silver",
    padding: 10,
    marginVertical: 5,
    paddingVertical: 15,
    borderRadius: 6,
    borderColor: "tomato",
    borderWidth: 1,
  },
  HUB: {
    fontSize: 60,
    fontWeight: "bold",
    color: "skyblue",
    borderColor: "black",
    textShadowColor: "steelblue",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
