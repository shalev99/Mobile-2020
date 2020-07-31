import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { SafeAreaView, Button, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import VolunteersOverviewScreen from '../screens/Main/VolunteersOverviewScreen';
import VolunteerDetailScreen from '../screens/Main/VolunteerDetailScreen';
import CommitmentsScreen from '../screens/Main/CommitmentsScreen';
import UserVolunteersScreen from '../screens/user/UserVolunteersScreen';
import EditVolunteerScreen from '../screens/user/EditVolunteerScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    fontWeight: 'bold'
  },
  headerTintColor: 'white'
};

const VolunteersNavigator = createStackNavigator(
  {
    VolunteersOverview: VolunteersOverviewScreen,
    VolunteerDetail: VolunteerDetailScreen
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name={'md-cart'} size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const CommitmentsNavigator = createStackNavigator(
  {
    Commitments: CommitmentsScreen
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name={'md-list'} size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserVolunteers: UserVolunteersScreen,
    EditVolunteer: EditVolunteerScreen
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name={'md-create'} size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AppNavigator = createDrawerNavigator(
  {
    'התנדב עכשיו': VolunteersNavigator,
    'ההתנדבויות שלי': CommitmentsNavigator,
    'בקש עזרה': AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={styles.hamburger}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="התנתק"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Main: AppNavigator
});

const styles = StyleSheet.create({
  hamburger: { flex: 1, paddingTop: 50 }
});

export default createAppContainer(MainNavigator);
