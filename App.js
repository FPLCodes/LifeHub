import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Switch,
  StatusBar,
} from "react-native";
import List from "./components/List.js";
import { Icon } from "react-native-elements";
import * as Haptics from "expo-haptics";

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: "white",
    paddingHorizontal: 8,
  },
  containerDark: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: "#2b3342",
    paddingHorizontal: 8,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleLight: {
    marginLeft: 5,
    marginBottom: 8,
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  titleDark: {
    marginLeft: 5,
    marginBottom: 8,
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  itemLight: {
    flexDirection: "row",
    backgroundColor: "#e3e1e1",
    justifyContent: "space-between",
    marginTop: 6,
    borderRadius: 6,
    minHeight: 50,
  },
  itemDark: {
    flexDirection: "row",
    backgroundColor: "#4c5464",
    justifyContent: "space-between",
    marginTop: 6,
    borderRadius: 6,
    minHeight: 50,
  },
  taskLight: {
    fontSize: 18,
    paddingLeft: 8,
    textAlign: "left",
    color: "black",
  },
  taskDark: {
    fontSize: 18,
    paddingLeft: 8,
    textAlign: "left",
    color: "white",
  },
  addBtn: {
    padding: 10,
    paddingHorizontal: 14,
    backgroundColor: "powderblue",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});

const ToDo = () => {
  const [text, onChangeText] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      key: "A very long task example lmao idk what else to write oopsie",
      date: "Today",
      tags: "Home",
      completed: false,
    },
    { id: 2, key: "Task 2", date: "Today", tags: "Home", completed: true },
    {
      id: 3,
      key: "Task 3",
      date: "Tomorrow",
      tags: "School",
      completed: false,
    },
    { id: 4, key: "Task 4", date: "", tags: "", completed: false },
    { id: 5, key: "Task 5", date: "Sunday", tags: "", completed: false },
    {
      id: 6,
      key: "Task 6",
      date: "Yesterday",
      tags: "School",
      completed: true,
    },
    {
      id: 7,
      key: "Task 7",
      date: "",
      tags: "",
      completed: true,
    },
  ]);
  const [isDark, setDark] = useState(false);

  const addTask = () => {
    if (text !== "")
      setData([
        ...data,
        {
          id: data.length + 1,
          key: text,
          date: "",
          tags: "",
          completed: false,
        },
      ]);
    onChangeText("");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const removeItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const toggleSwitch = () => {
    setDark((previousState) => !previousState);
  };

  return (
    <View style={isDark ? styles.containerDark : styles.containerLight}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={{ marginTop: 100 }}>
        <View style={styles.topBar}>
          <Text style={isDark ? styles.titleDark : styles.titleLight}>
            Tasks
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Switch
              style={{ marginRight: 5, marginTop: 2 }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isDark}
            />
          </View>
        </View>
        <View style={isDark ? styles.itemDark : styles.itemLight}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextInput
              style={isDark ? styles.taskDark : styles.taskLight}
              onChangeText={onChangeText}
              defaultValue={text}
              placeholder="New task"
              placeholderTextColor={"gray"}
            />
          </View>
          <Pressable onPress={addTask} style={styles.addBtn}>
            <Icon type="feather" name="plus" size={26}>
              +
            </Icon>
          </Pressable>
        </View>
      </View>
      <List tasks={data} isDark={isDark} />
    </View>
  );
};

export default ToDo;
