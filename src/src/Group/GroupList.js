import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, List, ListItem} from '@ui-kitten/components';

const data = new Array(10).fill({
  Group: 'Item',
  description: 'Description for Item',
});

export const ListDividersShowcase = () => {
  const renderItem = ({item, index}) => (
    <ListItem
      Group={`${Group.groupname} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
    />
  );

  return (
    <List
      style={styles.container}
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
});
