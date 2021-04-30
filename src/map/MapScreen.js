import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import { serverInstance } from '../instances'
import { rideoutMapStyle } from './rideoutMapStyle'
import moment from 'moment'

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

const Map = () => {

  //Map region of the user's location
  const [currentLocation, setCurrentLocation] = useState({
    latitude: -36.82967,
    longitude: 174.7449,
    latitudeDelta: 0.030,
    longitudeDelta: 0.0242,
  })

  //Get the map region where the user is at
  const getMapRegion = () => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.030,
            longitudeDelta: 0.0242
          })
        },
        (error) => { console.error("error getMapRegion", error) }
      )
    } catch (error) {
      console.error("error getMapRegion", error)
    }
  }

  //Center the map on the user when app is launched
  useEffect(() => {
    getMapRegion()
  }, [])

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
      descriptionEdit: 0, //Unix time of last time description was edited
      title: "Trackday Session", //Group title by user
      creatorUserID: 90, //User ID of the creator of this meetup
    },
  ]

  // Setup state variables for this component
  const [riderLocations, setRiderLocations] = useState([])
  const [groupLocations, setGroupLocations] = useState([])

  // Function to send the user's location to the server
  const sendMyLocation = async (location) => {
    try {
      const lat = location?.coords?.latitude
      const lng = location?.coords?.longitude
      if (lat === undefined || lng === undefined || lat === "" || lng === "") {
        // pass
      } else {
        await serverInstance.post("/location", {
          latitude: lat,
          longitude: lng,
          hidden: false
        })
      }
    } catch (err) {
      console.error("sendMyLocation err", err)
    }
  }

  //Function to get the current location of the user
  const getMyLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        info => sendMyLocation(info),
        (error) => console.error("error findCoordinates", error)
      )
    } catch (error) {
      console.error("findCoordinates error", error)
    }
  }

  // Get other rider's location
  const getRidersLocation = async () => {
    try {
      const response = await serverInstance.get("/location")
      const data = response.data
      setRiderLocations(data)
      console.log("user locations\n", JSON.stringify(data, null, 4))
    } catch (err) {
      console.error("getRidersLocation error", err)
    }
  }

  useEffect(() => {
    const updateMyLocationInterval = setInterval(() => {
      getMyLocation()
    }, 10000)
    getRidersLocation()
    return () => {
      clearInterval(updateMyLocationInterval)
    }
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await serverInstance.get("/group")
        const data = response.data
        setGroupLocations(data)
      } catch (err) {
        console.error("failed to get group list", err)
      }
    }
    getData()
  }, [])

  //Google map render
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={rideoutMapStyle}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: currentLocation.latitudeDelta,
          longitudeDelta: currentLocation.longitudeDelta
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
        {riderLocations.map(currentObj => {
          return <Marker
            key={currentObj.userId}
            coordinate={{
              latitude: parseFloat(currentObj.latitude) || 0,
              longitude: parseFloat(currentObj.longitude) || 0
            }}
            title={currentObj.nickname}
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
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{currentObj.nickname}</Text>
                <Text>License Level: {currentObj.license}</Text>
                <Text>Preferred Pace: {currentObj.pace}</Text>
                <Text />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Bike detail: </Text>
                <Text>{currentObj.year || ""} {currentObj.make} {currentObj.model}</Text>
                <Text>Engine size: {currentObj.size}cc</Text>
                <Button title="Request Rideout" />
              </View>
            </Callout>
          </Marker>
        })}

        {/*Render the groups' location on the map as markers*/}
        {groupLocations.map(currentObj => {
          return <Marker
            key={currentObj["_id"]}
            coordinate={{
              latitude: parseFloat(currentObj?.meetupLocation?.latitude) || 0,
              longitude: parseFloat(currentObj?.meetupLocation?.longitude) || 0
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
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{currentObj.title}</Text>
                <Text style={{ fontSize: 10, color: '#808080' }}>Meetup Date: {moment(currentObj.meetupTime).toString()}</Text>
                <Text>{currentObj.description}</Text>
                <Text />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Meetup Details:</Text>
                <Text>Minimum License Level: {currentObj.minimumLicenseLevel}</Text>
                <Text>Preferred Pace: {currentObj.minimumPreferredPace}</Text>
                <Text>{currentObj.currentAttendant}/{currentObj.maximumAttendant} Riders RSVP'D</Text>
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