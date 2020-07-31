import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import CommitmentItem from '../../components/itemsList/Commitment';
import * as commitmentsActions from '../../store/actions/commitments';
import Colors from '../../constants/Colors';

const CommitmentsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const commitments = useSelector((state) => state.commitments.commitments);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(commitmentsActions.fetchCommitments()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (commitments.length === 0) {
    return (
      <View style={styles.view1}>
        <Text>לא נמצאו התנדבויות, כדאי להתחיל להתנדב ולשמח מישהו...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.view2}>
        <Text style={styles.text}>צברת {commitments.length * 30} נקודות</Text>
      </View>
      <FlatList
        data={commitments}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <CommitmentItem
            points={itemData.item.points}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
        )}
      />
    </ScrollView>
  );
};

CommitmentsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'MakeGood - ההתנדבויות שלי',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={'md-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  view1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CommitmentsScreen;
