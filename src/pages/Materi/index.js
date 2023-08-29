import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import { YoutubePlayer, getYoutubeMeta } from "react-native-youtube-iframe";
export default function Materi({ navigation, route }) {

    const KATEGORI = route.params;
    const [data, setData] = useState([]);

    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            __getTransaction();
        }
    }, [isFocus]);

    const [ARRAY_YT, SETARRAT_YT] = useState([]);

    const __getTransaction = () => {
        axios.post(apiURL + 'materi', {
            fid_matpel: route.params.fid_matpel,

        }).then(res => {



            if (res.data.length > 0) {

                setData(res.data);
            } else {
                Alert.alert(MYAPP, 'Maaf materi belum ada !')
            }

        })
    }




    const __renderItem = ({ item }) => {





        return (
            <TouchableNativeFeedback onPress={() => {
                navigation.navigate('MateriDetail', item)
            }}>
                <View style={{
                    backgroundColor: colors.white,
                    borderWidth: 2,
                    borderColor: colors.secondary,
                    marginVertical: 4,
                    borderRadius: 10,
                    overflow: 'hidden',
                    // alignItems: 'center'
                }}>
                    <Image source={{
                        uri: `https://i.ytimg.com/vi/${item.youtube}/hqdefault.jpg`
                    }} style={{
                        height: 200
                    }} />
                    {/* <Text>{tmpIMG}</Text> */}
                    <View style={{
                        padding: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            color: colors.secondary,
                            fontSize: 15,
                        }}>{item.nama_materi}</Text>
                        <Text style={{
                            textAlign: 'justify',
                            marginTop: 5,
                            fontFamily: fonts.secondary[400],
                            color: colors.black,
                            fontSize: 12,
                        }}>{item.keterangan}</Text>
                    </View>

                </View>
            </TouchableNativeFeedback>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                height: 60,
                backgroundColor: colors.primary
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    padding: 10,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Icon type='ionicon' name='arrow-back-outline' size={25} color={colors.white} />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'right',
                    fontFamily: fonts.secondary[800],
                    color: colors.white,
                    fontSize: 20
                }}>{KATEGORI.tingkat} KELAS {KATEGORI.kelas}</Text>
            </View>
            <Text style={{
                textAlign: 'center',
                backgroundColor: colors.secondary,
                padding: 20,
                fontFamily: fonts.secondary[800],
                fontSize: 20,
                color: colors.white
            }}>{KATEGORI.nama_matpel}</Text>
            <ScrollView style={{
                flex: 1,
                padding: 20,
            }}>
                <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={__renderItem} />
                <View style={{
                    height: 40,
                }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})