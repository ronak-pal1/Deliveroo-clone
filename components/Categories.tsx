import {ScrollView, View} from 'react-native';
import CategoryCard from './CategoryCard';
import {useEffect, useState} from 'react';
import sanityClient, {urlFor} from '../sanity';

const Categories = () => {
  const foodImage =
    'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2FPhoto%2FRecipes%2F2019-08-how-to-juiciest-turkey-meatballs%2FHow-to-Make-the-Best-Juiciest-Turkey-Meatballs_055';

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient.fetch(` *[_type == 'category' ] `).then(category => {
      setCategories(category);
    });
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}>
      {/* Category card */}

      {categories?.map(category => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
