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
        {
          markerID: 0, //Unique marker ID
          userID: 90, //Unique user ID
          latitude: -36.1, //Current latitude of user
          longitude: 174.4, //Current longitude of user
          nickname: 'Khaled', //Nickname of the user
          pace: "Mixed", //Preferred pace of the user
          license: "Learner", //License level of the user
          make: "Honda", //User's bike make
          model: "CB400", //User's bike model
          year: 2009, //User's bike model year
          size: 400 //User's bike engine size in cc
        },
        {markerID: 1, userID: 15, latitude: -36.3, longitude: 174.6, nickname: 'Bob', pace: "Relaxed", license: "Full", make: "Suzuki", model: "DRZ400", year: 2014, size: 400},
        {markerID: 2, userID: 21, latitude: -36.6, longitude: 174.8, nickname: 'Praj', pace: "Spirited", license: "Learner", make: "BMW", model: "GS310", year: 2020, size: 310},
        {markerID: 3, userID: 37, latitude: -36.2, longitude: 174.1, nickname: 'Ranish', pace: "Mixed", license: "Restricted", make: "Honda", model: "VFR400", year: 1998, size: 400}
    ]

    const DUMMY_GROUP_LOCATIONS = [
        {
          markerID: 4, //Unique marker ID
          groupID: 85, //Unique group ID
          latitude: -37.5, //Latitude of meetup location
          longitude: 175.4, //Latitude of meetup location
          createTime: 1619696388, //Unix time of when this meetup was created
          meetupTime: 1619697400, //Unix time of when the meetup will start
          maxMembers: 10, //Maximum number of members allowed
          currentMembers: 5, //Current number of members who RSVP'd
          minimumPace: "Spirited", //Minimum pace required for user to RSVP
          minimumLicense: "Full", //Minimum license required for user to RSVP
          description: "This is for a trackday meetup at Hampton Downs Race Track. Free Entry.", //Text description by user
          descrptionEdit: 0, //Unix time of last time description was edited
          title: "Trackday Session", //Group title by user
          creatorUserID: 90, //User ID of the creator of this meetup
        },
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
                                <Text>Praj save me please.</Text>
                            </Callout>
                        </Marker>})}
            </MapView>
        </View>
    )
}

export default Map;