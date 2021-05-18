import React from "react";
//import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ScrollView, Image, View, Alert } from "react-native";
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
  multilineInputState,
} from "@ui-kitten/components";

const CalendarIcon = (props) => <Icon {...props} name="calendar" />;

export const CreateGroup = (props) => {
  const [selectedlicense, setSelectedlicense] = React.useState([
    new IndexPath(0),
    new IndexPath(1),
  ]);

  const [selectedpreferredPace, setSelectedpreferredPace] = React.useState([
    new IndexPath(0),
    new IndexPath(1),
  ]);
  const [date, setDate] = React.useState(new Date());
  const styles = useStyleSheet(themedStyle);

  return (
    <>
      <ScrollView
        Style={StyleService.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Layout level="1" style={styles.container}>
          <Text style={styles.subtitleBox} category="s1">
            GroupName
          </Text>
          <Input style={styles.bottomSpace} placeholder="GroupName" />

          <Text style={styles.subtitleBox} category="s1">
            Location
          </Text>
          <Input style={styles.bottomSpace} placeholder="Location" />

          <Text style={styles.subtitleBox} category="s1">
            Attendants
          </Text>
          <Input
            keyboardType="numeric"
            style={styles.bottomSpace}
            placeholder="Attendants"
          />
          <Text category="s1">Date</Text>
          <Datepicker
            style={styles.bottomSpace}
            label="Date"
            placeholder="Pick Date"
            date={date}
            onSelect={(nextDate) => setDate(nextDate)}
            accessoryRight={CalendarIcon}
          />
          <Text style={styles.subtitleBox} category="s1">
            License
          </Text>
          <Select
            style={styles.bottomSpace}
            multiSelect={true}
            selectedlicense={selectedlicense}
            onSelect={(index) => setSelectedlicense(index)}
          >
            <SelectItem title="Learners" />
            <SelectItem title="Restricted" />
            <SelectItem title="Full" />
          </Select>
          <Text style={styles.subtitleBox} category="s1">
            Preferred Pace
          </Text>
          <Select
            style={styles.bottomSpace}
            multiSelect={true}
            selectedpreferredPace={selectedpreferredPace}
            onSelect={(index) => setSelectedpreferredPace(index)}
          >
            <SelectItem title="Relaxed1" />
            <SelectItem title="Mixed" />
            <SelectItem title="Spirited" />
          </Select>
          <Text style={styles.subtitleBox} category="s1">
            Description
          </Text>
          <Input
            style={styles.bottomSpace}
            multiline={true}
            textStyle={{ minHeight: 64 }}
            placeholder="Description"
            {...multilineInputState}
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
    minHeight: 360,
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
