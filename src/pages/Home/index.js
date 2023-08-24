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
import MyCarouser from '../../components/MyCarouser';


const Mylistdata = ({ label, onPress, warna = colors.secondary }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        flex: 1,
        margin: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: warna,
        borderRadius: 10,
        height: 110,
      }}>
        <Text style={{
          fontFamily: fonts.secondary[800],
          fontSize: 60,
          color: colors.white
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {

  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {

    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });

    await axios.post(apiURL + 'kategori').then(res => {

      console.log(res.data);
      setData(res.data);
      setOpen(true);

    });
  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('InfoPdf', item)}>
        <View style={{
          flex: 1,
          width: 170,
          height: 120,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.primary,
          margin: 5,
        }}>
          <Image source={{
            uri: item.image
          }} style={{
            width: '100%',
            height: 60,
            resizeMode: 'contain',
            marginBottom: 10,
          }} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 12,
            textAlign: 'center'
          }}>{item.nama_rs}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <View style={{
        padding: 20,
        backgroundColor: colors.white,
        flexDirection: 'row'
      }}>
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 16,
            color: colors.black
          }}>Hi, {user.nama_lengkap}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: 16,
            color: colors.black
          }}>Selamat datang di SMART EDUCATION</Text>
        </View>
        <View>
          <Image source={require('../../assets/logo.png')} style={{
            width: 50,
            height: 50
          }} />
        </View>
      </View>
      <MyCarouser />

      {open && <View style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 10,
      }}>


        <Text style={{
          fontFamily: fonts.secondary[800],
          fontSize: 30,
          marginHorizontal: 10
        }}>SMP</Text>

        <View style={{
          flexDirection: 'row'
        }}>
          <Mylistdata onPress={() => navigation.navigate('Matpel', data[0])} label={data[0].kelas} />
          <Mylistdata onPress={() => navigation.navigate('Matpel', data[1])} label={data[1].kelas} />
          <Mylistdata onPress={() => navigation.navigate('Matpel', data[2])} label={data[2].kelas} />
        </View>


        <Text style={{
          marginTop: 10,
          fontFamily: fonts.secondary[800],
          fontSize: 30,
          marginHorizontal: 10
        }}>SMA</Text>

        <View style={{
          flexDirection: 'row'
        }}>
          <Mylistdata onPress={() => navigation.navigate('Matpel', data[3])} label={data[3].kelas} />
          <Mylistdata onPress={() => navigation.navigate('Matpel', data[4])} label={data[4].kelas} />
          <Mylistdata onPress={() => navigation.navigate('Matpel', data[5])} label={data[5].kelas} />
        </View>

      </View>}








      <View style={{
        flexDirection: 'row',
        backgroundColor: colors.primary,
        justifyContent: 'space-around'
      }}>
        <TouchableOpacity style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='home-outline' color={colors.white} size={20} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 12,
            color: colors.white
          }}>Home</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Latihan')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='list-outline' color={colors.white} size={20} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 12,
            color: colors.white
          }}>Latihan</Text>

        </TouchableOpacity>



        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='person-outline' color={colors.white} size={20} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 12,
            color: colors.white
          }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({})