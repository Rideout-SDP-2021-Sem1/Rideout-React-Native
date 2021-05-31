import React from "react";
import { View, Text, Button, StyleSheet, PanResponder } from "react-native";

const styles = StyleSheet.create({
  calloutContainer: {
    borderWidth: 5,
    borderColor: "#27afe2",
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 5,
  },
  usernameTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bikeDetailTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    height: 5,
  },
  request: {
    backgroundColor: "#27afe2",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "top",
    paddingTop: 15,
  },
});

const RiderCallout = (props) => {
  return (
    <View style={styles.calloutContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.usernameTitle}>{props.rider.nickname + " "}</Text>
        <Text>License:{" " + props.rider.license}</Text>
        <Text>Pace: {" " + props.rider.pace}</Text>
        <Text style={styles.bikeDetailTitle}>Bike detail: </Text>
        <Text>
          {props?.rider?.make ? String(props?.rider?.make).trim() + " " : ""}
          {props?.rider?.model ? String(props?.rider?.model).trim() + " " : ""}
        </Text>
      </View>
      <Text style={styles.request}>REQUEST RIDEOUT</Text>
    </View>
  );
};

export default RiderCallout;
