import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import colors from '../../shared/Colors';
import SearchInput from '../../components/SearchInput';
import {searchShowsAPI} from '../../services/api';
import {Show} from '../../redux/common/types';

const SearchScreen = () => {
  const [data, setData] = useState<Show[]>([]);

  function formatData(data: Show[]) {
    return data.map(item => item.show);
  }

  const handleSearch = async (query: string) => {
    const shows = await searchShowsAPI(query);
    const formattedShows = formatData(shows);
    setData(formattedShows);
  };

  return (
    <View style={styles.container}>
      <SearchInput onSubmitCallback={value => handleSearch(value)} />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.showItem}>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.name}
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
});

export default SearchScreen;
