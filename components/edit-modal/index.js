import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Input,
  Textarea,
  Container,
} from '@chakra-ui/react';
import OptionItem from './option';
import { set, ref } from 'firebase/database';
import { db } from '../firebase';

const EditAddModal = ({
  isOpen,
  onClose,
  selectedItem,
  setMenu,
  menu,
  selectedCategory,
  useModal,
}) => {
  const menuItemCount = menu
    .map((me) => me.items.length)
    .reduce((a, b) => a + b, 0);

  const [item, setItem] = useState({ ...selectedItem });
  const [newItem, setNewItem] = useState({
    id: menuItemCount,
    name: '',
    description: '',
    options: [{ name: 'default', price: 0, cost: 0 }],
    stock: 0,
  });

  const categoryIndex = menu.indexOf(selectedCategory);

  const handleClose = () => {
    onClose();
  };

  const handleSubmitEdit = () => {
    setMenu((old) => {
      const newMenu = structuredClone(old);
      const itemIndex = newMenu[categoryIndex].items.findIndex(
        (item) => item.id === selectedItem.id
      );
      newMenu[categoryIndex].items[itemIndex] = item;
      set(ref(db, `/${selectedCategory.name}`), newMenu[categoryIndex]);
      return newMenu;
    });
    onClose();
  };

  const handleSubmitAdd = () => {
    setMenu((old) => {
      const newMenu = structuredClone(old);
      newMenu[categoryIndex].items.push(newItem);
      set(ref(db, `/${selectedCategory.name}`), newMenu[categoryIndex]);
      return newMenu;
    });
    onClose();
  };

  const handleAddOption = () => {
    if (useModal === 'edit') {
      setItem((old) => {
        const updatedItem = structuredClone(old);
        const newOption = { name: '', price: 0, cost: 0 };
        updatedItem.options.push(newOption);
        return updatedItem;
      });
    } else if (useModal === 'add') {
      setNewItem((old) => {
        const updatedItem = structuredClone(old);
        const newOption = { name: '', price: 0, cost: 0 };
        updatedItem.options.push(newOption);
        return updatedItem;
      });
    }
  };

  return (
    <>
      {useModal === 'edit' ? (
        // EDIT MODAL
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
          <ModalOverlay bg='blackAlpha.700' />
          <ModalContent>
            <ModalHeader>Edit {selectedItem.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody experimental_spaceY='1rem'>
              <Input
                value={item.name}
                onChange={(e) =>
                  setItem((old) => ({ ...old, name: e.target.value }))
                }
                placeholder='Menu item name (required)'
              />
              <Textarea
                value={item.description}
                onChange={(e) =>
                  setItem((old) => ({ ...old, description: e.target.value }))
                }
                placeholder='Menu item description (required)'
                resize='none'
              />
              <Container
                m='unset'
                p='unset'
                maxW='unset'
                display='grid'
                gridTemplateColumns='0.12fr 1fr 0.3fr 0.3fr'
                columnGap='0.5rem'
              >
                <Text></Text>
                <Text mb='0.25rem'>Option name</Text>
                <Text mb='0.25rem'>Price</Text>
                <Text mb='0.25rem'>Cost</Text>
                {item.options.length > 0 &&
                  item.options.map((option, index) => (
                    <OptionItem
                      option={option}
                      key={index}
                      item={item}
                      setItem={setItem}
                      index={index}
                      options={item.options}
                      selectedItem={selectedItem}
                      useModal={useModal}
                      setNewItem={setNewItem}
                    />
                  ))}
                <Button onClick={handleAddOption} gridColumn='1/3'>
                  Add Option
                </Button>
              </Container>
              <Input
                value={item.stock}
                onChange={(e) =>
                  setItem((old) => ({ ...old, stock: e.target.value }))
                }
                placeholder='Stocks'
                w='50%'
                type='number'
              />
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                colorScheme='gray'
                onClick={handleSubmitEdit}
                disabled={!(item.name && item.description)}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        // ADD MODAL
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
          <ModalOverlay bg='blackAlpha.700' />
          <ModalContent>
            <ModalHeader>Add Menu Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody experimental_spaceY='1rem'>
              <Input
                value={newItem.name}
                onChange={(e) =>
                  setNewItem((old) => ({ ...old, name: e.target.value }))
                }
                placeholder='Menu item name (required)'
              />
              <Textarea
                value={newItem.description}
                onChange={(e) =>
                  setNewItem((old) => ({ ...old, description: e.target.value }))
                }
                placeholder='Menu item description (required)'
                resize='none'
              />
              <Container
                m='unset'
                p='unset'
                maxW='unset'
                display='grid'
                gridTemplateColumns='0.12fr 1fr 0.3fr 0.3fr'
                columnGap='0.5rem'
              >
                <Text></Text>
                <Text mb='0.25rem'>Option name</Text>
                <Text mb='0.25rem'>Price</Text>
                <Text mb='0.25rem'>Cost</Text>
                {newItem.options.length > 0 &&
                  newItem.options.map((option, index) => (
                    <OptionItem
                      option={option}
                      key={index}
                      item={newItem}
                      setItem={setItem}
                      index={index}
                      options={newItem.options}
                      selectedItem={selectedItem}
                      useModal={useModal}
                      setNewItem={setNewItem}
                    />
                  ))}
                <Button onClick={handleAddOption} gridColumn='1/3'>
                  Add Option
                </Button>
              </Container>
              <Input
                value={newItem.stock}
                onChange={(e) =>
                  setNewItem((old) => ({ ...old, stock: e.target.value }))
                }
                placeholder='Stocks'
                w='50%'
                type='number'
              />
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                colorScheme='gray'
                onClick={handleSubmitAdd}
                disabled={!(newItem.name && newItem.description)}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default EditAddModal;
