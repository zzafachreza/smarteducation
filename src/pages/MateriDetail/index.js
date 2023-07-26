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
import YoutubePlayer from "react-native-youtube-iframe";
import { MyButton } from '../../components';


export default function MateriDetail({ navigation, route }) {

    const MATERI = route.params;






    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <YoutubePlayer
                height={240}
                videoId={MATERI.youtube}
            />
            <View style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>
                <View style={{
                    paddingHorizontal: 10,
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[800],
                        color: colors.white,
                        fontSize: 15,
                    }}>{MATERI.tingkat}</Text>
                </View>
                <View style={{
                    paddingHorizontal: 10,
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[800],
                        color: colors.white,
                        fontSize: 15,
                    }}>KELAS {MATERI.kelas}</Text>
                </View>

                <View style={{
                    paddingHorizontal: 10,
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[800],
                        color: colors.white,
                        fontSize: 15,
                    }}>{MATERI.nama_matpel}</Text>
                </View>

            </View>
            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    color: colors.secondary,
                    fontSize: 15,
                }}>{MATERI.nama_materi}</Text>
                <Text style={{
                    textAlign: 'justify',
                    marginTop: 5,
                    fontFamily: fonts.secondary[400],
                    color: colors.black,
                    fontSize: 12,
                }}>{MATERI.keterangan}</Text>
            </View>
            <MyButton radius={0} title="MULAI KERJAKAN SOAL" onPress={() => navigation.navigate('MateriSoal', MATERI)} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})