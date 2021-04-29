import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

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

const rideoutMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dedede"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#b5b5b5"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

const Map = () => {
    const DUMMY_RIDER_LOCATIONS = [
        {id: 0, latitude: -36.1, longitude: 174.4, nickname: 'rider1'},
        {id: 1, latitude: -36.3, longitude: 174.3, nickname: 'rider2'},
        {id: 2, latitude: -36.2, longitude: 174.5, nickname: 'rider3'},
        {id: 3, latitude: -36.0, longitude: 174.1, nickname: 'rider4'}
    ]

    const DUMMY_GROUP_LOCATIONS = [
        {id: 4, latitude: -37.5, longitude: 175.4, nickname: 'group1'},
        {id: 5, latitude: -37.0, longitude: 175.8, nickname: 'group2'},
    ]

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle = {rideoutMapStyle}
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
                        {DUMMY_GROUP_LOCATIONS.map(DUMMY_GROUP_LOCATIONS => {return <Marker
                        key = {DUMMY_GROUP_LOCATIONS.id}
                        coordinate={{
                            latitude: DUMMY_GROUP_LOCATIONS.latitude,
                            longitude: DUMMY_GROUP_LOCATIONS.longitude
                        }}
                        >
                            <Image 
                                source={require('./group_marker_solid.png')}
                                style={{width: 36, height: 36}}
                                resizeMethod="resize"
                                resizeMode="contain"
                            />
                            <Callout style={{ "width": 250, "height": 50 }}>
                                <Text>{DUMMY_GROUP_LOCATIONS.nickname}</Text>
                                <Text>text placeholder</Text>
                            </Callout>
                        </Marker>})}
            </MapView>
        </View>
    )
}

export default Map;