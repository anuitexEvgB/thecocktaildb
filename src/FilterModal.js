import React, {useContext, useEffect} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {CocktailContext} from './context/cocktailContext';
import {CheckBoxs} from './components/CheckBox';
import Icon from 'react-native-vector-icons/FontAwesome';

export const FilterModal = ({visible, onCancel}) => {
  const cocktailContext = useContext(CocktailContext);

  useEffect(() => {
    cocktailContext.getCategory();
  }, [cocktailContext]);

  const onSubmit = () => {
    cocktailContext.getDrinks(cocktailContext.checkCategory);
    onCancel(false);
  };

  return (
    <Modal transparent={false} visible={visible}>
      <View style={styles.header}>
        <Icon
          style={styles.icon}
          name="arrow-left"
          size={25}
          color="black"
          onPress={() => onCancel(false)}
        />
        <Text style={styles.headerText}>Filters</Text>
      </View>
      <View style={styles.centeredView}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {cocktailContext.category.map((arr, index) => {
            const key = Object.keys(arr);
            return <CheckBoxs title={arr[key]} key={index} />;
          })}
        </ScrollView>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => onSubmit()}>
          <Text style={styles.textStyle}>APPLY</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  header: {
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 8,
    backgroundColor: 'white',
    borderBottomWidth: 4,
    borderColor: '#ddd',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'flex-start',
  },

  openButton: {
    backgroundColor: 'black',
    position: 'absolute',
    bottom: '10%',
    width: '86%',
    left: '7%',
    height: '7%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
  icon: {
    marginRight: '10%',
  },
});
