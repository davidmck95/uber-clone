import React, { useRef, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import tw from 'twrnc'
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '@env'

function Map() {
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    const markerEdgePadding = 50;
    const fitToSuppliedMarkersOptions = {
        edgePadding: {
            top: markerEdgePadding, 
            right: markerEdgePadding, 
            bottom: markerEdgePadding, 
            left: markerEdgePadding
        }
    }

    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], fitToSuppliedMarkersOptions);

    }, [origin, destination])

    useEffect(() => {
        if(!origin || !destination) return;
        const getTravelTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
                units=imperial&origins=${origin.description}
                &destinations=${destination.description}
                &key=${GOOGLE_MAPS_API_KEY}`).then((res) => res.json())
            .then(data => {
                // TODO think more about error scenarios where data structure is not healthy
                dispatch(setTravelTimeInformation(data.rows?.[0].elements?.[0]))
            })
        }

        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_API_KEY])

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin?.location?.lat ?? 0,
                longitude: origin?.location?.lng ?? 0,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin?.location && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor='black'
                />
            )}
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
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location?.lat ?? 0,
                        longitude: destination.location?.lng ?? 0
                    }}
                    title='Destination'
                    description={origin.description}
                    identifier='destination'
                />
            )}
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})
