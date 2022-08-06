import React, { useState } from 'react';
import { Container, Input, Text, Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const OptionItem = ({
  option,
  options,
  item,
  setItem,
  index,
  selectedItem,
  useModal,
  setNewItem,
}) => {
  const [optionName, setOptionName] = useState(option.name);
  const [price, setPrice] = useState(option.price);
  const [cost, setCost] = useState(option.cost);

  const handleOnchangeName = (e) => {
    setOptionName(e.target.value);
    if (useModal === 'edit') {
      setItem((old) => {
        const updatedItem = structuredClone(old);
        updatedItem.options[index].name = e.target.value;
        return updatedItem;
      });
    } else if (useModal === 'add') {
      setNewItem((old) => {
        const updatedItem = structuredClone(old);
        updatedItem.options[index].name = e.target.value;
        return updatedItem;
      });
    }
  };

  const handleOnchangePrice = (e) => {
    setPrice(e.target.value);
    if (useModal === 'edit') {
      setItem((old) => {
        const updatedItem = structuredClone(old);
        updatedItem.options[index].price = e.target.value;
        return updatedItem;
      });
    } else if (useModal === 'add') {
      setNewItem((old) => {
        const updatedItem = structuredClone(old);
        updatedItem.options[index].price = e.target.value;
        return updatedItem;
      });
    }
  };

  const handleOnchangeCost = (e) => {
    setCost(e.target.value);
    if (useModal === 'edit') {
      setItem((old) => {
        const updatedItem = structuredClone(old);
        updatedItem.options[index].cost = e.target.value;
        return updatedItem;
      });
    } else if (useModal === 'add') {
      setNewItem((old) => {
        const updatedItem = structuredClone(old);
        updatedItem.options[index].cost = e.target.value;
        return updatedItem;
      });
    }
  };

  const handleOnDeleteOption = () => {
    if (useModal === 'edit') {
      setItem((old) => {
        const updatedItem = structuredClone(old);
        updatedItem.options.splice(index, 1);
        return updatedItem;
      });
    } else if (useModal === 'add') {
      setNewItem((old) => {
        const updatedItem = structuredClone(old);
        updatedItem.options.splice(index, 1);
        return updatedItem;
      });
    }
  };

  return (
    <>
      <Button
        bgColor='red.300'
        onClick={handleOnDeleteOption}
        disabled={item.options.length < 2}
      >
        <DeleteIcon />
      </Button>

      <Input value={optionName} onChange={handleOnchangeName} mb='0.5rem' />
      <Input
        value={price}
        onChange={handleOnchangePrice}
        mb='0.5rem'
        type='number'
      />
      <Input
        value={cost}
        onChange={handleOnchangeCost}
        mb='0.5rem'
        type='number'
      />
    </>
  );
};

export default OptionItem;
