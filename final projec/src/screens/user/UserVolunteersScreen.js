import React from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import VolunteerItem from '../../components/itemsList/VolunteerItem';
import Colors from '../../constants/Colors';
import * as volunteersActions from '../../store/actions/volunteers';

const UserVolunteersScreen = (props) => {
  const userVolunteers = useSelector((state) => state.volunteers.userVolunteers);
  const dispatch = useDispatch();

  const editVolunteerHandler = (id) => {
    props.navigation.navigate('EditVolunteer', { volunteerId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('אתה בטוח?', 'ברצונך למחוק את הבקשה?', [
      { text: 'לא', style: 'default' },
      {
        text: 'כן',
        style: 'destructive',
        onPress: () => {
          dispatch(volunteersActions.deleteVolunteer(id));
        }
      }
    ]);
  };

  if (userVolunteers.length === 0) {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>
          אין לך בקשות..{'\n'} אם אתה צריך עזרה תכניס את הפרטים{'\n'} והקילה שלנו תשמח לעזור לך..
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userVolunteers}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <VolunteerItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          location={itemData.item.location}
          time={itemData.item.time}
          description={itemData.item.description}
          onSelect={() => {
            editVolunteerHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="ערוך"
            onPress={() => {
              editVolunteerHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="מחק"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </VolunteerItem>
      )}
    />
  );
};

UserVolunteersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'MakeGood - הבקשות שלי',
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={'md-create'}
          onPress={() => {
            navData.navigation.navigate('EditVolunteer');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  }
});

export default UserVolunteersScreen;
