import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'

const data = [
    {
        id: '1',
        icon: 'home',
        location: 'Home',
        destination: '6 Dee Street, Belfast, BT1 7HU',
    },
    {
        id: '2',
        icon: 'briefcase',
        location: 'Work',
        destination: '37 Queen Street, Belfast, BT3 1JU',
    }   
]

const NavFavourites = () => {
  return (
    <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item: { location, icon, destination }}) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
                <Icon
                    
                    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name={icon}
                    type='ionicon'
                    color='white'
                    size={20}
                />
                <View>
                    <Text style={tw`font-semibold text-lg`}>{location}</Text>
                    <Text style={tw`text-gray-500`}>{destination}</Text>
                </View>
            </TouchableOpacity>
        )}
    />
  )
}

export default NavFavourites

const styles = StyleSheet.create({})