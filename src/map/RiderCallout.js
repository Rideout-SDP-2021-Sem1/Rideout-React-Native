import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  calloutContainer: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
  usernameTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bikeDetailTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  request: {
    backgroundColor: "#27afe2",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    height: 55,
    textAlign: "center",
    textAlignVertical: "top",
    paddingTop: 13,
    borderRadius: 10,
  },
});

const RiderCallout = (props) => {
  return (
    <View style={styles.calloutContainer}>
      <Text style={styles.usernameTitle}>{props.rider.nickname + " "}</Text>
      <Text>License:{" " + props.rider.license}</Text>
      <Text>Pace: {" " + props.rider.pace}</Text>
      <Text style={styles.bikeDetailTitle}>Bike detail: </Text>
      <Text>
        {props?.rider?.make ? String(props?.rider?.make).trim() + " " : ""}
        {props?.rider?.model ? String(props?.rider?.model).trim() + " " : ""}
      </Text>
      <Text style={styles.request}>REQUEST RIDEOUT</Text>
    </View>
  );
};

export default RiderCallout;
