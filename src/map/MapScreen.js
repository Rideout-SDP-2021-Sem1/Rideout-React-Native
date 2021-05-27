import React, { useEffect, useState, useRef } from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { serverInstance } from "../instances";
import { rideoutMapStyle } from "./rideoutMapStyle";
import RiderCallout from "./RiderCallout";
import GroupCallout from "./GroupCallout";

//Map style
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  riderCallout: {
    height: 180,
    width: 250,
    backgroundColor: "white",
  },
});

const Map = () => {
  const mapRef = useRef(null);

  //Map region of the user's location
  const [region, setRegion] = useState({
    latitude: -36.82967,
    longitude: 174.7449,
    latitudeDelta: 0.03,
    longitudeDelta: 0.0242,
  });

  const [sharingLocation, setSharingStatus] = useState(false);

  const [SharingTitle, setSharingTitle] = useState("Go Online");
  const [sharingStyle, setSharingStyle] = useState("#27afe2");

  const changeSharingStatus = () => {
    if (sharingLocation) {
      setSharingTitle("Go Online");
      setSharingStyle("#27afe2");
    } else {
      setSharingTitle("Go OFfline");
      setSharingStyle("#4dd14d");
    }
    setSharingStatus((sharingLocation) => !sharingLocation);
  };

  useEffect(() => {
    console.log("Log: state sharingLocation: " + sharingLocation);
  }, [sharingLocation]);

  const [followUser, setFollowUser] = useState(true);

  const [followTitle, setFollowTitle] = useState(
    "Stop Following My Location"
  );
  const [followStyle, setFollowStyle] = useState("#4dd14d");

  const changeFollowStatus = () => {
    if (followUser) {
      setFollowTitle("Follow My Location");
      setFollowStyle("#27afe2");
    } else {
      setFollowTitle("Stop Following");
      setFollowStyle("#4dd14d");
    }
    setFollowUser((followUser) => !followUser);
  };

  useEffect(() => {
    console.log("Log: state followUser: " + followUser);
  }, [followUser]);

  //Get the map region where the user is at
  const getUserRegion = () => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(
            "ERROR: Could not get user region using geolocation. ",
            error
          );
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } catch (error) {
      console.error("ERROR: could not get user region. ", error);
    }
  };

  // Setup state variables for this component
  const [riderLocations, setRiderLocations] = useState([]);
  const [groupLocations, setGroupLocations] = useState([]);

  // Function to send the user's location to the server
  const sendMyLocation = async (location) => {
    try {
      const lat = location?.coords?.latitude;
      const lng = location?.coords?.longitude;
      if (lat === undefined || lng === undefined || lat === "" || lng === "") {
        console.log("Log: sendMyLocation refused to send location to server. ");
      } else {
        await serverInstance.post("/location", {
          latitude: lat,
          longitude: lng,
          hidden: false,
        });
        console.log("Log: sendMyLocation sent location to server. ");
      }
    } catch (err) {
      console.error(
        "ERROR: sendMyLocation could not send user location to server. ",
        err
      );
    }
  };

  //Function to get the current location of the user
  const getMyLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        (info) => sendMyLocation(info),
        (error) => console.error("ERROR: findCoordinates geolocation could not get location. ", error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } catch (error) {
      console.error("ERROR: findCoordinates could not get location. ", error);
    }
  };

  // Get other rider's location
  const getRidersLocation = async () => {
    try {
      const response = await serverInstance.get("/location");
      const data = response.data;
      setRiderLocations(data);
    } catch (err) {
      console.error("ERROR: getRidersLocation could not get riders from server. ", err);
    }
  };

  useEffect(() => {
    const updateMyLocationInterval = setInterval(() => {
      getMyLocation();
    }, 15000);
    const updateOtherRidersLocationInterval = setInterval(() => {
      getRidersLocation();
    }, 10000);
    return () => {
      clearInterval(updateMyLocationInterval);
      clearInterval(updateOtherRidersLocationInterval);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await serverInstance.get("/group");
        const data = response.data;
        setGroupLocations(data);
      } catch (err) {
        console.error("ERROR: getData could not get groups from server. ", err);
      }
    };
    getData();
  }, []);

  const userLocationChanged = (event) => {
    if (followUser) {
      setRegion({
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
      animateToRegion;
    }
  }

  const animateToRegion = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        },
        1000
      );
    }
  }

  const regionChanged = (event)  => {
    setRegion({
      latitude: event.latitude,
      longitude: event.longitude,
      latitudeDelta: event.latitudeDelta,
      longitudeDelta: event.longitudeDelta,
    });
  }

  const requestRide = (userid) => {
    //request
  } 

  //Google map render
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={rideoutMapStyle}
        initialRegion={region} //Change this to a function to get current location?
        followsUserLocation={followUser} //IOS ONLY
        onUserLocationChange={(event) =>
          followUser && userLocationChanged(event)
        } //not sure about `followUser &&`
        onRegionChangeCompleted={(event) => regionChanged(event)}
        userLocationPriority={"high"}
        userLocationAnnotationTitle={"Me"}
        showsUserLocation={true}
        showsMyLocationButton={false} //IOS ONLY
        showsCompass={true}
        showsTraffic={false}
        loadingEnabled={true}
        loadingIndicatorColor={"#27afe2"}
        loadingBackgroundColor={"#dedede"}
      >
        {/*Render the users' location on the map as markers*/}
        {riderLocations.map((currentObj) => {
          return (
            <Marker
              key={currentObj.userId}
              coordinate={{
                latitude: parseFloat(currentObj.latitude) || 0,
                longitude: parseFloat(currentObj.longitude) || 0,
              }}
              title={currentObj.nickname}
              calloutAnchor={{ x: 0.5, y: -0.1 }}
              onCalloutPress={requestRide(currentObj.userId)}
            >
              {/*Render the marker as the custom image*/}
              <Image
                source={require("./rider_marker_solid.png")}
                style={{ width: 36, height: 36 }}
                resizeMethod="resize"
                resizeMode="contain"
              />
              {/*Popup UI when marker is clicked*/}
              <Callout tooltip={true} style={styles.riderCallout}>
                <RiderCallout rider={currentObj} />
              </Callout>
            </Marker>
          );
        })}

        {/*Render the groups' location on the map as markers*/}
        {groupLocations.map((currentObj) => {
          return (
            <Marker
              key={currentObj["_id"]}
              coordinate={{
                latitude: parseFloat(currentObj?.meetupLocation?.latitude) || 0,
                longitude:
                  parseFloat(currentObj?.meetupLocation?.longitude) || 0,
              }}
            >
              {/*Render the marker as the custom image*/}
              <Image
                source={require("./group_marker_solid.png")}
                style={{ width: 36, height: 36 }}
                resizeMethod="resize"
                resizeMode="contain"
              />
              {/*Popup UI when marker is clicked*/}
              <Callout style={{ width: 250, height: 250 }}>
                <GroupCallout group={currentObj} />
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View
        style={{
          position: "absolute",
          top: "5%",
          alignSelf: "center",
        }}
      >
        <Button
          title={SharingTitle}
          onPress={changeSharingStatus}
          color={sharingStyle}
        />
        <Button
          title={followTitle}
          onPress={changeFollowStatus}
          color={followStyle}
        />
      </View>
    </View>
  );
};

export default Map;
