import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import moment from "moment";

const styles = StyleSheet.create({
  calloutContainer: {
    width: "100%",
    height: "100%",
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  meetupDetailTitle: {
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
    paddingTop: 9,
  },
  date: {
    color: "grey",
    fontSize: 10,
  },
});

const GroupCallout = (props) => {
  return (
    <View style={styles.calloutContainer}>
      <Text style={styles.groupTitle}>{props.group.title}</Text>
      <Text style={styles.date}>
        Meetup Date: {moment(props.group.meetupTime).toString()}
      </Text>
      <Text>{props.group.description}</Text>
      <Text />
      <Text style={styles.meetupDetailTitle}>Meetup Details:</Text>
      <Text>Minimum License Level: {props.group.minimumLicenseLevel}</Text>
      <Text>Preferred Pace: {props.group.minimumPreferredPace}</Text>
      <Text>
        {props.group.currentAttendant}/{props.group.maximumAttendant} Riders
        RSVP'D
      </Text>
      <Text style={styles.request}>RSVP a Slot</Text>
    </View>
  );
};

export default GroupCallout;
