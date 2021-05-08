import React from 'react'
import Callout from 'react-native-maps'
import { View, Text } from 'react-native'

function RiderCallout() {
    return (
        <Callout style={{ width: 250, height: 250 }}>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{currentObj.nickname}</Text>
                <Text>License Level: {currentObj.license}</Text>
                <Text>Preferred Pace: {currentObj.pace}</Text>
                <Text />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Bike detail: </Text>
                <Text>{currentObj.year || ""} {currentObj.make} {currentObj.model}</Text>
                <Text>Engine size: {currentObj.size}cc</Text>
                <Button title="Rideout" />
            </View>
        </Callout>
    )
}

export default RiderCallout