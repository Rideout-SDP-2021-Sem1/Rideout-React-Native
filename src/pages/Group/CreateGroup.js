import React, { useState } from "react";
import { ScrollView, View, Platform, Alert } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Button,
  SelectItem,
  Layout,
  Input,
  IndexPath,
  Select,
  Text,
  Modal,
  Card,
  List,
  ListItem, 
  Icon
} from "@ui-kitten/components";
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import axios from 'axios'
import { serverInstance } from '../../instances'
import { LoadingScreen } from '../../components'

export const CreateGroup = (props) => {
  const styles = useStyleSheet(themedStyle);

  const licenseList = [
    'Learners',
    'Restricted',
    'Full',
  ];
  const preferredPaceList = [
    'Relaxed',
    'Mixed',
    'Spirited',
  ];

  const [title, setTitle] = useState("")
  const [meetupLocation, setMeetupLocation] = useState("")
  const [destinationLocation, setDestinationLocation] = useState("")
  const [currentSelection, setCurrentSelection] = useState("departure" || "arrival")
  const [maximumAttendant, setMaximumAttendant] = useState("")
  const [description, setDescription] = useState("")
  const [selectedLicenseIndex, setSelectedLicenseIndex] = useState(new IndexPath(0));
  const [selectedPaceIndex, setSelectedPaceIndex] = useState(new IndexPath(0));
  const displayLValue = licenseList[selectedLicenseIndex.row];
  const displayPValue = preferredPaceList[selectedPaceIndex.row];

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false)

  const [time, setTime] = useState(new Date())
  const [showTimePicker, setShowTimePicker] = useState(false)

  const [showDialog, setShowDialog] = useState(false)
  const [addressLookup, setAddressLookup] = useState("")
  const [addressAutocompleteResult, setAddressAutocompleteResult] = useState([])
  const [placeId, setPlaceId] = useState("")
  const [destinationPlaceId, setDestinationPlaceId] = useState("")
  const [waiting, setWaiting] = useState(false)

  const handleDateAndTime = (inputValue, type) => {
    if (inputValue == null) {
      if (type === "date") {
        setShowDatePicker(Platform.OS === "ios")
      } else if (type === "time") {
        setShowTimePicker(Platform.OS === "ios")
      }
      return
    }
    if (type === "date") {
      setShowDatePicker(Platform.OS === "ios")
      setDate(inputValue)
    } else if (type === "time") {
      // Update the time
      const currentDateAndTime = moment(date)
      const timeMomentObj = moment(inputValue)
      currentDateAndTime.hours(timeMomentObj.hours())
      currentDateAndTime.minutes(timeMomentObj.minutes())
      setShowTimePicker(Platform.OS === "ios")
      setDate(currentDateAndTime.toDate())
      setTime(inputValue)
    }
  }

  const handleAutocomplete = async (addressText) => {
    if (addressText == null) {
      return
    }
    setAddressLookup(addressText)
    if (String(addressText).length <= 4) {
      // Need more characters
      return
    }

    try {
      const result = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
        params: {
          input: addressText,
          types: "address",
          language: "en",
          key: "AIzaSyCKX3VD9qQtp6esG1Xe52s3vT1DAm72Wpo",
          components: "country:nz"
        }
      })
      const resultData = result.data
      if (resultData?.status === "OK") {
        setAddressAutocompleteResult(resultData?.predictions || [])
      }
    } catch (err) {
      console.error("error handleAutocomplete", err)
    }
  }

  const handleSelectAddress = (address) => {
    const description = address?.description || ""
    const place_id = address?.place_id || ""

    if (currentSelection === "departure") {
      setMeetupLocation(description)
      setPlaceId(place_id)
    } else {
      setDestinationLocation(description)
      setDestinationPlaceId(place_id)
    }
    // setAddressAutocompleteResult([])
    // setAddressLookup("")
    setShowDialog(false)
  }

  const resetAllFields = () => {
    setTitle("")
    setMeetupLocation("")
    setMaximumAttendant("")
    setDescription("")
    setDate(new Date())
    setTime(new Date())
    setPlaceId("")
    setAddressLookup("")
    setAddressAutocompleteResult([])
    setDestinationPlaceId("")
    setDestinationLocation("")
    setCurrentSelection("departure")
  }

  const handleCreateEvent = async () => {
    try {
      setWaiting(true)

      // Get the geometry location of the selected place ID
      const placeData = (await axios.get("https://maps.googleapis.com/maps/api/place/details/json", {
        params: {
          placeid: placeId,
          key: "AIzaSyCKX3VD9qQtp6esG1Xe52s3vT1DAm72Wpo"
        }
      })).data

      const destinationPlaceData = (await axios.get("https://maps.googleapis.com/maps/api/place/details/json", {
        params: {
          placeid: destinationPlaceId,
          key: "AIzaSyCKX3VD9qQtp6esG1Xe52s3vT1DAm72Wpo"
        }
      })).data

      const meetupLocation = {
        latitude: placeData?.result?.geometry?.location?.lat || "",
        longitude: placeData?.result?.geometry?.location?.lng || "",
      }

      const destinationLocation = {
        latitude: destinationPlaceData?.result?.geometry?.location?.lat || "",
        longitude: destinationPlaceData?.result?.geometry?.location?.lng || "",
      }

      const eventObj = {
        meetupLocation: meetupLocation,
        destinationLocation: destinationLocation,
        meetupTime: moment(date).toISOString(),
        maximumAttendant: maximumAttendant,
        minimumLicenseLevel: licenseList[selectedLicenseIndex.row],
        minimumPreferredPace: preferredPaceList[selectedPaceIndex.row],
        title: title,
        description: description
      }

      await serverInstance.post("/group", {
        data: eventObj
      })
      setWaiting(false)
      Alert.alert("Success", "The event has successfully been created!")
      resetAllFields()
    } catch (err) {
      console.error("error handleCreateEvent", err)
    }
  }

  return (
    <>
      <LoadingScreen waiting={waiting} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Layout level="1" style={styles.container}>
          <Text
            style={[styles.bottomSpace, styles.TextBox]}
            category='s1'
          >
            CREATE NEW GROUP RIDE
          </Text>

          <Text style={styles.subtitleBox} category="s1">
            Title
          </Text>
          <Input
            style={styles.bottomSpace}
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          <Text style={styles.subtitleBox} category="s1">
            Meetup Location
          </Text>
          <Input
            style={styles.bottomSpace}
            placeholder="Meetup Location"
            value={meetupLocation}
            disabled={true}
            selection={{
              start: 0,
              end: 0
            }}
          />
          <Button style={[styles.bottomSpace, styles.button]} onPress={() => {
            setCurrentSelection("departure")
            setShowDialog(true)
          }}>
            Search address
          </Button>

          <Text style={styles.subtitleBox} category="s1">
            Destination Location
          </Text>
          <Input
            style={styles.bottomSpace}
            placeholder="Destination Location"
            value={destinationLocation}
            disabled={true}
            selection={{
              start: 0,
              end: 0
            }}
          />
          <Button style={[styles.bottomSpace, styles.button]} onPress={() => {
            setCurrentSelection("arrival")
            setShowDialog(true)
          }}>
            Search address
          </Button>

          <Text style={styles.subtitleBox} category="s1">
            Attendants
          </Text>
          <Input
            keyboardType="numeric"
            value={maximumAttendant}
            onChangeText={(text) => setMaximumAttendant(text)}
            style={styles.bottomSpace}
            placeholder="Attendants"
          />

          <Text category="s1">Date and time</Text>
          {
            showDatePicker &&
            <DateTimePicker
              value={date}
              onChange={(e, selectedDate) => handleDateAndTime(selectedDate, "date")}
              mode={"date"}
              is24Hour={true}
            />
          }
          {
            showTimePicker &&
            <DateTimePicker
              value={time}
              onChange={(e, selectedDate) => handleDateAndTime(selectedDate, "time")}
              mode={"time"}
              is24Hour={true}
            />
          }
          <Input
            value={moment(date).format("DD/MMM/yyyy kk:mm")}
            style={styles.bottomSpace}
            placeholder="Date"
            disabled={true}
          />

          <View style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            marginBottom: 20
          }}>
            <Button style={[{ flex: 1 }, styles.button]} onPress={() => setShowDatePicker(true)}>
              Set date
            </Button>
            <Button style={[{ flex: 1 }, styles.button]} onPress={() => setShowTimePicker(true)}>
              Set time
            </Button>
          </View>

          <Text
            category='s1'
          >
            Minimum License Type
          </Text>
          <Select
            style={styles.bottomSpace}
            placeholder='Select License Type'
            value={displayLValue}
            selectedIndex={selectedLicenseIndex}
            onSelect={index => setSelectedLicenseIndex(index)}
          >
            {
              licenseList.map((license) => {
                return (
                  <SelectItem key={license} title={license} />
                )
              })
            }
          </Select>

          <Text
            category='s1'
          >
            Minimum Preferred Pace
          </Text>
          <Select
            style={styles.bottomSpace}
            placeholder='Select Pace Type'
            value={displayPValue}
            selectedIndex={selectedPaceIndex}
            onSelect={index => setSelectedPaceIndex(index)}
          >
            {
              preferredPaceList.map((pace) => {
                return (
                  <SelectItem key={pace} title={pace} />
                )
              })
            }
          </Select>

          <Text style={styles.subtitleBox} category="s1">
            Description
          </Text>
          <Input
            style={styles.bottomSpace}
            multiline={true}
            value={description}
            onChangeText={(text) => setDescription(text)}
            textStyle={{ minHeight: 64 }}
            placeholder="Description"
          />
          <Button style={styles.button} onPress={() => handleCreateEvent()} size="giant">
            Create
          </Button>
        </Layout>
      </ScrollView>
      <Modal
        visible={showDialog}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
        onBackdropPress={() => setShowDialog(false)}
      >
        <Card
          style={{
            minWidth: 300,
            width: "90%"
          }}
        >
          <View>
            <Text category="s1">
              Address autocomplete:
            </Text>
            <Input
              placeholder="Address..."
              value={addressLookup}
              onChangeText={(text) => handleAutocomplete(text)}
              autoCorrect={false}
            />
            <List
              data={addressAutocompleteResult}
              renderItem={({ item, index }) => {
                return (
                  <ListItem title={`${item.description}`} onPress={() => handleSelectAddress(item)} />
                )
              }}
            />
          </View>
        </Card>
      </Modal>
    </>
  );
};

const themedStyle = StyleService.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
  },
  contentContainer: {
    paddingVertical: 24,
  },
  TextBox: {
    marginTop: 30,
    alignSelf: "center",
  },
  bottomSpace: {
    marginBottom: 20,
  },
  subtitleBox: {
    marginHorizontal: 10,
  },
  button: {
    margin: 2,
    backgroundColor: '#27afe2'
  },
});
