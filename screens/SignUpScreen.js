import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, StatusBar } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../firebase";
import * as Haptics from "expo-haptics";
import { Icon } from "react-native-elements";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        console.log(error.code);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        if (error.code === "auth/invalid-email") setError("email");
        else if (
          error.code === "auth/weak-password" ||
          error.code === "auth/internal-error"
        )
          setError("password");
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View
        style={{
          flex: 1,
          marginTop: 75,
          marginBottom: 60,
          alignSelf: "stretch",
        }}
      >
        <View
          style={{
            alignSelf: "flex-start",
            marginBottom: 120,
            paddingLeft: 10,
          }}
        >
          <Pressable onPress={() => navigation.navigate("SignIn")}>
            <Icon
              type="feather"
              name="arrow-left"
              size={26}
              style={{ padddingBottom: 30 }}
            />
          </Pressable>
        </View>
        <Text style={{ fontSize: 26, textAlign: "center" }}>
          Sign up for LifeHub
        </Text>
      </View>
      <View style={{ flex: 3, alignSelf: "stretch", paddingHorizontal: 30 }}>
        <Text>Email</Text>
        <TextInput
          style={error === "email" ? styles.invalidInput : styles.input}
          placeholder="johnsmith123@gmail.com"
          value={email}
          keyboardType={"email-address"}
          onChangeText={(text) => setEmail(text)}
        />
        {error === "email" && (
          <Text style={{ marginBottom: 5 }}>Invalid email</Text>
        )}
        <Text style={{ marginTop: 10 }}>Password</Text>
        <TextInput
          style={error === "password" ? styles.invalidInput : styles.input}
          placeholder="*******"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        {error === "password" && (
          <Text style={{ marginBottom: 5 }}>
            Password must be at least 6 characters
          </Text>
        )}
        <Pressable onPress={signUp} style={styles.signUpBtn}>
          <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>
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
  signUpBtn: {
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
});
