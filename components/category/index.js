import React, { useState } from 'react';
import { Container, Text, Button } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import MenuItem from '../menu-item';

const Category = ({
  data,
  onOpen,
  setSelectedItem,
  setMenu,
  setSelectedCategory,
  setUseModal,
}) => {
  const { items } = data;
  const [showAddItem, setShowAddItem] = useState(false);

  const handleAddMenuItem = () => {
    setUseModal('add');
    setSelectedCategory(data);
    onOpen();
  };

  return (
    <Container
      p='unset'
      m='unset'
      maxW='unset'
      className='category'
      onMouseEnter={() => setShowAddItem(true)}
      onMouseLeave={() => setShowAddItem(false)}
    >
      {/* CATEGORY HEADER */}
      <Text
        fontSize='1.25rem'
        letterSpacing='3px'
        textTransform='uppercase'
        fontWeight='semibold'
        mb='2rem'
        mt='2rem'
      >
        {data.name}
      </Text>
      {/* MENU ITEMS */}
      {items &&
        items.length > 0 &&
        items.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            onOpen={onOpen}
            setSelectedItem={setSelectedItem}
            setMenu={setMenu}
            category={data}
            setSelectedCategory={setSelectedCategory}
            setUseModal={setUseModal}
          />
        ))}
      <Container
        p='unset'
        m='unset'
        maxW='unset'
        h='16px'
        mt='5px'
        opacity={showAddItem ? 1 : 0}
        transition='100ms ease-in-out opacity'
        onClick={handleAddMenuItem}
      >
        <Text
          fontSize='xs'
          fontStyle='italic'
          textAlign='center'
          color='gray.400'
          display='flex'
          alignItems='center'
          justifyContent='center'
          _before={{
            content: '""',
            h: '1px',
            w: 'calc((100% - 185px) / 2)',
            bgColor: 'gray.400',
            mt: '2px',
            mr: '5px',
          }}
          _after={{
            content: '""',
            h: '1px',
            w: 'calc((100% - 185px) / 2)',
            bgColor: 'gray.400',
            mt: '2px',
            ml: '5px',
          }}
          cursor='pointer'
        >
          Add a menu item to this category
        </Text>
      </Container>
    </Container>
  );
};

export default Category;
