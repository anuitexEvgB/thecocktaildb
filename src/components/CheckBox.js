import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {CocktailContext} from '../context/cocktailContext';

export const CheckBoxs = ({title}) => {
  const [check, setCheckbox] = useState(true);
  const cocktailContext = useContext(CocktailContext);
  useEffect(() => {
    if (check) {
      cocktailContext.addCategory(title);
    } else {
      cocktailContext.removeCategory(title);
    }
  }, [check]);

  return (
    <View>
      <CheckBox
        title={title}
        iconRight
        size={40}
        iconType="material"
        checkedIcon="done"
        uncheckedIcon="done"
        uncheckedColor="white"
        checkedColor="black"
        checked={check}
        textStyle={styles.text}
        containerStyle={styles.container}
        wrapperStyle={styles.wrapper}
        onPress={() => setCheckbox(!check)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'grey',
    fontWeight: 'normal',
  },
  wrapper: {
    justifyContent: 'space-between',
  },
  container: {
    borderColor: 'white',
    backgroundColor: 'white',
  },
});
