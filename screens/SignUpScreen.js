import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState("Male");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const signUp = () => {
    if (password !== confirmPass) setError("confirmPass");
    else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          await setDoc(doc(db, "users", user.uid), {
            username: username,
            firstName: first,
            lastName: last,
            birthdate: date,
          });
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          navigation.navigate("Todo");
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
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View
        style={{
          flex: 1,
          marginTop: 65,
          alignSelf: "stretch",
        }}
      >
        <View
          style={{
            alignSelf: "flex-start",
            marginBottom: 30,
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
      <View style={{ flex: 5, alignSelf: "stretch", paddingHorizontal: 30 }}>
        {/*------------- Name ------------*/}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={{ paddingRight: 15, width: "50%" }}>
            <Text>First name</Text>
            <TextInput
              style={error === "first" ? styles.invalidInput : styles.input}
              placeholder="John"
              value={first}
              onChangeText={(text) => setFirst(text)}
            />
          </View>
          <View style={{ paddingLeft: 15, width: "50%" }}>
            <Text>Last name</Text>
            <TextInput
              style={error === "last" ? styles.invalidInput : styles.input}
              placeholder="Smith"
              value={last}
              onChangeText={(text) => setLast(text)}
            />
          </View>
        </View>
        {/*------------- Username ------------*/}
        <Text style={{ marginTop: 10 }}>Username</Text>
        <TextInput
          style={error === "username" ? styles.invalidInput : styles.input}
          placeholder="johnsmith123"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        {/*------------- Birthdate ------------*/}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <View style={{ width: "50%", paddingRight: 15 }}>
            <Text>Birthdate</Text>
            <View
              style={{
                backgroundColor: "silver",
                padding: 6,
                marginVertical: 3,
                borderRadius: 6,
              }}
            >
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                onChange={onChange}
                is24Hour={true}
                display="default"
                style={{ marginRight: 15 }}
              />
            </View>
          </View>
          <View style={{ width: "50%", paddingLeft: 15 }}>
            <Text>Gender</Text>
            <Pressable onPress={() => setOpen(true)} style={styles.input}>
              <Text>{gender}</Text>
            </Pressable>
          </View>
        </View>
        {/*------------- Email ------------*/}
        <Text style={{ marginTop: 10 }}>Email</Text>
        <TextInput
          style={error === "email" ? styles.invalidInput : styles.input}
          placeholder="johnsmith123@gmail.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {error === "email" && (
          <Text style={{ marginBottom: 5 }}>Invalid email</Text>
        )}
        {/*------------- Password ------------*/}
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
        <Text style={{ marginTop: 10 }}>Confirm password</Text>
        <TextInput
          style={
            error === "confirmPassword" ? styles.invalidInput : styles.input
          }
          placeholder="*******"
          value={confirmPass}
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPass(text)}
        />
        {error === "confirmPassword" && (
          <Text style={{ marginBottom: 5 }}>Password does not match</Text>
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
    marginVertical: 3,
    paddingVertical: 15,
    borderRadius: 6,
  },
  invalidInput: {
    backgroundColor: "silver",
    padding: 10,
    marginVertical: 3,
    paddingVertical: 15,
    borderRadius: 6,
    borderColor: "tomato",
    borderWidth: 1,
  },
});
