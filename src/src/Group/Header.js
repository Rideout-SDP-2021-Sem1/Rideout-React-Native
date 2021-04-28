import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

function Header(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <View style={styles.rect2}></View>
          <View style={styles.rect3}></View>
          <View style={styles.rect4}></View>
          <View style={styles.rect5}></View>
        </View>
        <TextInput
          placeholder="Header"
          textBreakStrategy="highQuality"
          keyboardType="default"
          autoCapitalize="words"
          style={styles.head}></TextInput>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backbutton}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rect6}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rect: {
    top: 0,
    left: 0,
    width: 375,
    height: 119,
    position: 'absolute',
    backgroundColor: 'rgba(212,203,203,0.39)',
    opacity: 0.76,
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.18,
    shadowRadius: 0,
    overflow: 'hidden',
  },
  rect2: {
    flex: 0.25,
    backgroundColor: 'rgba(215, 215, 215,1)',
    height: 0,
    width: 175,
    marginTop: 100,
    marginLeft: 100,
  },
  rect3: {
    flex: 0.25,
    backgroundColor: 'rgba(212, 212, 212,1)',
    height: 0,
    width: 175,
    marginTop: 200,
    marginLeft: 100,
  },
  rect4: {
    flex: 0.25,
    backgroundColor: 'rgba(207, 207, 207,1)',
    height: 0,
    width: 175,
    marginTop: 200,
    marginLeft: 100,
  },
  rect5: {
    flex: 0.25,
    backgroundColor: 'rgba(231, 231, 231,1)',
    height: 0,
    width: 175,
    marginTop: 200,
    marginLeft: 100,
  },
  head: {
    top: 80,
    position: 'absolute',
    fontFamily: 'roboto-700',
    color: 'rgba(2,2,2,1)',
    height: 39,
    width: 216,
    textAlign: 'center',
    left: 73,
  },
  backbutton: {
    top: 80,
    left: 0,
    width: 73,
    height: 34,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(191,171,171,1)',
  },
  back: {
    fontFamily: 'arial-regular',
    color: 'rgba(0,14,245,1)',
    marginTop: 9,
    marginLeft: 21,
  },
  rectStack: {
    width: 375,
    height: 119,
    marginTop: -28,
  },
  rect6: {
    width: 359,
    height: 619,
    backgroundColor: '#E6E6E6',
    marginTop: 1,
    marginLeft: 808,
  },
});

export default Header;
