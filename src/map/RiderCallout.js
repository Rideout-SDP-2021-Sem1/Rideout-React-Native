import React from 'react'
import { View, Text, Button } from 'react-native'

const RiderCallout = (props) => {
    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.rider.nickname}</Text>
            <Text>License Level: {props.rider.license}</Text>
            <Text>Preferred Pace: {props.rider.pace}</Text>
            <Text />
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Bike detail: </Text>
            <Text>{props.rider.year || ""} {props.rider.make} {props.rider.model}</Text>
            <Text>Engine size: {props.rider.size}cc</Text>
            <Button title="Rideout" />
        </View>
    )
}

export default RiderCallout