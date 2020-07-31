import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import * as volunteersActions from '../../store/actions/volunteers';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditVolunteerScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const volId = props.navigation.getParam('volunteerId');
  const editedVolunteer = useSelector((state) =>
    state.volunteers.userVolunteers.find((vol) => vol.id === volId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedVolunteer ? editedVolunteer.title : '',
      imageUrl: editedVolunteer ? editedVolunteer.imageUrl : '',
      location: editedVolunteer ? editedVolunteer.location : '',
      time: editedVolunteer ? editedVolunteer.time : '',
      description: editedVolunteer ? editedVolunteer.description : ''
    },
    formIsValid: !!editedVolunteer
  });

  useEffect(() => {
    if (error) {
      Alert.alert('התרחשה שגיאה.. אנא נסה שנית..', error, [{ text: 'המשך' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('טעות בהזנת הנתונים!', 'אנא בדוק שגיאות הזנה בטופס.', [{ text: 'המשך' }]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedVolunteer) {
        await dispatch(
          volunteersActions.updateVolunteer(
            volId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            formState.inputValues.location,
            formState.inputValues.time
          )
        );
      } else {
        await dispatch(
          volunteersActions.createVolunteer(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            formState.inputValues.location,
            formState.inputValues.time
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, volId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="נושא הבקשה"
          errorText="אנא הכנס כותרת הבקשה!"
          onInputChange={inputChangeHandler}
          initialValue={editedVolunteer ? editedVolunteer.title : ''}
          initiallyValid={!!editedVolunteer}
        />
        <Input
          id="imageUrl"
          label="קישור לתמונה"
          errorText="אנא הכנס קישור תקין!"
          onInputChange={inputChangeHandler}
          initialValue={editedVolunteer ? editedVolunteer.imageUrl : ''}
          initiallyValid={!!editedVolunteer}
          required
        />
        <Input
          id="location"
          label="אזור"
          errorText="אנא הכנס אזור תקין!"
          onInputChange={inputChangeHandler}
          initialValue={editedVolunteer ? editedVolunteer.location : ''}
          initiallyValid={!!editedVolunteer}
          required
        />
        <Input
          id="time"
          label="תאריך ושעה"
          errorText="אנא הכנס תאריך ושעה תקינה!"
          onInputChange={inputChangeHandler}
          initialValue={editedVolunteer ? editedVolunteer.time : ''}
          initiallyValid={!!editedVolunteer}
          required
        />
        <Input
          id="description"
          label="פרטים נוספים (אופציולני)"
          errorText="אנא הכנס תאור תקין!"
          onInputChange={inputChangeHandler}
          initialValue={editedVolunteer ? editedVolunteer.description : ''}
          initiallyValid={!!editedVolunteer}
        />
      </View>
    </ScrollView>
  );
};

EditVolunteerScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('volunteerId')
      ? 'MakeGood - ערוך בקשה'
      : 'MakeGood - הוסף בקשה',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" iconName={'md-checkmark'} onPress={submitFn} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditVolunteerScreen;
