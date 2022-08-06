import {
  VStack,
  HStack,
  Container,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';
import Category from '../components/category';
import EditAddModal from '../components/edit-modal';
import { db } from '../components/firebase';
import Header from '../components/header';
import data from '../data';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState = [
    {
      name: 'Mains',
      items: [],
    },
    {
      name: 'Sides',
      items: [],
    },
    {
      name: 'Drinks',
      items: [],
    },
    {
      name: 'Dessert',
      items: [],
    },
  ];
  const [menu, setMenu] = useState(initialState);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [useModal, setUseModal] = useState('add');

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const menuFromFB = Object.values(data).sort((a, b) => a.id - b.id);
        setMenu(menuFromFB);
      }
    });
  }, []);

  return (
    <Container minH='100vh' maxW='unset' display='flex' alignItems='center'>
      <Container
        maxW='1200px'
        bg='white'
        pl='0'
        border='16px solid black'
        borderTopWidth='40px'
        borderBottomWidth='40px'
      >
        {/* MENU HEADER */}
        <Header />
        {/* MENU BODY */}
        <Container
          display='grid'
          gridTemplateColumns='1fr 1fr'
          columnGap='8rem'
          m='unset'
          maxW='unset'
          px='5rem'
          pb='2rem'
        >
          {menu &&
            menu.length > 0 &&
            menu.map((da, index) => (
              <Category
                data={da}
                key={index}
                onOpen={onOpen}
                setSelectedItem={setSelectedItem}
                setMenu={setMenu}
                setSelectedCategory={setSelectedCategory}
                setUseModal={setUseModal}
              />
            ))}
        </Container>
      </Container>
      {selectedItem && isOpen && (
        <EditAddModal
          isOpen={isOpen}
          onClose={onClose}
          selectedItem={selectedItem}
          setMenu={setMenu}
          menu={menu}
          selectedCategory={selectedCategory}
          useModal={useModal}
        />
      )}
    </Container>
  );
}
