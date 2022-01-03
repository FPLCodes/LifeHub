import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

const FinanceScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Icon
        name="dollar-sign"
        type="feather"
        size={28}
        color="gray"
        style={{ marginBottom: 10 }}
      />
      <Text>Finance tracker (coming soon)</Text>
    </View>
  );
};

export default FinanceScreen;

const styles = StyleSheet.create({});
