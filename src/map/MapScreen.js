import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

const Map = () => {
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                >
            </MapView>
        </View>
    )
}

export default Map;