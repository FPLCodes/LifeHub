import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Switch } from "react-native";
import { Icon } from "react-native-elements";
import * as Haptics from "expo-haptics";
import { auth } from "../firebase";

const Profile = (props) => {
  const user = props.user;
  const isDark = props.isDark;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <Icon
          name="user"
          type="feather"
          size={42}
          style={{
            borderWidth: 2,
            borderRadius: 25,
            marginTop: 25,
            marginBottom: 30,
            marginRight: 10,
            backgroundColor: "silver",
          }}
        />
        <Text style={isDark ? styles.usernameDark : styles.username}>
          {user.username}
        </Text>
      </View>
      <View style={isDark ? styles.textWrapDark : styles.textWrap}>
        <Text style={isDark ? styles.profileTextDark : styles.profileText}>
          Name: {user.firstName} {user.lastName}
        </Text>
      </View>
      <View style={isDark ? styles.textWrapDark : styles.textWrap}>
        <Text style={isDark ? styles.profileTextDark : styles.profileText}>
          Email: {auth.currentUser?.email}
        </Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  textWrap: {
    backgroundColor: "lightgray",
    borderRadius: 5,
    marginTop: 12,
    padding: 5,
  },
  textWrapDark: {
    backgroundColor: "slategray",
    borderRadius: 5,
    marginTop: 12,
    padding: 5,
  },
  profileText: {
    fontSize: 16,
    padding: 5,
  },
  profileTextDark: {
    fontSize: 16,
    padding: 5,
    color: "white",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
  usernameDark: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
    color: "white",
  },
});
