import { BCMSMediaParsed } from '@becomes/cms-client/types';
import { ProductSizeEntryMeta, ProductColorEntryMeta } from '~~/bcms/types';

interface CartItem {
  slug: string;
  title: string;
  size: ProductSizeEntryMeta;
  color: ProductColorEntryMeta;
  price: number;
  cover: BCMSMediaParsed;
}

const cartItems = ref<
  Array<{
    item: CartItem;
    amount: number;
  }>
>([]);

export function useCart() {
  const addCartItem = (item: CartItem) => {
    const index = cartItems.value.findIndex(
      (cartItem) =>
        cartItem.item.slug === item.slug &&
        cartItem.item.size === item.size &&
        cartItem.item.color === item.color,
    );
    if (index > -1) {
      cartItems.value[index].amount++;
    } else {
      cartItems.value.push({
        item,
        amount: 1,
      });
    }
  };

  const removeCartItem = (item: CartItem) => {
    const index = cartItems.value.findIndex(
      (cartItem) =>
        cartItem.item.slug === item.slug &&
        cartItem.item.size === item.size &&
        cartItem.item.color === item.color,
    );
    if (index > -1) {
      if (cartItems.value[index].amount > 1) {
        cartItems.value[index].amount--;
      } else {
        cartItems.value.splice(index, 1);
      }
    }
  };

  const cartLength = computed(() => {
    return cartItems.value.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
  });

  const totalCartPrice = computed(() => {
    return cartItems.value
      .reduce((acc, item) => {
        return acc + item.item.price * item.amount;
      }, 0)
      .toFixed(2);
  });

  return {
    cartItems,
    addCartItem,
    removeCartItem,
    cartLength,
    totalCartPrice,
  };
}
