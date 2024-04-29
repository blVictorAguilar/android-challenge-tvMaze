import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../shared/Colors';
import globalStyles from '../../shared/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Section from '../../components/Section';
import Separator from '../../components/Separator';

const LINKEDIN_PROFILE =
  'https://www.linkedin.com/in/victor-aguilar-7a60a3162/';

const sectionFields = [
  {title: 'Name :', content: 'Victor Aguilar'},
  {title: 'Email :', content: 'blvictoraguilar@gmail.com'},
  {title: 'Phone :', content: '7771423552'},
  {title: 'Application info :', content: 'Version 1.0.0'},
];

const Profile = () => {
  const handleClearData = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Data cleared successfully....');
    } catch (error) {
      Alert.alert('Error clearing AsyncStorage:' + error);
    }
  };

  return (
    <View style={styles.container}>
      {sectionFields.map(item => (
        <>
          <Section key={item.title} {...item} />
          <Separator />
        </>
      ))}
      <View style={styles.linkedInContainer}>
        <Icon
          name="linkedin"
          size={24}
          color={colors.highlight}
          style={styles.icon}
        />
        <TouchableOpacity onPress={() => Linking.openURL(LINKEDIN_PROFILE)}>
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
