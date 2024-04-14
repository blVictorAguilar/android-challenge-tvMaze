import React, {useRef, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import colors from '../../shared/Colors';
import SearchInput from '../../components/SearchInput';
import {searchShowsAPI} from '../../services/api';
import {SearchShowShape, Show} from '../../redux/common/types';
import Card from '../../components/Card';
import {useFocusEffect} from '@react-navigation/native';

const SearchScreen = () => {
  const [data, setData] = useState<Show[]>([]);
  const numColumns = 3;
  const searchInputRef = useRef(null);

  function formatData(arr: SearchShowShape[]) {
    return arr.map(item => item.show);
  }

  const handleSearch = async (query: string) => {
    const shows = await searchShowsAPI(query);
    const formattedShows = formatData(shows);
    setData(formattedShows);
  };

  function elementToRender(item) {
    return <Card {...item} showLabel={false} size="small" />;
  }
  function clearState() {
    setData([]);
    searchInputRef.current?.clear();
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearState();
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <SearchInput
        onSubmitCallback={value => handleSearch(value)}
        ref={searchInputRef}
        placeholder="Movies, Shows and More"
      />
      <FlatList
        data={data}
        numColumns={numColumns}
        renderItem={({item}) => elementToRender(item)}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  showItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  genres: {
    color: colors.text,
    marginBottom: 5,
  },
  details: {
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  summary: {
    color: colors.text,
  },
});

export default SearchScreen;
