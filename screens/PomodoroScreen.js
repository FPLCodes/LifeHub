import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

const Pomodoro = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Icon
        name="clock"
        type="feather"
        size={28}
        color="gray"
        style={{ marginBottom: 10 }}
      />
      <Text>Pomodoro timer (coming soon)</Text>
    </View>
  );
};

export default Pomodoro;

const styles = StyleSheet.create({});
