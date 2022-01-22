import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  StatusBar,
  Modal,
  Switch,
} from "react-native";
import List from "../components/List";
import Profile from "../components/Profile";
import { Icon } from "react-native-elements";
import * as Haptics from "expo-haptics";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { Surface, Avatar } from "@react-native-material/core";

const ToDo = ({ navigation }) => {
  const [text, onChangeText] = useState("");
  const [data, setData] = useState([]);
  const [ID, setID] = useState(0);
  const [state, setState] = useState({});
  const [isDark, setDark] = useState(false);
  const [user, setUser] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const addTask = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const task = text;
    onChangeText("");

    if (text !== "") {
      await updateDoc(doc(db, "todos", auth.currentUser?.uid), {
        tasks: arrayUnion({
          completed: false,
          id: ID + 1,
          key: task,
          tags: "",
        }),
      });
      setID(ID + 1);
    }
  };

  const toggleSwitch = () => {
    setDark((previousState) => !previousState);
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.replace("Auth");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, "users", auth.currentUser?.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      }

      const tasksRef = doc(db, "todos", auth.currentUser?.uid);
      const tasksSnap = await getDoc(tasksRef);
      if (tasksSnap.exists()) {
        setID(tasksSnap.data().tasks.length);
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
      <Modal animationType="slide" visible={showProfile} transparent={true}>
        <View style={isDark ? styles.profileModalDark : styles.profileModal}>
          <View style={isDark ? styles.modalBoxDark : styles.modalBox}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isDark}
                style={{ margin: 3 }}
              />
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
                  color={isDark && "white"}
                  style={{ alignSelf: "flex-end" }}
                />
              </Pressable>
            </View>
            <Profile isDark={isDark} user={user} />
            <Pressable onPress={signOut} style={styles.signOutBtn}>
              <Text style={{ textAlign: "center", fontSize: 16 }}>
                Sign out
              </Text>
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
            style={{ marginTop: -10, marginBottom: 5 }}
            onPress={() => {
              setShowProfile(true);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Avatar
              label={`${user.firstName} ${user.lastName}`}
              autoColor
              size={48}
            />
          </Pressable>
        </View>
        <Surface
          elevation={1}
          style={isDark ? styles.itemDark : styles.itemLight}
        >
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
        </Surface>
      </View>
      <List isDark={isDark} />
    </View>
  );
};

export default ToDo;

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    paddingBottom: 50,
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
    marginTop: 50,
    borderRadius: 6,
  },
  profileIcon: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    backgroundColor: "lightgray",
    marginRight: 5,
    marginTop: -15,
  },
  profileModal: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "aliceblue",
    marginTop: 145,
  },
  profileModalDark: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#2b3342",
    marginTop: 145,
  },
  modalBox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "silver",
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: "aliceblue",
  },
  modalBoxDark: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#525f6d",
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: "#525f6d",
  },
});
