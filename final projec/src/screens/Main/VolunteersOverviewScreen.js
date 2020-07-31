import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import VolunteerItem from '../../components/itemsList/VolunteerItem';
import * as volunteersActions from '../../store/actions/volunteers';
import Colors from '../../constants/Colors';
import * as commitmentsActions from '../../store/actions/commitments';

const VolunteersOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const volunteers = useSelector((state) => state.volunteers.availableVolunteers);
  const dispatch = useDispatch();

  const loadVolunteers = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(volunteersActions.fetchVolunteers());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadVolunteers);

    return () => {
      willFocusSub.remove();
    };
  }, [loadVolunteers]);

  useEffect(() => {
    setIsLoading(true);
    loadVolunteers().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadVolunteers]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('VolunteerDetail', {
      volunteerId: id,
      volunteerTitle: title
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>בעיה בטעינה נסה שוב...</Text>
        <Button title="נסה שוב" onPress={loadVolunteers} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && volunteers.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>אין התנדבויות כרגע... חזור מאוחר יותר למצוא היכן להתנדב</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadVolunteers}
      refreshing={isRefreshing}
      data={volunteers}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <VolunteerItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          location={itemData.item.location}
          time={itemData.item.time}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            //title={0 ? 'לחצת כבר' : 'התנדב'}
            title={'התנדב'}
            onPress={() => {
              dispatch(commitmentsActions.addCommitment(itemData.item));
            }}
          />
          <Button
            color={Colors.primary}
            title="ראה פרטים"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
        </VolunteerItem>
      )}
    />
  );
};

VolunteersOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'MakeGood - התנדב עכשיו',
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
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default VolunteersOverviewScreen;
