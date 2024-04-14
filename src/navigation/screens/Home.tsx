import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchShows} from '../../redux/showsSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/Card';
import Modal from 'react-native-modal/dist/modal';
import {Details} from '.';
import {FlatList, StyleSheet} from 'react-native';
import {Show} from '../../redux/common/types';
import colors from '../../shared/Colors';

type selectedShowType = Pick<
  Show,
  'image' | 'name' | 'genres' | 'summary' | 'schedule' | 'id'
> | null;

export default function Home() {
  const dispatch = useDispatch();
  const {shows} = useSelector(state => state.shows);
  const [selectedShow, setSelectedShow] = useState<selectedShowType>(null);
  const numColumns = 2;
  useEffect(() => {
    dispatch(fetchShows());
  }, [dispatch]);

  const openModal = useCallback((show: Show) => {
    setSelectedShow(show);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedShow(null);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={shows}
        renderItem={({item}) => (
          <Card {...item} onCallbackFn={() => openModal(item)} size="medium" />
        )}
        numColumns={numColumns}
        contentContainerStyle={styles.contentContainer}
      />
      <Modal
        isVisible={selectedShow !== null}
        onBackdropPress={closeModal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="fadeOutDown"
        style={styles.modal}>
        {selectedShow && <Details {...selectedShow} closeModal={closeModal} />}
      </Modal>
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
  modal: {
    flex: 1,
    margin: 0,
  },
});
