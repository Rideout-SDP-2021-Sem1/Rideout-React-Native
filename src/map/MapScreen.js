import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

const Map = () => {
    const DUMMY_RIDER_LOCATIONS = [
        {id: 0, latitude: -36.80, longitude: 174.60, nickname: 'rider 1'},
        {id: 1, latitude: -36.60, longitude: 174.70, nickname: 'rider 2'},
        {id: 2, latitude: -36.60, longitude: 174.30, nickname: 'rider 3'},
        {id: 3, latitude: -36.85, longitude: 174.76, nickname: 'rider 4'}
    ]

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: -36.85087,
                    longitude: 174.7645,
                    latitudeDelta: 0.030,
                    longitudeDelta: 0.0242,
                }}
                showsUserLocation = {true}
                userLocationPriority = {'high'}
                userLocationAnnotationTitle = {'Me'}
                followsUserLocation = {true}
                showsMyLocationButton = {false}
                showsTraffic = {false}
                >
                    {DUMMY_RIDER_LOCATIONS.map(DUMMY_RIDER_LOCATIONS => {return <Marker
                        key = {DUMMY_RIDER_LOCATIONS.id}
                        coordinate={{
                            latitude: DUMMY_RIDER_LOCATIONS.latitude,
                            longitude: DUMMY_RIDER_LOCATIONS.longitude
                        }}
                        title = {DUMMY_RIDER_LOCATIONS.nickname}
                        >
                            <Image 
                                source={require('./rider_marker_solid.png')}
                                style={{width: 28, height: 30}}
                                resizeMode="contain"
                                resizeMethod="resize"
                            />
                        </Marker>})}
            </MapView>
        </View>
    )
}

export default Map;