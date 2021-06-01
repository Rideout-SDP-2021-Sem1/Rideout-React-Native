import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Linking,
  Text,
  Pressable,
} from "react-native";
import MapView, {
  Circle,
  Marker,
  Callout,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { serverInstance } from "../instances";
import { rideoutMapStyle } from "./rideoutMapStyle";
import RiderCallout from "./RiderCallout";
import GroupCallout from "./GroupCallout";
import { getDistance } from "geolib";
import * as FS from "./FileStorage";
import { getForecast } from "./Forecast";
import { SocketContext } from "../context";
import RNFS from "react-native-fs";

// Style sheet for the map, callouts, and buttons
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
  groupCallout: {
    height: 250,
    width: 250,
    backgroundColor: "white",
  },
  followButton: {
    height: 60,
    width: 60,
    borderWidth: 1.6,
    borderRadius: 15,
    justifyContent: "center",
  },
  followImage: {
    height: 40,
    width: 40,
    alignSelf: "center",
  },
});

// Constants for the file location of location history and home location
const locationHistoryPath = RNFS.DocumentDirectoryPath + "/locationHistory.txt";
const homeLocationPath = RNFS.DocumentDirectoryPath + "/homeLocation.txt";
const locationHistoryExportPath =
  RNFS.DownloadDirectoryPath + "/locationHistory.txt";

// Exported function to export location history into downloads directory (called from profile page)
export const exportLocationHistory = () => {
  FS.exportFile(RNFS, locationHistoryPath, locationHistoryExportPath);
  console.log("***Exporting location history***");
};

// Exported function to clear location history file (called from profile page)
export const clearLocationHistory = () => {
  FS.clearFile(RNFS, locationHistoryPath);
  console.log("***Clearing location history***");
};

