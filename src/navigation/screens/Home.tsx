import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchShows} from '../../redux/showsSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/Card';
import {Details} from '.';
import {FlatList, StyleSheet} from 'react-native';
import {Show} from '../../redux/common/types';
import colors from '../../shared/Colors';
import useModal from '../../hooks/useModal';
import useLoaderOverlay from '../../hooks/useLoader';
import {LoadingStatus} from '../../redux/common/enums';

export default function Home() {
  const dispatch = useDispatch();
  const {shows, loading} = useSelector(state => state.shows);
  const numColumns = 2;
  const {openModal, closeModal, ModalWrapper} = useModal();
  const {showLoader, hideLoader, LoaderOverlay} = useLoaderOverlay();

  useEffect(() => {
    dispatch(fetchShows());
  }, [dispatch]);

  useEffect(() => {
    if (loading === LoadingStatus.PENDING) {
      showLoader();
    }
    return () => {
      hideLoader();
    };
  }, [loading, showLoader, hideLoader]);

  const handleOpenAction = useCallback(
    (show: Show) => {
      openModal(<Details show={show} closeModal={closeModal} />);
    },
    [openModal, closeModal],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={shows}
        renderItem={({item}) => (
          <Card
            {...item}
            onCallbackFn={() => handleOpenAction(item)}
            size="medium"
          />
        )}
        numColumns={numColumns}
        contentContainerStyle={styles.contentContainer}
      />
      <LoaderOverlay />
      <ModalWrapper />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    alignItems: 'center',
  },
});
