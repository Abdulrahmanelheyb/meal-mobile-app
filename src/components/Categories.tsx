import {Image, ScrollView, TouchableOpacity, View, Text} from "react-native";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {clsx} from "clsx";
import Animated, {FadeInDown} from "react-native-reanimated";
import {CategoryType} from "../types";

type CategoriesProps = {
  categories: CategoryType[]
  category?: CategoryType
  onCategorySelect(category: CategoryType): void
}

const Categories = (props: CategoriesProps) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className={"space-x-4"}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
          props.categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              className={'flex items-center space-y-1'}
              onPress={() => props.onCategorySelect(category)}
            >
              <View className={clsx([
                'rounded-full p-1.5',
                props.category && category.strCategory === props.category.strCategory ? 'bg-amber-400' : 'bg-neutral-100'
              ])}>
                <Image
                  source={{uri: category.strCategoryThumb}}
                  style={{width: hp(6), height: hp(6)}}
                  className={'rounded-full'}
                />
              </View>
              <Text className={'text-neutral-600'} style={{fontSize: hp(1.6)}}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </Animated.View>
  );
}

export default Categories;