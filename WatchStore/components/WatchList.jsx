import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { Surface } from 'react-native-paper'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { watchdata } from './FetchData'
export default function WatchList() {
    // A FlatList function similar to that of the ScrollView, though with better performance
    // By only render the elements only appear on the screen, the load time can sinificantly increase
    // By using FlatList, you have asscess to renderItem() prop. Function similar to object.map()
    const [watchlist, setWatchlist] = useState()
    useEffect(() => {
        const getWatchList = async () => {
            let watchlist = watchdata
            const updatedWatchList = watchlist.map(watch => {
                if (!watch.feedbacks || !Array.isArray(watch.feedbacks)) {
                    console.error('The feedbacks property is missing or not an array in watch with id:', watch.id);
                    return { ...watch, averageRating: 0 }; // if the watch have no feedback at all
                }
                const totalRating = watch.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
                const averageRating = watch.feedbacks.length > 0 ? (totalRating / watch.feedbacks.length).toFixed(1) : 0;
                return { ...watch, averageRating };
            });
            //kys
            setWatchlist(updatedWatchList)
        }
        getWatchList()
    }, [])
    return (
        <View
            style={{
                height: 'auto',
                width: '100%',
            }}
        >
            <View>
                <Text
                    style={customizedStyles.textHeader}
                >
                    We Reccommend These Just For You</Text>
            </View>
            <FlatList
                horizontal={true}
                data={watchlist}
                renderItem={
                    //renderItem is like map()
                    //inside must be name item? WHY?
                    ({ item }) =>
                        <View style={{
                            borderRadius: 10,
                            marginBottom: 10,
                        }}>
                            <Surface
                                elevation={2}
                                style={customizedStyles.imageFrame}
                            >
                                <Image
                                    style={customizedStyles.image}
                                    source={{ uri: item.image }}
                                />
                                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                                    <Text style={{textAlign:'center'}}>{item.watchName}</Text>
                                    <StarRatingDisplay starSize={20} rating={item.averageRating} maxStars={5} />
                                </View>
                            </Surface>
                        </View>
                }
                keyExtractor={(image) => image.id}
            />
        </View>
    )
}
const customizedStyles = StyleSheet.create({
    textHeader: {
        color: 'black',
        paddingLeft: "2%",
        paddingRight: "2%",
        fontSize: 30,
        fontWeight: "bold",
    },
    imageFrame: {
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        display: "flex",
        flexDirection: 'column',
        justifyContent: "flex-start",
        maxWidth:210,
        minHeight:280
    }
    ,
    image: {
        borderRadius: 10,
        width: 200,
        height: 200,
        objectFit: "cover"
    },
})
