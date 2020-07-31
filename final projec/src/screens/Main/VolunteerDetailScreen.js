import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as commitmentsActions from '../../store/actions/commitments';

const VolunteerDetailScreen = (props) => {
  const volunteerId = props.navigation.getParam('volunteerId');
  const selectedVolunteer = useSelector((state) =>
    state.volunteers.availableVolunteers.find((vol) => vol.id === volunteerId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedVolunteer.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="התנדב"
          onPress={() => {
            dispatch(commitmentsActions.addCommitment(selectedVolunteer));
          }}
        />
      </View>
      <Text style={styles.location}>מיקום: {selectedVolunteer.location}</Text>
      <Text style={styles.time}>תאריך ושעה: {selectedVolunteer.time}</Text>
      <Text style={styles.description}>פרטים נוספים: {selectedVolunteer.description}</Text>
    </ScrollView>
  );
};

VolunteerDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'MakeGood - ' + navData.navigation.getParam('volunteerTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  location: {
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold'
  },
  time: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: '#8c8c8c',
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default VolunteerDetailScreen;
