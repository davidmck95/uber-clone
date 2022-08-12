import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { GOOGLE_MAPS_API_KEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { setDestination } from '../slices/navSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={tw`bg-white flex-1`}
        >
            <Text
                style={tw`text-center py-5 text-xl`}  
            >
                Good morning, Dee
            </Text>
            <View
                style={tw`border-5 border-grey-200 flex-shrink`}
            >
                <View>
                    <GooglePlacesAutocomplete
                        debounce={400}
                        styles={toInputBoxStyles}
                        placeholder='Where to?'
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details?.geometry?.location,
                                description: data?.description
                            }))
                            navigation.navigate('RideOptionsCard');
                        }}
                        query={{
                            key: GOOGLE_MAPS_API_KEY,
                            language: 'en'
                        }}
                        nearbyPlacesApi='GooglePlacesSearch'
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})