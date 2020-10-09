/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  StatusBar,
} from 'react-native';
import axios from 'axios';

const App: () => React$Node = () => {

  const [loading, setLoading] = useState(true);
  const [parqueaderos, setParqueaderos] = React.useState([]);

  useEffect( ()=>{
    const fetchData = async () =>{
      setLoading(true)
      try{
        const result = await axios('https://190.61.31.221:8443/integracionRuedaz/rest/parqueadero/getParquederos');
        console.log(result.data.data)
        setParqueaderos(result.data.data)
      } catch (error){
        console.log(error)
      }

    }

    fetchData()
  }, [])
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Parking</Text>
          </View>
          <View style={styles.body}>
            
              <FlatList
                  data={parqueaderos}
                  keyExtractor={item => item.nombrePark}
                  renderItem={({ item, index }) => 
                  <View style={styles.sectionContainer} key={item.nombrePark}>
                    <Text style={styles.sectionTitle}>{item.nombrePark}</Text>
                    <Text style={styles.sectionDescription}>Direccion: {item.direccion}</Text>
                    <Text style={styles.sectionDescription}>Telefono: {item.telefono}</Text>
                    <Text style={styles.sectionDescription}>Plazas: {item.plazas}</Text>
                    <Text style={styles.sectionDescription}>Plazas ocupadas: {item.plazasOcupadas}</Text>
                  </View> 
                  }
              />
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fefefe',
  },
  safeView: {
    backgroundColor: '#222222',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#ededed',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  sectionContainer: {
    marginVertical: 5,
    padding: 15,
    backgroundColor: '#fff'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '400',
    color: '#222222',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#222222',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  header: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
  },
  headerText:{
    color: '#fff',
    fontSize: 18,
  }
});

export default App;
