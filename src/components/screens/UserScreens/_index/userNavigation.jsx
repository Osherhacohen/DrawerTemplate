import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../Profile/Profile';
import Feature1_Home from '../Home/Home';


const Drawer = createDrawerNavigator();

export default function UserDrawerNavigation()
{
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Feature1_Home} />
        <Drawer.Screen name="Notifications" component={Profile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


