import { FlatList, Image, SafeAreaView, TouchableOpacity, Text, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 2,
    image: 'https://links.papareact.com/3pn'
  },
  {
    id: 'Uber-XL-456',
    title: 'UberXL',
    multiplier: 2.2,
    image: 'https://links.papareact.com/5w8'
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 2.75,
    image: 'https://links.papareact.com/7pf'
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex flex-shrink`}>
      <View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('MapScreen')}
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
        >
          <Icon name='chevron-left' type='fontawesome'/>
        </TouchableOpacity>
        <Text style={tw`text-center pt-2 text-base`}>Select a ride</Text>
        <Text style={tw`text-center pb-2 text-base`}>Total distance: {travelTimeInformation?.distance?.text}</Text>
      </View>

      <FlatList
        data={data}
        key={(item) => item.id}
        renderItem={({ item: { image, id, title, multiplier }, item }) => (
          <TouchableOpacity 
            style={tw`flex-row justify-between items-center px-3
              ${id === selected?.id && 'bg-gray-200'}`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 90,
                height: 90,
                resizeMode: 'contain'
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-5 flex-shrink`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>Duration: {travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'GBP',
              }).format(
                (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity 
          style={tw`bg-black py-2 m-3 ${!selected && 'bg-gray-200'}`}
          disabled={!selected}
        >
          <Text style={tw`text-center text-white text-xl`}>Choose {selected ? selected.title : 'a ride'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard;
