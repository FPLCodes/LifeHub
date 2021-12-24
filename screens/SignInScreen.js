import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../firebase";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        navigation.navigate("Todo");
      })
      .catch((error) => console.log(error.message));
  };

  const signUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch", paddingHorizontal: 30 }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable onPress={signIn} style={styles.signInBtn}>
          <Text style={{ textAlign: "center" }}>Sign in</Text>
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
