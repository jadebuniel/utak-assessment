import React, { useState, useEffect } from 'react';
import { Container, Text, Button } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

const MenuItem = ({
  item,
  onOpen,
  setSelectedItem,
  setMenu,
  category,
  setSelectedCategory,
  setUseModal,
}) => {
  const [showActions, setShowActions] = useState(false);
  const getMinimumPriceOrCost = () => {
    return item.options.reduce((prev, cur) =>
      prev.price < cur.price ? prev : cur
    );
  };
  const defaultOption =
    item.options.filter((option) => option.name === 'default')[0] ||
    getMinimumPriceOrCost();

  const handleDeleteItem = () => {
    setMenu((old) => {
      const newMenu = old;
      const categoryIndex = newMenu.findIndex(
        (menuItem) => menuItem.name == category.name
      );
      const menuItemIndex = newMenu[categoryIndex].items.findIndex(
        (i) => i.id == item.id
      );
      newMenu[categoryIndex].items.splice(menuItemIndex, 1);
      set(ref(db, `${category.name}`), newMenu[categoryIndex]);
      return newMenu;
    });
    setShowActions(false);
  };

  return (
    <Container
      p='unset'
      m='unset'
      mt='1rem'
      position='relative'
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* MENU ITEM NAME AND PRICE */}
      <Container
        p='unset'
        m='unset'
        mt='1rem'
        maxW='unset'
        display='flex'
        justifyContent='space-between'
        fontWeight='semibold'
      >
        <Text textTransform='uppercase' letterSpacing='3px'>
          {item.name}
        </Text>
        <Text>{defaultOption.price}</Text>
      </Container>
      {/* MENU ITEM DESCRIPTION */}
      <Text color='gray.600' maxW='300px' fontSize='14px'>
        {item.description}
      </Text>
      <Container
        p='unset'
        m='unset'
        display='grid'
        gridTemplateColumns='1fr 1fr 1fr'
      >
        {item.options &&
          item.options.length > 1 &&
          item.options.map((option, index) => (
            <Text
              fontSize='12px'
              color='gray.400'
              fontStyle='italic'
              key={index}
            >
              {`${option.name}: ${option.price}`}
            </Text>
          ))}
      </Container>
      {/* ACTIONS */}
      <Container
        p='unset'
        m='unset'
        maxW='unset'
        display={showActions ? 'flex' : 'none'}
        flexDir='column'
        position='absolute'
        left='-3rem'
        top='0'
        gap='5px'
      >
        <Button
          w='2rem'
          h='2rem'
          className='action-button'
          bgColor='green.300'
          onClick={() => {
            onOpen();
            setSelectedItem(item);
            setSelectedCategory(category);
            setUseModal('edit');
          }}
        >
          <EditIcon />
        </Button>
        <Button
          w='2rem'
          h='2rem'
          className='action-button'
          bgColor='red.300'
          onClick={handleDeleteItem}
        >
          <DeleteIcon />
        </Button>
      </Container>
    </Container>
  );
};

export default MenuItem;
