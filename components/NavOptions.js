import { FlatList, TouchableOpacity, Image, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const data = [
    {
        id: '123',
        title: 'Get a ride',
        image: 'https://links.papareact.com/3pn',
        screen: 'MapScreen',
    },
    {
        id: '456',
        title: 'Order food',
        image: 'https://links.papareact.com/28w',
        screen: 'EatsScreen',
    }
]

const NavOptions = () => {
  return (
    <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <TouchableOpacity style={tw`pr-2 pl-6 pb-8 pt-4 m-2 w-40 bg-gray-200`}>
                <View>
                    <Image 
                        style={{width: 120, height: 120, resizeMode: 'contain'}}
                        source={{uri: item.image}} 
                    />
                    <Text>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )}
    />
  )
}

export default NavOptions
