import React from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

//Map style
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

//Map visual style
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

//Function to get the current location of the user
findCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      const location = JSON.stringify(position);

      this.setState({ location });
    },
    error => Alert.alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};

const Map = () => {
  //Array which contains dummy users, will be swapped with real data from server
  const DUMMY_RIDER_LOCATIONS = [
    {
      markerID: 0, //Unique marker ID
      userID: 90, //Unique user ID
      latitude: -36.85565, //Current latitude of user
      longitude: 174.76521, //Current longitude of user
      nickname: 'Khaled', //Nickname of the user
      pace: "Mixed", //Preferred pace of the user
      license: "Learner", //License level of the user
      make: "Honda", //User's bike make
      model: "CB400", //User's bike model
      year: 2009, //User's bike model year
      size: 400 //User's bike engine size in cc
    },
    { markerID: 1, userID: 15, latitude: -36.8509, longitude: 174.8106, nickname: 'Bob', pace: "Relaxed", license: "Full", make: "Suzuki", model: "DRZ400", year: 2014, size: 400 },
    { markerID: 2, userID: 21, latitude: -36.8317, longitude: 174.79709, nickname: 'Praj', pace: "Spirited", license: "Learner", make: "BMW", model: "GS310", year: 2020, size: 310 },
    { markerID: 3, userID: 37, latitude: -36.8496, longitude: 174.8184, nickname: 'Ranish', pace: "Mixed", license: "Restricted", make: "Honda", model: "VFR400", year: 1998, size: 400 }
  ]

  //Array which contains dummy groups, will be swapped with real data from server
  const DUMMY_GROUP_LOCATIONS = [
    {
      markerID: 4, //Unique marker ID
      groupID: 85, //Unique group ID
      latitude: -36.84475, //Latitude of meetup location
      longitude: 174.77304, //Latitude of meetup location
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

  //Google map render
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={rideoutMapStyle}
        region={{
          latitude: -36.85087,
          longitude: 174.7645,
          latitudeDelta: 0.030,
          longitudeDelta: 0.0242,
        }}
        showsUserLocation={true}
        userLocationPriority={'high'}
        userLocationAnnotationTitle={'Me'}
        followsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        showsTraffic={false}
      >
        {/*Render the users' location on the map as markers*/}
        {DUMMY_RIDER_LOCATIONS.map(DUMMY_RIDER_LOCATIONS => {
          return <Marker
            key={DUMMY_RIDER_LOCATIONS.markerID}
            coordinate={{
              latitude: DUMMY_RIDER_LOCATIONS.latitude,
              longitude: DUMMY_RIDER_LOCATIONS.longitude
            }}
            title={DUMMY_RIDER_LOCATIONS.nickname}
          >
            {/*Render the marker as the custom image*/}
            <Image
              source={require('./rider_marker_solid.png')}
              style={{ width: 36, height: 36 }}
              resizeMethod="resize"
              resizeMode="contain"
            />

            {/*Popup UI when marker is clicked*/}
            <Callout style={{ width: 250, height: 250 }}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{DUMMY_RIDER_LOCATIONS.nickname}</Text>
                <Text>License Level: {DUMMY_RIDER_LOCATIONS.license}</Text>
                <Text>Preferred Pace: {DUMMY_RIDER_LOCATIONS.pace}</Text>
                <Text />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Bike detail: </Text>
                <Text>{DUMMY_RIDER_LOCATIONS.year} {DUMMY_RIDER_LOCATIONS.make} {DUMMY_RIDER_LOCATIONS.model}</Text>
                <Text>Engine size: {DUMMY_RIDER_LOCATIONS.size}cc</Text>
                <Button title="Request Rideout" />
              </View>
            </Callout>
          </Marker>
        })}

        {/*Render the groups' location on the map as markers*/}
        {DUMMY_GROUP_LOCATIONS.map(DUMMY_GROUP_LOCATIONS => {
          return <Marker
            key={DUMMY_GROUP_LOCATIONS.markerID}
            coordinate={{
              latitude: DUMMY_GROUP_LOCATIONS.latitude,
              longitude: DUMMY_GROUP_LOCATIONS.longitude
            }}
          >
            {/*Render the marker as the custom image*/}
            <Image
              source={require('./group_marker_solid.png')}
              style={{ width: 36, height: 36 }}
              resizeMethod="resize"
              resizeMode="contain"
            />

            {/*Popup UI when marker is clicked*/}
            <Callout style={{ width: 250, height: 250 }}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{DUMMY_GROUP_LOCATIONS.title}</Text>
                <Text style={{ fontSize: 10, color: '#808080' }}>Meetup Date: {DUMMY_GROUP_LOCATIONS.meetupTime}</Text>
                <Text>{DUMMY_GROUP_LOCATIONS.description}</Text>
                <Text />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Meetup Details:</Text>
                <Text>Minimum License Level: {DUMMY_GROUP_LOCATIONS.minimumLicense}</Text>
                <Text>Preferred Pace: {DUMMY_GROUP_LOCATIONS.minimumPace}</Text>
                <Text>{DUMMY_GROUP_LOCATIONS.currentMembers}/{DUMMY_GROUP_LOCATIONS.maxMembers} Riders RSVP'D</Text>
                <Button title="RSVP a Slot" />
                <Text style={{ textAlign: 'center', fontSize: 10, color: '#808080' }}>Meetup in:</Text>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>00:00:00</Text>
              </View>
            </Callout>
          </Marker>
        })}

      </MapView>
    </View>
  )
}

export default Map;