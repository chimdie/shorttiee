import {Tabs} from 'expo-router';
import React from 'react';
import {getColor} from '@/config/theme';
import {Feather} from '@expo/vector-icons';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={24} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: getColor('shorttiee-primary'),
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 12,
          height: 60,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({color}) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          href: null,
          title: 'Payment',
          tabBarIcon: ({color}) => (
            <TabBarIcon name="credit-card" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Booking',
          tabBarIcon: ({color}) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({color}) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="apartment-details"
        options={{
          href: null,
          title: 'Apartment',
          tabBarStyle: {display: 'none'},
        }}
      />
      <Tabs.Screen
        name="edit-profile"
        options={{
          href: null,
          title: 'Edit Profile',
          tabBarStyle: {display: 'none'},
        }}
      />
      <Tabs.Screen
        name="confirm-booking"
        options={{
          href: null,
          title: 'Confirm Booking',
          tabBarStyle: {display: 'none'},
        }}
      />
    </Tabs>
  );
}
