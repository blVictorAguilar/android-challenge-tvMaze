import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../shared/Colors';
import globalStyles from '../../shared/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const handleClearData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={globalStyles.title}>Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={globalStyles.sectionTitle}>Name:</Text>
        <Text style={globalStyles.paragraph}>Victor Aguilar</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={globalStyles.sectionTitle}>Email:</Text>
        <Text style={globalStyles.paragraph}>blvictoraguilar@gmail.com</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={globalStyles.sectionTitle}>Application Info:</Text>
        <Text style={globalStyles.paragraph}>Version 1.0.0</Text>
      </View>
      <View style={styles.linkedInContainer}>
        <Icon
          name="linkedin"
          size={24}
          color={colors.highlight}
          style={styles.icon}
        />
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.linkedin.com/in/victor-aguilar-7a60a3162/',
            )
          }>
          <Text style={globalStyles.sectionTitle}>Connect on LinkedIn</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearData}>
        <Text style={styles.clearButtonText}>Clear Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },

  infoContainer: {
    marginBottom: 10,
  },

  value: {
    fontSize: 16,
    color: colors.text,
  },
  clearButton: {
    backgroundColor: colors.focused,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  clearButtonText: {
    fontSize: 16,
    color: colors.highlight,
  },
  linkedInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
});

export default Profile;
