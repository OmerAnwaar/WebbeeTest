import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constants/colors';
import { Category } from '../store/features/categorySlice';
import { RootState } from '../store/store';
export default function DrawerContent(props: any) {
  const { category } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch();
  // const User = useSelector((state) => state.category);
  // const list = [
  //   {
  //     name: 'Menu',
  //     icon: 'category',
  //     type: MaterialIcons,
  //     screen: 'TabThreeScreen',
  //   },
  //   {
  //     name: 'Setting',
  //     icon: 'setting',
  //     type: AntDesign,
  //     screen: 'Profile',
  //   },
  //   {
  //     name: 'Change Company',
  //     icon: 'building',
  //     type: FontAwesome5,
  //     screen: 'Assigned Companies',
  //   },

  //   {
  //     name: 'Sign Out',
  //     icon: 'log-out',
  //     type: Feather,
  //     screen: '',
  //   },
  // ];

  return (
    <DrawerContentScrollView
      contentContainerStyle={{ flex: 1 }}
      {...props}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.drawerContent}>
        <TouchableOpacity
          style={{ paddingVertical: '5%' }}
          onPress={() => {
            props.navigation.navigate('TabOne');
          }}
        >
          <Text>Dashboard</Text>
        </TouchableOpacity>
        {category.map((item: Category, i: number) => {
          return (
            <TouchableOpacity
              key={i}
              style={{ paddingVertical: '5%' }}
              onPress={() => {
                props.navigation.navigate('TabThree', {
                  name: item.name,
                  id: item.id,
                });
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={{ paddingVertical: '5%' }}
          onPress={() => {
            props.navigation.navigate('TabTwo');
          }}
        >
          <Text>Manage Category</Text>
        </TouchableOpacity>
        {/* <Divider /> */}
        {/* <VStack style={styles.drawerSection} {...props}>
          {list.map((item, i) => (
            <Pressable
              onPress={() => {
                if (item.name === 'Sign Out') {
                  props.navigation.closeDrawer();
                  dispatch(USER_STATUS_OUT());
                } else props.navigation.navigate(item.screen);
              }}
              key={i}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? colors.PRIMARY_LIGHT_90 : 'white',
                },
                {
                  borderBottomStartRadius: 25,
                  borderTopEndRadius: 25,
                  marginHorizontal: 7,
                  padding: 2,
                },
              ]}>
              <HStack space={3} alignItems="center" style={{margin: 10}}>
                <Center>
                  <Icon
                    name={item.icon}
                    color={colors.PRIMARY}
                    as={item.type}
                    size="sm"
                  />
                </Center>
                <Center>
                  <Text style={[styles.text]}>{item.name}</Text>
                </Center>
              </HStack>
            </Pressable>
          ))}
          <Divider my={4} />
        </VStack>

    */}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    margin: 12,
  },
});
