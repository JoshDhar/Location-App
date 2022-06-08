import React, {useState} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {getDistance} from 'geolib';
const App = () => {
  const [position, setPosition] = useState({
    coords: {
      accuracy: 0.0,
      altitude: 0,
      altitudeAccuracy: 0.0,
      heading: 0.0,
      latitude: 0.0,
      longitude: 0.0,
      speed: 0.0,
    },
    mocked: false,
    provider: '',
    timestamp: 0,
  });
  const [distance, setDistance] = useState(0.0);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location App',
          message: 'Location App requires access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition(pos);
        setDistance(
          getDistance(pos.coords, {
            latitude: 22.626256,
            longitude: 88.346666,
          }),
        );
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const handleLocation = async () => {
    const permission = await requestLocationPermission();
    if (permission === true) {
      getLocation();
    } else {
      alert('Please grant Location permission');
    }
  };
  return (
    <View style={styles.View}>
      <TouchableOpacity style={styles.Btn} onPress={handleLocation}>
        <Text style={styles.BtnText}>Locate Me</Text>
      </TouchableOpacity>
      <View style={styles.Details}>
        <View style={styles.row}>
          <Text style={styles.Label}>Longitude:</Text>
          <Text style={styles.Value}>{position.coords.longitude}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.Label}>Latitude:</Text>
          <Text style={styles.Value}>{position.coords.latitude}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.Label}>Distance from Home:</Text>
          <Text style={styles.Value}>{distance} meters</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Btn: {
    justifyContent: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  BtnText: {
    color: 'white',
    fontSize: 18,
  },
  Details: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  Label: {
    color: 'black',
    fontSize: 16,
  },
  Value: {
    color: 'black',
    fontSize: 16,
  },
});

export default App;
