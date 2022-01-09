import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Icon } from "react-native-elements";
import * as Haptics from "expo-haptics";
import Task from "./Task.js";
import { Surface } from "@react-native-material/core";
import { auth, db } from "../firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const List = (props) => {
  const [state, setState] = useState({});
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");
  const [text, onChangeText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tag, setTag] = useState("");

  useEffect(() => {
    const tasksSub = onSnapshot(
      doc(db, "todos", auth.currentUser?.uid),
      (snapshot) => {
        const data = snapshot.data();
        setData(data.tasks);
        setTask(data[0]);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      setState({});
    };
  }, []);

  const completeTask = async (task) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await updateDoc(doc(db, "todos", auth.currentUser?.uid), {
      tasks: arrayRemove(task),
    });

    task.completed = !task.completed;

    await updateDoc(doc(db, "todos", auth.currentUser?.uid), {
      tasks: arrayUnion(task),
    });
  };

  const removeItem = (id) => {
    setData(data.filter((item) => item.id !== id));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const editTask = (task) => {
    setIsEditing(!isEditing);
    setTask(task);
    setTag(task.tags);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const changeTag = (tag) => {
    let arr = data;
    if (arr[task.id - 1].tags === tag) {
      arr[task.id - 1].tags = "";
      setTag("");
    } else {
      arr[task.id - 1].tags = tag;
      setTag(tag);
    }
    setData(arr);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const doneEditing = () => {
    if (text) {
      let arr = data;
      arr[task.id - 1].key = text;
      setData(arr);
      setIsEditing(!isEditing);
    } else setIsEditing(!isEditing);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const deleteButton = (id) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "lightcoral",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Pressable
          style={{
            width: 60,
            flex: 1,
            justifyContent: "center",
          }}
          onPress={() => removeItem(id)}
        >
          <Icon name="trash-2" type="feather" size={28} />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{ flex: 5 }}>
      <View>
        <Text style={props.isDark ? styles.toDoDark : styles.toDoLight}>
          To-do
        </Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isEditing}
          onRequestClose={() => {
            setIsEditing(false);
          }}
        >
          <View style={props.isDark ? styles.taskModalDark : styles.taskModal}>
            <Surface elevation={3} style={styles.modalContainer}>
              <TextInput
                defaultValue={""}
                onChangeText={onChangeText}
                style={styles.taskEditInput}
              />
              <View
                style={{
                  backgroundColor: "lightgrey",
                  alignSelf: "stretch",
                  paddingVertical: 12,
                  alignItems: "flex-start",
                  borderRadius: 6,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch",
                    justifyContent: "space-evenly",
                    paddingVertical: 4,
                  }}
                >
                  <Pressable
                    style={
                      tag === "Home" ? styles.selectedTag : styles.unselectedTag
                    }
                    onPress={() => changeTag("Home")}
                  >
                    <Text style={{ color: "white" }}>Home</Text>
                  </Pressable>
                  <Pressable
                    style={
                      tag === "School"
                        ? styles.selectedTag
                        : styles.unselectedTag
                    }
                    onPress={() => changeTag("School")}
                  >
                    <Text style={{ color: "white" }}>School</Text>
                  </Pressable>
                  <Pressable
                    style={
                      tag === "Work" ? styles.selectedTag : styles.unselectedTag
                    }
                    onPress={() => changeTag("Work")}
                  >
                    <Text style={{ color: "white" }}>Work</Text>
                  </Pressable>
                </View>
              </View>
            </Surface>
            <Pressable
              onPress={() => doneEditing()}
              style={styles.doneBtn}
              elevation={1}
            >
              <Text style={{ textAlign: "center", fontSize: 16 }}>Done</Text>
            </Pressable>
          </View>
        </Modal>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {data.map((task) => {
            if (!task.completed)
              return (
                <Surface
                  elevation={1}
                  style={{
                    backgroundColor: "#e3e1e1",
                    flex: 1,
                    borderRadius: 6,
                    marginVertical: 3,
                  }}
                  key={task.id}
                >
                  <Swipeable renderRightActions={() => deleteButton(task.id)}>
                    <Pressable
                      style={props.isDark ? styles.itemDark : styles.itemLight}
                      onPress={() => editTask(task)}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "stretch",
                        }}
                      >
                        <View
                          style={{
                            width: 50,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Pressable
                            style={
                              props.isDark
                                ? styles.incompletedBtnDark
                                : styles.incompletedBtnLight
                            }
                            onPress={() => completeTask(task)}
                            hitSlop={{
                              top: 10,
                              bottom: 10,
                              left: 5,
                              right: 5,
                            }}
                          ></Pressable>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Pressable onPress={() => editTask(task)}>
                            <Task
                              task={task}
                              isDark={props.isDark}
                              taskComplete={task.completed}
                            />
                          </Pressable>
                        </View>
                      </View>
                    </Pressable>
                  </Swipeable>
                </Surface>
              );
          })}
        </ScrollView>
      </View>
      {data.find((task) => task.completed) && (
        <View>
          <Text
            style={props.isDark ? styles.completedDark : styles.completedLight}
          >
            Completed
          </Text>
          <ScrollView
            style={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {data.map((task) => {
              if (task.completed)
                return (
                  <Surface
                    elevation={1}
                    style={{
                      backgroundColor: "#e3e1e1",
                      flex: 1,
                      borderRadius: 6,
                      marginVertical: 3,
                    }}
                    key={task.id}
                  >
                    <Swipeable renderRightActions={() => deleteButton(task.id)}>
                      <View
                        style={
                          props.isDark ? styles.itemDark : styles.itemLight
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              width: 50,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Pressable
                              style={
                                props.isDark
                                  ? styles.completedBtnDark
                                  : styles.completedBtnLight
                              }
                              onPress={() => completeTask(task)}
                              hitSlop={{
                                top: 10,
                                bottom: 10,
                                left: 5,
                                right: 5,
                              }}
                            ></Pressable>
                          </View>
                          <Task
                            task={task}
                            isDark={props.isDark}
                            taskComplete={task.completed}
                          />
                        </View>
                      </View>
                    </Swipeable>
                  </Surface>
                );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  toDoLight: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    color: "black",
  },
  toDoDark: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    color: "white",
  },
  completedLight: {
    paddingVertical: 12,
    fontSize: 20,
    marginBottom: -10,
    color: "black",
  },
  completedDark: {
    paddingVertical: 12,
    fontSize: 20,
    marginBottom: -10,
    color: "white",
  },
  itemLight: {
    flexDirection: "row",
    backgroundColor: "#e3e1e1",
    justifyContent: "space-between",
    borderRadius: 6,
    minHeight: 50,
  },
  itemDark: {
    flexDirection: "row",
    backgroundColor: "#4c5464",
    justifyContent: "space-between",
    borderRadius: 6,
    minHeight: 50,
  },
  incompletedBtnLight: {
    backgroundColor: "#e3e1e1",
    borderRadius: 50,
    padding: 10,
    borderColor: "gray",
    borderWidth: 2,
  },
  incompletedBtnDark: {
    backgroundColor: "#4c5464",
    borderRadius: 50,
    padding: 10,
    borderColor: "gray",
    borderWidth: 2,
  },
  completedBtnLight: {
    backgroundColor: "lightblue",
    borderRadius: 50,
    padding: 10,
    borderColor: "gray",
    borderWidth: 2,
  },
  completedBtnDark: {
    backgroundColor: "lightblue",
    borderRadius: 50,
    padding: 10,
    borderColor: "gray",
    borderWidth: 2,
  },
  unselectedTag: {
    backgroundColor: "lightslategrey",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  selectedTag: {
    backgroundColor: "#515f6d",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  doneBtn: {
    backgroundColor: "lightsteelblue",
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignSelf: "stretch",
  },
  taskModal: {
    flex: 1,
    backgroundColor: "aliceblue",
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 6,
    paddingBottom: 30,
  },
  taskModalDark: {
    flex: 1,
    backgroundColor: "#525f6d",
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 6,
    paddingBottom: 30,
  },
  modalContainer: {
    backgroundColor: "slategray",
    paddingVertical: 20,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    borderRadius: 6,
  },
  taskEditInput: {
    backgroundColor: "lightgrey",
    alignSelf: "stretch",
    paddingVertical: 15,
    paddingHorizontal: 8,
    marginBottom: 20,
    marginHorizontal: 2,
    fontSize: 16,
    borderRadius: 6,
  },
});
