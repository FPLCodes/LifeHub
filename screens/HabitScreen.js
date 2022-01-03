import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

const HabitScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Icon
        name="calendar"
        type="feather"
        size={28}
        color="gray"
        style={{ marginBottom: 10 }}
      />
      <Text>Habit tracker (coming soon)</Text>
    </View>
  );
};

export default HabitScreen;

const styles = StyleSheet.create({});
