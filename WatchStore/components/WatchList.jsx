import React, { useEffect,useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import FetchData from './FetchData'
export default function WatchList() {
    // A FlatList function similar to that of the ScrollView, though with better performance
    // By only render the elements only appear on the screen, the load time can sinificantly increase
    // By using FlatList, you have asscess to renderItem() prop. Function similar to object.map()

    const [watchlist,setWatchlist] = useState()
    useEffect(()=>{
        const getWatchList = async() =>{
           let data = await FetchData()
           setWatchlist(data)
        }
        getWatchList()
    },[])

    return (
        <View 
            style={{
                marginBottom:"5%"
            }}
        >
            <View>
                <Text style={customStyles.textHeader}>Browse All Watches</Text>
            </View>
            <FlatList
                horizontal={true}
                data={watchlist}
                renderItem={
                    //renderItem is like map()
                    //inside must be name item? WHY?
                    ({ item }) =>
                        <View style={customStyles.imageFrame}>
                            <Image
                                style={customStyles.image}
                                source={{uri:item.image}}
                            />
                        </View>
                }
                keyExtractor={(image) => image.id}
            />
        </View>
    )
}
const customStyles = StyleSheet.create({
    textHeader: {
        color: 'black',
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: 30,
        fontWeight: "bold",
        textAlign:'center'
    },
    imageFrame: {
        marginLeft: 5,
        marginRight: 5,
    }
    ,
    image: {
        width: 200,
        height: 200,
        objectFit:"cover"
    },
})
