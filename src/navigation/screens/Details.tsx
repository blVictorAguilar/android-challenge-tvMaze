import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Show} from '../../redux/common/types';
import globalStyles, {FontSizes} from '../../shared/GlobalStyles';
import colors from '../../shared/Colors';
import {getGroupedEpisodes} from '../../services/api';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ShowDetailsScreen = ({
  image,
  name,
  genres,
  summary,
  schedule,
  id,
  closeModal, // Function to close the modal
}: Show & {closeModal: () => void}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [episodes, setEpisodes] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await getGroupedEpisodes(id);
    setEpisodes(response);
  }, [id]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Text>X</Text>
        </TouchableOpacity>
        <Image source={{uri: image.original}} style={styles.coverImage} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={globalStyles.title}>{name}</Text>

        {schedule?.days && schedule?.time && (
          <Text style={globalStyles.subtitle}>
            {schedule.days.join(', ').concat(' ' + schedule.time)}
          </Text>
        )}
        <Text style={globalStyles.details}>{genres.join(' - ')}</Text>
        <View style={{marginTop: 10}}>
          <Text style={globalStyles.paragraph}>
            {collapsed
              ? summary.replace(/<[^>]*>/g, '').slice(0, 200) + '...'
              : summary.replace(/<[^>]*>/g, '')}
          </Text>
          <TouchableOpacity onPress={toggleCollapse}>
            <Text style={styles.showMore}>
              {collapsed ? 'Show more' : 'Show less'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    position: 'relative',
  },
  coverImage: {
    width: windowWidth,
    height: windowHeight * 0.65,
    resizeMode: 'stretch',
  },
  detailsContainer: {
    padding: 15,
  },
  showMore: {
    fontSize: FontSizes.S,
    color: colors.text,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'red',
  },
});

export default ShowDetailsScreen;