// Main function
const Map = () => {
  // Referenct for the map
  const mapRef = useRef(null);

  // Socket to send/recieve request rideout with other users
  const { socket, socketReady } = useContext(SocketContext);

  // Check if location history and home location files exists, if not, create one
  useEffect(() => {
    FS.checkFile(RNFS, locationHistoryPath);
    FS.checkFile(RNFS, homeLocationPath);
  }, []);

  // Map region of the user's location
  const [region, setRegion] = useState({
    latitude: -36.85088,
    longitude: 174.7645,
    latitudeDelta: 0.03,
    longitudeDelta: 0.0242,
  });

  // Location of home that user sets
  const [home, setHome] = useState({
    latitude: -36.85088,
    longitude: 174.7645,
  });

  // Boolean of the online/offline button
  const [sharingLocation, setSharingStatus] = useState(false);

  // Boolean to show if user is at home or not
  const [atHome, setAtHome] = useState(true);

  // Online/offline button style states
  const [sharingTitle, setSharingTitle] = useState("Go Online");
  const [sharingStyle, setSharingStyle] = useState("#27afe2");

  // Online/offline handling
  const changeSharingStatus = () => {
    if (sharingLocation) {
      setSharingTitle("Go Online");
      setSharingStyle("#27afe2");
    } else {
      setSharingTitle("Go Offline");
      setSharingStyle("#4dd14d");
    }
    setSharingStatus((sharingLocation) => !sharingLocation);
  };

  // Forecast state, used to display the forecast from API
  const [forecast, setForecast] = useState("Loading Forecast...");

  // Function to update the forecast through OpenWeatherMap API, called using setInterval
  const updateForecast = async () => {
    var newForecast = await getForecast(region);
    setForecast(newForecast);
  };

  // Update the forecast when app is launched
  useEffect(() => {
    updateForecast();
  }, []);

  // Boolean to determine to follow/center the user on the map
  const [followUser, setFollowUser] = useState(true);

  // States for follow/center user button style
  const [followImage, setFollowImage] = useState(require("./share_white.png"));
  const [followStyleBackground, setFollowStyleBackground] = useState("#27afe2");
  const [followStyleBorder, setFollowStyleBorder] = useState("#ffffff");

  // Follow/center button handling
  const changeFollowStatus = () => {
    if (followUser) {
      setFollowImage(require("./share_faded.png"));
      setFollowStyleBackground("#ffffff");
      setFollowStyleBorder("#27afe2");
    } else {
      setFollowImage(require("./share_white.png"));
      setFollowStyleBackground("#27afe2");
      setFollowStyleBorder("#ffffff");
    }
    setFollowUser((followUser) => !followUser);
  };

  // Array of riders and group ride locations that will be filled by the server
  const [riderLocations, setRiderLocations] = useState([]);
  const [groupLocations, setGroupLocations] = useState([]);

  // Function to send the user's location to the server
  const sendMyLocation = async (location) => {
    console.log("sharingLocation: " + sharingLocation + ", atHome: " + atHome);
    try {
      const lat = location?.coords?.latitude;
      const lng = location?.coords?.longitude;
      if (lat === undefined || lng === undefined || lat === "" || lng === "") {
      } else {
        await serverInstance.post("/location", {
          latitude: lat,
          longitude: lng,
          hidden: false,
        });
      }
    } catch (err) {
      console.error(
        "sendMyLocation could not send user location to server. ",
        err
      );
    }
    // Record location of the user locally
    FS.recordLocation(
      RNFS,
      locationHistoryPath,
      location.coords.latitude,
      location.coords.longitude
    );
  };

  // Function to get the current location of the user
  const getMyLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        (info) => sendMyLocation(info),
        (error) =>
          console.error(
            "ERROR: findCoordinates geolocation could not get location. ",
            error
          ),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } catch (error) {
      console.error("ERROR: findCoordinates could not get location. ", error);
    }
  };

  // Function to get riders location from server
  const getRidersLocation = async () => {
    try {
      const response = await serverInstance.get("/location");
      const data = response.data;
      setRiderLocations(data);
    } catch (err) {
      console.error(
        "ERROR: getRidersLocation could not get riders from server. ",
        err
      );
    }
  };

  // Get list of group location from server
  const getGroupLocation = async () => {
    try {
      const response = await serverInstance.get("/group");
      const data = response.data;
      setGroupLocations(data);
    } catch (err) {
      console.error("getGroupLocation error", err);
    }
  };

  // Useeffect with setInterval to periodically call functions to get riders, groups from server
  // And update the weather forecast
  useEffect(() => {
    getMyLocation();
    getRidersLocation();
    getGroupLocation();
    const updateMyLocationInterval = setInterval(() => {
      getMyLocation();
    }, 15000);
    const updateOtherRidersLocationInterval = setInterval(() => {
      getRidersLocation();
    }, 10000);
    const updateForecastDisplayInterval = setInterval(() => {
      updateForecast();
    }, 60000);
    return () => {
      clearInterval(updateMyLocationInterval);
      clearInterval(updateOtherRidersLocationInterval);
      clearInterval(updateForecastDisplayInterval);
    };
  }, []);

  // Get riders and groups when app starts
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

  // Function to animate map to region, used to center user
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
  };

  // Function to check if the user is at home or not
  const checkIfAtHome = (latitude, longitude, isUserChange) => {
    var distance = 0;
    if (isUserChange) {
      distance = getDistance(
        { latitude: latitude, longitude: longitude },
        { latitude: home.latitude, longitude: home.longitude }
      );
    } else {
      distance = getDistance(
        { latitude: region.latitude, longitude: region.longitude },
        { latitude: latitude, longitude: longitude }
      );
    }
    if (distance < 250) {
      setAtHome(true);
    } else {
      setAtHome(false);
    }
  };

  // Function to update the region of the map if the user moves
  const userLocationChanged = (event) => {
    var lat = event.nativeEvent.coordinate.latitude;
    var long = event.nativeEvent.coordinate.longitude;
    if (followUser) {
      setRegion({
        latitude: lat,
        longitude: long,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
      animateToRegion();
    }
    checkIfAtHome(lat, long, true);
  };

  // Function to get the location of home from local storage
  const updateHomeLocation = () => {
    var homeLocation = FS.getHomeLocation(RNFS, homeLocationPath);
    setHome(homeLocation);
  };

  // Get home location on app startup
  useEffect(() => {
    updateHomeLocation();
  }, []);

  // Function to store the home location locally
  const storeHomeLocation = (lat, long) => {
    FS.clearFile(RNFS, homeLocationPath);
    FS.recordLocation(RNFS, homeLocationPath, lat, long);
  };

  // Function to handle if the user's home marker has been moved
  const userHomeChanged = (event) => {
    var lat = event.nativeEvent.coordinate.latitude;
    var long = event.nativeEvent.coordinate.longitude;
    setHome({
      latitude: lat,
      longitude: long,
    });
    console.info(
      "Home location changed: " + home.latitude + ", " + home.longitude
    );
    storeHomeLocation(lat, long);
    checkIfAtHome(lat, long, false);
  };

  // Function to open phone app and set 111 as phone number to call
  const callEmergency = () => {
    Linking.openURL(`tel:${111}`);
  };

  // Function to send request to ride to server
  const requestRide = (userId) => {
    //request
    console.log("request", userId);
    socket.emit("requestServerRide", {
      userId,
    });
  };

  // Google map render
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={rideoutMapStyle}
        initialRegion={region}
        followsUserLocation={followUser}
        onUserLocationChange={(event) => userLocationChanged(event)}
        userLocationPriority={"high"}
        userLocationAnnotationTitle={"Me"}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        showsTraffic={false}
        loadingEnabled={true}
        loadingIndicatorColor={"#27afe2"}
        loadingBackgroundColor={"#dedede"}
      >
        {/*Render the riders' location on the map as markers*/}
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
            >
              {/*Render the marker as the custom image*/}
              {currentObj.isLeader ? (
                <Image
                  source={require("./leader_marker_solid.png")}
                  style={{ width: 36, height: 36 }}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("./rider_marker_solid.png")}
                  style={{ width: 36, height: 36 }}
                  resizeMethod="resize"
                  resizeMode="contain"
                />
              )}

              {/*Popup UI when marker is clicked*/}
              <Callout
                tooltip={true}
                style={styles.riderCallout}
                onPress={() => {
                  if (!currentObj.isInActiveGroupRide) {
                    requestRide(currentObj.userId);
                  }
                }}
              >
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
              <Callout style={styles.groupCallout}>
                <GroupCallout group={currentObj} />
              </Callout>
            </Marker>
          );
        })}
        {/*Render the marker of home location*/}
        <Marker
          key={"home"}
          coordinate={{
            latitude: home.latitude,
            longitude: home.longitude,
          }}
          draggable={true}
          onDragEnd={(event) => userHomeChanged(event)}
        >
          <Image
            source={require("./home_marker.png")}
            style={{ width: 36, height: 36 }}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </Marker>
        {/*Render the circle around home location*/}
        <Circle
          center={{
            latitude: home.latitude,
            longitude: home.longitude,
          }}
          radius={250}
          strokeWidth={1}
          strokeColor={"#27afe2"}
          fillColor={"rgba(39, 175, 226, 0.1)"}
        />
      </MapView>
      {/*View which shows the weather forecast*/}
      <View
        style={{
          flexDirection: "row",
          padding: 5,
          width: "75%",
          alignContent: "center",
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: "#ffffff",
          borderWidth: 1.6,
          borderColor: "#27afe2",
          borderTopWidth: 0,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <Text>Weather forecast in 1 hour: </Text>
        <Text style={{ fontWeight: "bold" }}>{forecast}</Text>
      </View>
      {/*View which shows offline/online button*/}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: "4.5%",
          alignSelf: "center",
          padding: 10,
        }}
      >
        <Pressable
          onPress={changeSharingStatus}
          style={{
            backgroundColor: sharingStyle,
            height: 50,
            width: 200,
            alignContent: "center",
            justifyContent: "center",
            borderRadius: 10,
            borderColor: "#ffffff",
            borderWidth: 1.6,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#ffffff",
              fontSize: 25,
              alignSelf: "center",
            }}
          >
            {sharingTitle}
          </Text>
        </Pressable>
      </View>
      {/*View which shows follow/center on user icon/button*/}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: "0%",
          alignSelf: "flex-end",
          padding: 10,
        }}
      >
        <Pressable
          onPress={changeFollowStatus}
          style={{
            ...styles.followButton,
            backgroundColor: followStyleBackground,
            borderColor: followStyleBorder,
          }}
        >
          <Image source={followImage} style={styles.followImage} />
        </Pressable>
      </View>
      {/*View which shows call emergency icon/button*/}
      <View
        style={{
          position: "absolute",
          bottom: "0%",
          alignSelf: "flex-start",
          padding: 10,
        }}
      >
        <Pressable
          onPress={callEmergency}
          style={{
            ...styles.followButton,
            backgroundColor: "#c71432",
            borderColor: "#ffffff",
          }}
        >
          <Image
            source={require("./emergency_icon.png")}
            style={styles.followImage}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Map;
