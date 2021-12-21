import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  taskLight: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: "left",
    color: "black",
    alignSelf: "stretch",
  },
  taskDark: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: "left",
    color: "white",
    alignSelf: "stretch",
  },
  planeTask: {
    fontSize: 16,
    paddingVertical: 15,
    textAlign: "left",
    color: "black",
    maxWidth: 325,
  },
  planeTaskDark: {
    fontSize: 16,
    paddingVertical: 15,
    textAlign: "left",
    color: "white",
    maxWidth: 325,
  },
  tag: {
    padding: 1,
    paddingHorizontal: 6,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "lightslategrey",
    backgroundColor: "lightslategrey",
  },
  tagText: {
    fontSize: 13,
    color: "honeydew",
  },
  taskCompleteLight: {
    fontSize: 18,
    paddingVertical: 5,
    alignSelf: "center",
    textAlign: "left",
    maxWidth: 325,
    color: "black",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  taskCompleteDark: {
    fontSize: 18,
    paddingVertical: 5,
    alignSelf: "center",
    textAlign: "left",
    maxWidth: 325,
    color: "white",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});

const Task = (props) => {
  if (!props.taskComplete)
    return (
      <View>
        {props.task.date || props.task.tags ? (
          <Text style={props.isDark ? styles.taskDark : styles.taskLight}>
            {props.task.key}
          </Text>
        ) : (
          <Text style={props.isDark ? styles.planeTaskDark : styles.planeTask}>
            {props.task.key}
          </Text>
        )}
        {props.task.date || props.task.tags ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            {props.task.date ? (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{props.task.date}</Text>
              </View>
            ) : (
              <View></View>
            )}
            {props.task.tags ? (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{props.task.tags}</Text>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  else
    return (
      <Text
        style={
          props.isDark ? styles.taskCompleteDark : styles.taskCompleteLight
        }
      >
        {props.task.key}
      </Text>
    );
};
export default Task;
