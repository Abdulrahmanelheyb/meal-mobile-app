import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Image, Pressable, Text, View} from "react-native";
import MasonryList from '@react-native-seoul/masonry-list';
import {MealType} from "../types";
import Loading from "./Loading";
import {useNavigation} from "@react-navigation/native";
import Animated from "react-native-reanimated";

type RecipesProps = {
  meals: MealType[]
}

const Recipes = (props: RecipesProps) => {
  return (
    <View className={'mx-4 space-y-3'}>
      <Text style={{fontSize: hp(3)}} className={'font-semibold text-neutral-600'}>Recipes</Text>
      {
        props.meals.length > 0 ? (
          <View>
            <MasonryList
              data={props.meals}
              keyExtractor={(item): string => item.idMeal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item, i}) => <RecipeCard data={item as MealType} index={i}/>}
              // refreshing={isLoadingNext}
              // onRefresh={() => refetch({first: ITEM_CNT})}
              onEndReachedThreshold={0.1}
              // onEndReached={() => loadNext(ITEM_CNT)}
            />
          </View>
        ):(
          <Loading size={'large'} className={'mt-20'}/>
        )
      }
    </View>
  );
}

type RecipeCardProps = {
  data: MealType
  index: number
}

const RecipeCard = (props: RecipeCardProps) => {
  const isEven = props.index % 2===0;
  const navigation = useNavigation();

  return (
    <View>
      <Pressable
        style={{
          width: '100%',
          paddingLeft: isEven ? 0:8,
          paddingRight: isEven ? 8:0
        }}
        onPress={() => navigation.navigate('RecipeDetailScreen', props.data)}
      >
        <Animated.Image
          sharedTransitionTag={props.data.strMeal}
          source={{uri: props.data.strMealThumb}}
          style={{
            width: '100%',
            height: props.index % 3==0 ? hp(25):hp(35),
            borderRadius: 35,
          }}
          className={'bg-black/5'}
        />
        <Text style={{fontSize: hp(1.5)}} className={'font-semibold mb-4 ml-2 text-neutral-600'}>
          {
            props.data.strMeal.length > 20 ? props.data.strMeal.slice(0, 20) + '...':props.data.strMeal
          }
        </Text>
      </Pressable>
    </View>
  )
}

export default Recipes;