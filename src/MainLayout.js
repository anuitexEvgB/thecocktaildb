import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FilterModal} from './FilterModal';
import {CocktailContext} from './context/cocktailContext';

export const MainLayout = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const cocktailContext = useContext(CocktailContext);
  const list = cocktailContext.drinks;

  const renderList = () => {
    return list.map((item, index) => {
      return (
        <View key={index} style={styles.body}>
          <Text style={styles.titleCategory} key={index}>
            {item.name}
          </Text>
          <FlatList
            data={item.drinks}
            keyExtractor={item => item.idDrink}
            renderItem={({item}) => (
              <View style={styles.drink} key={index}>
                <Image
                  style={styles.drinkImage}
                  source={{uri: item.strDrinkThumb}}
                />
                <Text style={styles.drinkText}>{item.strDrink}</Text>
              </View>
            )}
          />
        </View>
      );
    });
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.nav}>
          <Text style={styles.navText}>Drinks</Text>
          <Icon
            style={styles.filter}
            name="filter"
            size={35}
            color="black"
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
      <FilterModal visible={modalVisible} onCancel={setModalVisible} />
      {renderList()}
    </>
  );
};
const styles = StyleSheet.create({
  body: {
    margin: 10,
  },

  titleCategory: {
    marginBottom: 10,
    color: 'grey',
    fontWeight: 'normal',
  },

  drink: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },

  drinkImage: {
    height: 100,
    width: 100,
  },

  drinkText: {
    color: 'grey',
    fontWeight: 'normal',
    marginLeft: 20,
    alignSelf: 'center',
  },

  header: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 8,
    backgroundColor: 'white',
    borderBottomWidth: 4,
    borderColor: '#ddd',
  },
  nav: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  navText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  filter: {
    transform: [{scaleX: -1}],
  },
});
