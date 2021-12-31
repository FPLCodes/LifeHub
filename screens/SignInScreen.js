import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import { auth } from "../firebase";
import * as Haptics from "expo-haptics";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.replace("Todo");
      })
      .catch((error) => {
        console.log(error.code);
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
      <View style={{ flex: 3, alignSelf: "stretch", paddingHorizontal: 30 }}>
        <Text>Email</Text>
        <View style={error === "email" ? styles.invalidInput : styles.input}>
          <Icon
            name="mail"
            type="feather"
            size={24}
            color="gray"
            style={{ marginRight: 6 }}
          />
          <TextInput
            placeholder="johnsmith123@gmail.com"
            value={email}
            keyboardType={"email-address"}
            onChangeText={(text) => setEmail(text)}
            style={{ flexGrow: 1, alignSelf: "stretch" }}
          />
        </View>
        {error === "email" && (
          <Text style={{ marginBottom: 5, color: "tomato" }}>
            Invalid email
          </Text>
        )}
        <Text style={{ marginTop: 10 }}>Password</Text>
        <View style={error === "email" ? styles.invalidInput : styles.input}>
          <Icon
            name="lock"
            type="feather"
            size={24}
            color="gray"
            style={{ marginRight: 6 }}
          />
          <TextInput
            placeholder="********"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            style={{ flexGrow: 1, alignSelf: "stretch" }}
          />
        </View>
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
        <Pressable onPress={signUp} style={{ marginTop: 12 }}>
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
    flexDirection: "row",
    backgroundColor: "silver",
    padding: 10,
    marginVertical: 5,
    paddingVertical: 15,
    borderRadius: 6,
  },
  invalidInput: {
    flexDirection: "row",
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
