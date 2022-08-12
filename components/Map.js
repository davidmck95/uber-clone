import React from 'react'
import { StyleSheet } from 'react-native'
import tw from 'twrnc'
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

function Map() {
    const origin = useSelector(selectOrigin)

    return (
        <MapView
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin?.location?.lat ?? 0,
                longitude: origin?.location?.lng ?? 0,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location?.lat ?? 0,
                        longitude: origin.location?.lng ?? 0
                    }}
                    title='Origin'
                    description={origin.description}
                    identifier='origin'
                />
            )}
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})
