import React, { useEffect, useState, useRef } from "react";
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

  const [forecast, setForecast] = useState("Updating Forcast...");

  const updateForecast = () => {
    console.log("Getting forecast from API. ");
    var formattedLat = Math.trunc(region.latitude);
    var formattedLong = Math.trunc(region.longitude);
    const url =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      formattedLat +
      "&lon=" +
      formattedLong +
      "&appid=5d9c4214bba669bd9a39192ab06885f2";

    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        setForecast(data.weather[0].main);
        console.log("Successfully recieved forecast from API. ");
        console.info("Forecast retrieved: " + data.weather[0].main);
      })
      .catch((error) => {
        console.error("WeatherAPI Fetch: " + error.message);
      });
  };

  const [home, setHome] = useState({
    latitude: -36.82967,
    longitude: 174.7449,
  });

  var RNFS = require("react-native-fs");
  const locationHistoryPath =
    RNFS.DocumentDirectoryPath + "/locationHistory.txt";

  const checkHistoryFile = () => {
    RNFS.exists(locationHistoryPath)
      .then((success) => {
        if (!success) {
          RNFS.writeFile(locationHistoryPath, "", "utf8")
            .then((success) => {
              console.log("New history file created. ");
            })
            .catch((err) => {
              console.error("checkHistory1: " + err.message);
            });
        }
      })
      .catch((err) => {
        console.error("checkHistory2: " + err.message);
      });
  };

  useEffect(() => {
    checkHistoryFile();
  }, []);

  const recordLocation = (latitude, longitude) => {
    checkHistoryFile();
    const content =
      '{"timestamp":"' +
      new Date().getTime() +
      '", "latitude":"' +
      latitude +
      '", "longitude":"' +
      longitude +
      '"}, ';
    RNFS.appendFile(locationHistoryPath, content, "utf8")
      .then((success) => {
        console.log("User location recorded locally. ");
      })
      .catch((err) => {
        console.error("recordLocation: " + err.message);
      });
  };

  const exportHistory = () => {
    checkHistoryFile();
    const exportPath = RNFS.DownloadDirectoryPath + "/locationHistory.txt";
    RNFS.copyFile(locationHistoryPath, exportPath)
      .then((success) => {
        console.log("Exported history log to downloads directory. ");
      })
      .catch((err) => {
        console.error("exportHistory: " + err.message);
      });
  };

  const clearHistory = () => {
    checkHistoryFile();
    RNFS.unlink(locationHistoryPath)
      .then((success) => {
        console.log("Cleared location history. ");
      })
      .catch((err) => {
        console.error("clearHistory: " + err.message);
      });
    checkHistoryFile();
  };

  const printHistoryConsole = () => {
    checkHistoryFile();
    RNFS.readFile(locationHistoryPath)
      .then((result) => {
        console.info("Location History: ", result);
      })
      .catch((err) => {
        console.error("printHistory: " + err.message);
      });
  };

  //Map region of the user's location
  const [region, setRegion] = useState({
    latitude: -36.82967,
    longitude: 174.7449,
    latitudeDelta: 0.03,
    longitudeDelta: 0.0242,
  });

  const [sharingLocation, setSharingStatus] = useState(false); //for button (online, offline) button only
  const [atHome, setAtHome] = useState(true); //use this to determine if user sends location to server or not
  useEffect(() => {
    console.info("At home: " + atHome);
  }, [atHome]);

  const [SharingTitle, setSharingTitle] = useState("Go Online");
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
    console.log("Log: state sharingLocation: " + sharingLocation);
  }, [sharingLocation]);

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
    console.log("Log: state followUser: " + followUser);
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
    recordLocation(location.coords.latitude, location.coords.longitude);
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
      console.error(
        "ERROR: getRidersLocation could not get riders from server. ",
        err
      );
    }
  };

  useEffect(() => {
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
    updateForecast();
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
    console.info("Distance between user and home: " + distance);
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
    checkIfAtHome(lat, long, false);
  };

  const callEmergency = () => {
    Linking.openURL(`tel:${111}`);
  };

  const requestRide = (userid) => {
    //request
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
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          alignSelf: "flex-start",
        }}
      >
        <Button
          title="Export History"
          onPress={exportHistory}
          color="#27afe2"
        />
        <Button title="Clear History" onPress={clearHistory} color="#c71432" />
        <Button
          title="DEBUG: Print History"
          onPress={printHistoryConsole}
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
