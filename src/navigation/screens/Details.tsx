import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import globalStyles from '../../shared/GlobalStyles';
import colors from '../../shared/Colors';
import HeaderButtons from '../../components/HeaderButtons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFavorite,
  removeFavorite,
  selectFavoriteById,
} from '../../redux/favoritesSlice';
import SummarySection from '../../components/SummarySection';
import {Show} from '../../redux/common/types';
import {RootState} from '../../redux/store';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ShowDetailsScreen = React.memo(
  ({show, closeModal}: {show: Show; closeModal?: () => void}) => {
    const {image, name, genres, summary, schedule, id} = show;
    const dispatch = useDispatch();
    const isFavorite = useSelector((state: RootState) =>
      selectFavoriteById(state, id),
    );

    const headerElements = [
      {
        name: 'close',
        onPressFn: closeModal,
      },
      {
        name: 'favorite',
        onPressFn: isFavorite
          ? () => dispatch(removeFavorite(id))
          : () => dispatch(addFavorite(show)),
        focused: isFavorite,
      },
    ];

    return (
      <View style={styles.container}>
        <HeaderButtons elements={headerElements} />
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image source={{uri: image.original}} style={styles.coverImage} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={globalStyles.title}>{name}</Text>
            {schedule?.days && schedule?.time && (
              <Text style={globalStyles.paragraph}>
                {schedule.days.join(', ').concat(' ' + schedule.time)}
              </Text>
            )}
            <Text style={globalStyles.details}>{genres.join(' - ')}</Text>
            <SummarySection text={summary} />
          </View>
        </ScrollView>
      </View>
    );
  },
);

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
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 15,
  },
});

export default ShowDetailsScreen;
