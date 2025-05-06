type UserFavoriteRestaurant = {
    id: string;
    userId: string;
    restaurantId: string;
};

export const isRestaurantFavorited = (
    restaurantId: string,
    userFavoriteRestaurants: UserFavoriteRestaurant[],
): boolean => userFavoriteRestaurants?.some((fav) => fav.restaurantId === restaurantId);
