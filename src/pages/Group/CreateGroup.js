import React, { useState } from "react";
import { ScrollView, Image, View, Alert, TouchableOpacity, Platform, TextInput } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Button,
  SelectItem,
  Layout,
  Datepicker,
  Icon,
  Input,
  IndexPath,
  Select,
  Text,
  Autocomplete,
} from "@ui-kitten/components";
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const CalendarIcon = (props) => <Icon {...props} name="calendar" />;

const EditIcon = (props) => <Icon {...props} name="edit-outline" />;

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

  // const EditDateIcon = (props) => {
  //   return (
  //     <TouchableOpacity onPress={() => setShowDatePicker(true)}>
  //       <Icon {...props} name={"edit-outline"} />
  //     </TouchableOpacity>
  //   )
  // }

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

  return (
    <>
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
            Location
          </Text>
          {/* <GoogleAutoComplete apiKey="AIzaSyB-ebrCUSbJeoTMpBNoRD-mh1aIei3eK3Y" debounce={300}>
            {({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
              <React.Fragment>
                <TextInput
                  style={{
                    height: 40,
                    width: 300,
                    borderWidth: 1,
                    paddingHorizontal: 16,
                  }}
                  value={inputValue}
                  onChangeText={handleTextChange}
                  placeholder="Location..."
                />
                <ScrollView style={{ maxHeight: 100 }}>
                  {locationResults.map((el, i) => (
                    <LocationItem
                      {...el}
                      fetchDetails={fetchDetails}
                      key={String(i)}
                    />
                  ))}
                </ScrollView>
              </React.Fragment>
            )}
          </GoogleAutoComplete> */}

          {/* <Autocomplete
            placeholder="Search for a location"
            value={meetupLocation}
            style={styles.bottomSpace}
          /> */}
          {/* <Input
            style={styles.bottomSpace}
            placeholder="Address"
            value={meetupLocation}
            onChangeText={(text) => setMeetupLocation(text)}
          /> */}
          {/* <View>
            <GooglePlacesAutocomplete
              placeholder='Search'
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              query={{
                key: 'AIzaSyB-ebrCUSbJeoTMpBNoRD-mh1aIei3eK3Y',
                language: 'en',
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: "grey"
                },
                textInput: {
                  backgroundColor: "grey"
                }
              }}
            />
          </View> */}

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
            <Button style={{ flex: 1 }} onPress={() => setShowDatePicker(true)}>
              Set date
            </Button>
            <Button style={{ flex: 1 }} onPress={() => setShowTimePicker(true)}>
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
          <Button style={styles.button} size="giant">
            Create
          </Button>
        </Layout>
      </ScrollView>
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
  },
});
