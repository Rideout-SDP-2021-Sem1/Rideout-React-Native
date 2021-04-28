import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text, TextInput } from "react-native";

function GroupPost(props) {
  return (
    <View style={styles.container}>
      <View style={styles.scrollArea}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.maximumAttendantsRow}>
            <Text style={styles.maximumAttendants}>Maximum Attendants</Text>
            <TextInput placeholder="Num" style={styles.textInput}></TextInput>
            <View style={styles.dATEStack}>
              <TextInput placeholder="DATE" style={styles.dATE}></TextInput>
              <TextInput placeholder="TIME" style={styles.time}></TextInput>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollArea: {
    width: 360,
    height: 622,
    backgroundColor: "#E6E6E6",
    marginTop: 87
  },
  scrollArea_contentContainerStyle: {
    height: 622,
    width: 360,
    flexDirection: "row"
  },
  maximumAttendants: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 21,
    width: 138,
    marginTop: 3
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 21,
    width: 61,
    textAlign: "left",
    marginTop: 2
  },
  dATE: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 24,
    width: 85,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  time: {
    top: 18,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 24,
    width: 85,
    textAlign: "center",
    textDecorationLine: "underline",
    left: 0
  },
  dATEStack: {
    width: 85,
    height: 42,
    marginLeft: 71
  },
  maximumAttendantsRow: {
    height: 42,
    flexDirection: "row",
    flex: 1,
    marginLeft: 5,
    marginTop: 18
  }
});

export default GroupPost;
