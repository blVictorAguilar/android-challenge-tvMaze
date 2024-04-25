import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeFavorite, selectFavorites} from '../../redux/favoritesSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../shared/Colors';
import HeaderButtons from '../../components/HeaderButtons';
import {Show} from '../../redux/common/types';
import globalStyles from '../../shared/GlobalStyles';
import Separator from '../../components/Separator';
import {AlphabeticSort} from '../../common/types';
import {sortElements} from '../../utils';

const Favorites = () => {
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState<AlphabeticSort>('asc');
  const favorites = useSelector(selectFavorites);
  const [sortedFavorites, setSortedFavorites] = useState<Show[] | null>(null);

  function toggleFilter() {
    setFilterStatus(prevState => {
      return prevState === 'asc' ? 'desc' : 'asc';
    });
  }

  useEffect(() => {
    if (!favorites.length) {
      setSortedFavorites([]);
    }
    const sortedElements = sortElements(filterStatus, [...favorites], 'name');
    setSortedFavorites([...sortedElements]);
  }, [filterStatus, favorites]);

  const elements = [
    {
      name: 'sort-by-alpha',
      onPressFn: () => toggleFilter(),
    },
  ];

  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };

  const renderFavoriteShow = ({item}: {item: Show}) => {
    const {id, image, name, genres} = item;
    return (
      <View style={styles.card}>
        <Image source={{uri: image.medium}} style={styles.image} />
        <View style={styles.details}>
          <Text style={globalStyles.sectionTitle}>{name}</Text>
          <Text style={[globalStyles.paragraph, styles.genres]}>
            {genres.join(', ')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleRemoveFavorite(id)}
          style={styles.removeButton}>
          <Icon name="close" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderButtons elements={elements} orientation="right" />
      <FlatList
        data={sortedFavorites}
        renderItem={renderFavoriteShow}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
    paddingTop: 50,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.text,
  },
  genres: {
    color: colors.text,
  },
  removeButton: {
    padding: 5,
  },
});

export default Favorites;
