import React from 'react'
import { View, Text, Button } from 'react-native'
import moment from 'moment'

const GroupCallout = (props) => {
    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.group.title}</Text>
            <Text style={{ fontSize: 10, color: '#808080' }}>Meetup Date: {moment(props.group.meetupTime).toString()}</Text>
            <Text>{props.group.description}</Text>
            <Text />
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Meetup Details:</Text>
            <Text>Minimum License Level: {props.group.minimumLicenseLevel}</Text>
            <Text>Preferred Pace: {props.group.minimumPreferredPace}</Text>
            <Text>{props.group.currentAttendant}/{props.group.maximumAttendant} Riders RSVP'D</Text>
            <Button title="RSVP a Slot" />
            <Text style={{ textAlign: 'center', fontSize: 10, color: '#808080' }}>Meetup in:</Text>
            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>00:00:00</Text>
        </View>
    )
}

export default GroupCallout