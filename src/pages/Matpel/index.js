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

export default function Matpel({ navigation, route }) {

    const KATEGORI = route.params;
    const [data, setData] = useState([]);

    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            __getTransaction();
        }
    }, [isFocus]);


    const __getTransaction = () => {
        axios.post(apiURL + 'matpel').then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }

    const __renderItem = ({ item }) => {
        return (
            <TouchableNativeFeedback onPress={() => {
                navigation.navigate('Materi', {
                    fid_kategori: KATEGORI.id_kategori,
                    fid_matpel: item.id,
                    nama_matpel: item.nama_matpel,
                    tingkat: KATEGORI.tingkat,
                    kelas: KATEGORI.kelas
                })
            }}>
                <View style={{
                    padding: 20,
                    backgroundColor: colors.secondary,
                    marginVertical: 2,
                    flexDirection: 'row',
                    borderRadius: 10,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.white,
                        flex: 1,
                        fontSize: 24,
                    }}>{item.nama_matpel}</Text>
                    <Icon type='ionicon' name='arrow-forward-circle' color={colors.white} size={40} />
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
            <ScrollView style={{
                flex: 1,
                padding: 20,
            }}>
                <FlatList data={data} renderItem={__renderItem} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})