"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListContext";
import {AlertDialog, Button} from "@heroui/react";
import { ShoppingBag } from "lucide-react";

export function MoveToCartAllItemModal() {
    const{wishlist,clearWishlist} = useWishlist()
    const {addToCart} = useCart()
 
  //handleMoveAllToCart
  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => addToCart(product));
    clearWishlist();
  }; 

  return (
    <AlertDialog>
      <Button className=" px-4 py-2.5 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-md shadow-indigo-500/10">Move All to Cart</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <ShoppingBag className="w-4 h-4" /> 
              <AlertDialog.Heading>Are you sure move to cart?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" className="px-4 py-2.5 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-md shadow-indigo-500/10" onClick={handleMoveAllToCart}>
                Move All
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}