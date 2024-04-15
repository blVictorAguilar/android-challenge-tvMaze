import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import colors from '../../shared/Colors';
import SearchInput from '../../components/SearchInput';
import {searchShowsAPI} from '../../services/api';
import {SearchShowShape, Show} from '../../redux/common/types';
import Card from '../../components/Card';
import {useFocusEffect} from '@react-navigation/native';
import {Details} from '.';
import useModal from '../../hooks/useModal';
import useLoaderOverlay from '../../hooks/useLoader';

const SearchScreen = () => {
  const [data, setData] = useState<Show[]>([]);
  const numColumns = 3;
  const searchInputRef = useRef(null);

  const {openModal, closeModal, ModalWrapper} = useModal();
  const {showLoader, hideLoader, LoaderOverlay} = useLoaderOverlay();

  const handleOpenAction = useCallback(
    (show: Show) => {
      openModal(<Details show={show} closeModal={closeModal} />);
    },
    [openModal, closeModal],
  );

  function formatData(arr: SearchShowShape[]) {
    return arr.map(item => item.show);
  }

  const handleSearch = async (query: string) => {
    showLoader();
    const shows = await searchShowsAPI(query);
    const formattedShows = formatData(shows);
    setData(formattedShows);
    hideLoader();
  };

  function elementToRender(item) {
    return (
      <Card
        {...item}
        showLabel={false}
        size="small"
        onCallbackFn={() => handleOpenAction(item)}
      />
    );
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
    <SafeAreaView style={styles.container}>
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
      <LoaderOverlay />
      <ModalWrapper />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
});

export default SearchScreen;
