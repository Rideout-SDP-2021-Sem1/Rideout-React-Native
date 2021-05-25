import React, { useEffect, useState } from "react";
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
});

const Map = () => {
  //Map region of the user's location
  const [currentLocation, setCurrentLocation] = useState({
    latitude: -36.82967,
    longitude: 174.7449,
    latitudeDelta: 0.03,
    longitudeDelta: 0.0242,
  });

  const [sharingLocation, setSharing] = useState(false);

  const [sharingTitle, setSharingTitle] = useState("Go Online");
  const [sharingStyle, setSharingStyle] = useState({ buttonColor: "blue" });

  const changeSharingStatus = () => {
    if (sharingLocation) {
      setSharingTitle("Go Online");
      setSharingStyle({ buttonColor: "blue" });
    } else {
      setSharingTitle("Go Offline");
      setSharingStyle({ buttonColor: "grey" });
    }
    setSharing((sharingLocation) => !sharingLocation);
  };

  useEffect(() => {
    console.log("sharingLocation: " + sharingLocation);
  }, [sharingLocation]);

  //Get the map region where the user is at
  const getMapRegion = () => {
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.0242,
          });
        },
        (error) => {
          console.error("error getMapRegion", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } catch (error) {
      console.error("error getMapRegion", error);
    }
  };

  //Center the map on the user when app is launched
  useEffect(() => {
    getMapRegion();
  }, []);

  // Setup state variables for this component
  const [riderLocations, setRiderLocations] = useState([]);
  const [groupLocations, setGroupLocations] = useState([]);

  // Function to send the user's location to the server
  const sendMyLocation = async (location) => {
    try {
      const lat = location?.coords?.latitude;
      const lng = location?.coords?.longitude;
      if (lat === undefined || lng === undefined || lat === "" || lng === "") {
        console.log("sendMyLocation refused to send.");
      } else {
        await serverInstance.post("/location", {
          latitude: lat,
          longitude: lng,
          hidden: false,
        });
        console.log("sendMyLocation sent location.");
      }
    } catch (err) {
      console.error("sendMyLocation err", err);
    }
  };

  //Function to get the current location of the user
  const getMyLocation = () => {
    try {
      console.log("getMyLocation getting current position.");
      Geolocation.getCurrentPosition(
        (info) => sendMyLocation(info),
        (error) => console.error("error findCoordinates", error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } catch (error) {
      console.error("findCoordinates error", error);
    }
  };

  // Get other rider's location
  const getRidersLocation = async () => {
    try {
      const response = await serverInstance.get("/location");
      const data = response.data;
      setRiderLocations(data);
    } catch (err) {
      console.error("getRidersLocation error", err);
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
        console.error("failed to get group list", err);
      }
    };
    getData();
  }, []);

  //Google map render
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={rideoutMapStyle}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: currentLocation.latitudeDelta,
          longitudeDelta: currentLocation.longitudeDelta,
        }}
        showsUserLocation={true}
        userLocationPriority={"high"}
        userLocationAnnotationTitle={"Me"}
        followsUserLocation={false} //IOS ONLY
        showsMyLocationButton={false} //IOS ONLY (i think)
        showsCompass={true}
        showsTraffic={false}
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
            >
              {/*Render the marker as the custom image*/}
              <Image
                source={require("./rider_marker_solid.png")}
                style={{ width: 36, height: 36 }}
                resizeMethod="resize"
                resizeMode="contain"
              />
              {/*Popup UI when marker is clicked*/}
              <Callout style={{ width: 250, height: 250 }}>
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
          title={sharingTitle}
          onPress={changeSharingStatus}
          style={sharingStyle}
        />
      </View>
    </View>
  );
};

export default Map;
