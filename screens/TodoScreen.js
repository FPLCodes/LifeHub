import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Switch,
  StatusBar,
  Modal,
} from "react-native";
import List from "../components/List";
import { Icon } from "react-native-elements";
import * as Haptics from "expo-haptics";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ToDo = ({ navigation }) => {
  const [text, onChangeText] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      key: "Swipe left to delete task",
      date: "Today",
      tags: "Home",
      completed: false,
    },
    {
      id: 2,
      key: "Tap the left button to undo completion",
      date: "Today",
      tags: "Home",
      completed: true,
    },
    {
      id: 3,
      key: "Tap to edit",
      date: "Tomorrow",
      tags: "School",
      completed: false,
    },
    {
      id: 4,
      key: "Press button on the left to complete task",
      date: "",
      tags: "",
      completed: false,
    },
    {
      id: 5,
      key: "Tap the top right icon for more settings",
      date: "Sunday",
      tags: "",
      completed: false,
    },
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
  const [state, setState] = useState({});
  const [isDark, setDark] = useState(false);
  const [user, setUser] = useState("");
  const [showProfile, setShowProfile] = useState(false);

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

  const toggleSwitch = () => {
    setDark((previousState) => !previousState);
  };

  const signOut = () => {
    auth.signOut().then(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.replace("SignIn");
    });
    setShowProfile(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, "users", auth.currentUser?.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      }
    };
    fetchData().catch((err) => console.log(err));

    return () => {
      setState({});
    };
  }, []);

  return (
    <View style={isDark ? styles.containerDark : styles.containerLight}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <Modal animationType="slide" visible={showProfile}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}
        >
          <View style={{ borderWidth: 1, marginHorizontal: 8 }}>
            <Pressable
              onPress={() => {
                setShowProfile(false);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Icon
                name="x"
                type="feather"
                size={32}
                style={{ alignSelf: "flex-end" }}
              />
            </Pressable>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isDark}
            />
            <Pressable onPress={signOut} style={styles.signOutBtn}>
              <Text style={{ textAlign: "center" }}>Sign out</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{ marginTop: 100 }}>
        <View style={styles.topBar}>
          <Text style={isDark ? styles.titleDark : styles.titleLight}>
            Welcome {user.username}
          </Text>
          <Pressable
            style={styles.profileIcon}
            onPress={() => {
              setShowProfile(true);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Icon name="user" type="feather" size={32} />
          </Pressable>
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
            <Icon type="feather" name="plus" size={26} />
          </Pressable>
        </View>
      </View>
      <List tasks={data} isDark={isDark} />
    </View>
  );
};

export default ToDo;

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
    alignItems: "center",
  },
  titleLight: {
    marginLeft: 5,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  titleDark: {
    marginLeft: 5,
    marginBottom: 8,
    fontSize: 20,
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
  signOutBtn: {
    paddingVertical: 15,
    backgroundColor: "lightcoral",
    marginTop: 15,
    borderRadius: 6,
  },
  profileIcon: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    backgroundColor: "lightgray",
    marginRight: 5,
    marginTop: -5,
  },
});
