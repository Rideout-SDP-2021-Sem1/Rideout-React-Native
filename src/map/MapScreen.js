import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Button, Image, StyleSheet, Linking, Text } from "react-native";
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
import { SocketContext } from '../context'

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
  const { socket, socketReady } = useContext(SocketContext)

  var RNFS = require("react-native-fs");
  const locationHistoryPath =
    RNFS.DocumentDirectoryPath + "/locationHistory.txt";
  const homeLocationPath = RNFS.DocumentDirectoryPath + "/homeLocation.txt";
  const locationHistoryExportPath =
    RNFS.DownloadDirectoryPath + "/locationHistory.txt";

  useEffect(() => {
    FS.checkFile(RNFS, locationHistoryPath);
    FS.checkFile(RNFS, homeLocationPath);
  }, []);
  
  //Map region of the user's location
  const [region, setRegion] = useState({
    latitude: -36.85088,
    longitude: 174.7645,
    latitudeDelta: 0.03,
    longitudeDelta: 0.0242,
  });

  const [home, setHome] = useState({
    latitude: -36.85088,
    longitude: 174.7645,
  });

  const [sharingLocation, setSharingStatus] = useState(false); //for button (online, offline) button only
  const [atHome, setAtHome] = useState(true); //use this to determine if user sends location to server or not
  useEffect(() => {
    console.info("At home: " + atHome);
  }, [atHome]);

  const [sharingTitle, setSharingTitle] = useState("Go Online");
  const [sharingStyle, setSharingStyle] = useState("#27afe2");

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

  useEffect(() => {
    // console.log("Log: state sharingLocation: " + sharingLocation);
  }, [sharingLocation]);

  const [forecast, setForecast] = useState("Loading Forecast...");

  const updateForecast = async () => {
    var newForecast = await getForecast(region);
    setForecast(newForecast);
  };

  useEffect(() => {
    console.log("Forecast: " + forecast);
  }, [forecast]);

  useEffect(() => {
    updateForecast();
  }, []);

  const [followUser, setFollowUser] = useState(true);

  const [followTitle, setFollowTitle] = useState("Stop Following My Location");
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
    // console.log("Log: state followUser: " + followUser);
  }, [followUser]);

  // Setup state variables for this component
  const [riderLocations, setRiderLocations] = useState([]);
  const [groupLocations, setGroupLocations] = useState([]);

  // Function to send the user's location to the server
  const sendMyLocation = async (location) => {
    try {
      const lat = location?.coords?.latitude;
      const lng = location?.coords?.longitude;
      if (lat === undefined || lng === undefined || lat === "" || lng === "") {
        //put atHome here
        // console.log("Log: sendMyLocation refused to send location to server. ");
      } else {
        await serverInstance.post("/location", {
          latitude: lat,
          longitude: lng,
          hidden: false,
        });
        // console.log("Log: sendMyLocation sent location to server. ");
      }
    } catch (err) {
      console.error(
        "ERROR: sendMyLocation could not send user location to server. ",
        err
      );
    }
    FS.recordLocation(
      RNFS,
      locationHistoryPath,
      location.coords.latitude,
      location.coords.longitude
    );
  };

  //Function to get the current location of the user
  const getMyLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        (info) => sendMyLocation(info),
        (error) =>
          console.error(
            "ERROR: findCoordinates geolocation could not get location. ",
            error
          ),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
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
      console.error(
        "ERROR: getRidersLocation could not get riders from server. ",
        err
      );
    }
  };

  // Get list of group location
  const getGroupLocation = async () => {
    try {
      const response = await serverInstance.get("/group");
      const data = response.data;
      setGroupLocations(data);
    } catch (err) {
      console.error("getGroupLocation error", err);
    }
  };

  // Get list of group location
  const getGroupLocation = async () => {
    try {
      const response = await serverInstance.get("/group")
      const data = response.data
      setGroupLocations(data)
    } catch (err) {
      console.error("getGroupLocation error", err)
    }
  }

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

  /* now dependent on userLocationChanged happening when app launches
  useEffect(() => {
    checkIfAtHome();
  }, []);
  */

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

  const updateHomeLocation = () => {
    var homeLocation = FS.getHomeLocation(RNFS, homeLocationPath)
    setHome(homeLocation)
  }

  useEffect(() => {
    updateHomeLocation()
  }, [])

  const storeHomeLocation = (lat, long) => {
    FS.clearFile(RNFS, homeLocationPath)
    FS.recordLocation(RNFS, homeLocationPath, lat, long)
  };

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

  const callEmergency = () => {
    Linking.openURL(`tel:${111}`);
  };

  const requestRide = (userId) => {
    //request
    console.log("reqest", userId)
    socket.emit("requestServerRide", {
      userId
    })
  };

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
        onUserLocationChange={(event) => userLocationChanged(event)}
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
            >
              {/*Render the marker as the custom image*/}
              <Image
                source={require("./rider_marker_solid.png")}
                style={{ width: 36, height: 36 }}
                resizeMethod="resize"
                resizeMode="contain"
              />
              {/*Popup UI when marker is clicked*/}
              <Callout tooltip={true} style={styles.riderCallout} onPress={() => {
                requestRide(currentObj.userId)
              }}>
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
      <View
        style={{
          position: "absolute",
          top: "5%",
          alignSelf: "center",
        }}
      >
        <Text>{forecast}</Text>
        <Button
          title={sharingTitle}
          onPress={changeSharingStatus}
          color={sharingStyle}
        />
        <Button
          title={followTitle}
          onPress={changeFollowStatus}
          color={followStyle}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          alignSelf: "flex-start",
        }}
      >
        <Button
          title="Export History"
          onPress={() =>
            FS.exportFile(RNFS, locationHistoryPath, locationHistoryExportPath)
          }
          color="#27afe2"
        />
        <Button
          title="Clear History"
          onPress={() => FS.clearFile(RNFS, locationHistoryPath)}
          color="#c71432"
        />
        <Button
          title="DEBUG: Print History"
          onPress={() => FS.printFileConsole(RNFS, locationHistoryPath)}
          color="#27afe2"
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          alignSelf: "flex-end",
        }}
      >
        <Button title="EMERGENCY" onPress={callEmergency} color="#c71432" />
      </View>
    </View>
  );
};

export default Map;
