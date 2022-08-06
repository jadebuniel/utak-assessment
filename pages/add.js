import { Button } from '@chakra-ui/react';
import { ref, set } from 'firebase/database';
import { db } from '../components/firebase';

const Add = () => {
  const handleAddCategory = () => {
    set(ref(db, '/Mains'), {
      name: 'Mains',
      id: 0,
      items: [
        {
          id: 0,
          name: 'Cripy Pata',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          options: [
            {
              name: 'default',
              price: 299,
              cost: 150,
            },
          ],
          stock: 25,
        },
        {
          id: 1,
          name: 'Kare-kare',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          options: [
            {
              name: 'default',
              price: 250,
              cost: 120,
            },
          ],
          stock: 25,
        },
        {
          id: 2,
          name: 'Bicol Express',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          options: [
            {
              name: 'default',
              price: 270,
              cost: 130,
            },
          ],
          stock: 25,
        },
      ],
    });
  };
  return <Button onClick={handleAddCategory}>Add Category</Button>;
};

export default Add;
