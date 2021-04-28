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
        {id: 0, latitude: -36.1, longitude: 174.4, nickname: 'rider1'},
        {id: 1, latitude: -36.3, longitude: 174.3, nickname: 'rider2'},
        {id: 2, latitude: -36.2, longitude: 174.5, nickname: 'rider3'},
        {id: 3, latitude: -36.0, longitude: 174.1, nickname: 'rider4'}
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
                                style={{width: 36, height: 36}}
                                resizeMethod="resize"
                                resizeMode="contain"
                            />
                        </Marker>})}
            </MapView>
        </View>
    )
}

export default Map;