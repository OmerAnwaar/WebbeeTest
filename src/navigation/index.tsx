/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import { RootStackParamList, RootTabParamList } from '../../types';
import TabOneScreen from '../screens/TabOneScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import DrawerContent from './Drawer';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <MyDrawer />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function StackNavigator({ navigation }: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Ionicons name='menu' color='blue' size={28} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name='TabOne'
        component={TabTwoScreen}
        options={{ title: 'Dashboard' }}
      />
      <Stack.Screen
        name='TabTwo'
        component={TabOneScreen}
        options={{ title: 'Manage Category' }}
      />
      <Stack.Screen name='TabThree' component={TabThreeScreen} options={{}} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName='Root'
      defaultStatus='closed'
      screenOptions={{
        drawerStyle: {
          // backgroundColor: "#c6cbef",
        },
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name='Root' component={StackNavigator} />
    </Drawer.Navigator>
  );
}
