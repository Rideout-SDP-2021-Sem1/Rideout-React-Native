# gotta add code:

src/tests/MapScreen.test.js

import MapScreen from '../map/MapScreen.js'

// Make sure emulator location matches this location:
let emulatorLocation = {
    latitude: -33.33333,
    longitude: 173.3333,
    latitudeDelta: 0.033,
    longitudeDelta: 0.033,
}

// Test getMyLocation Function
test('When user location is requested, user location should be returned', () => {
    expect(MapScreen.getMyLocation()).toBe(emulatorLocation)
})

// Change current location:
emulatorLocation = {
    latitude: -44.44444,
    longitude: 174.4444,
    latitudeDelta: 0.044,
    longitudeDelta: 0.044
}

// Test setCurrentLocation Function
test('When user location is set, user location should be change', () => {
    expect(MapScreen.setCurrentLocation(emulatorLocation)).toBe(emulatorLocation)
})
