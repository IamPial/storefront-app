"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist, WishlistItem } from "@/context/WishListContext";
import {AlertDialog, Button} from "@heroui/react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export function MoveToCartSingleItemModal({item}:{item:WishlistItem}) {

    const {addToCart} = useCart()
    const {removeFromWishlist} = useWishlist()

    //handle move single item to the cart
    const handleMoveSingleItemCart = ()=>{  
        addToCart(item)
        removeFromWishlist(item.id)
        toast.success("Move item to the cart successfully!",{
            style:{
                color:"#00c950"
            }
        })
    }
  return (
    <AlertDialog>
      <Button variant="danger" className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.98]"><ShoppingBag className="w-4 h-4" /> Move to Cart</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Are you sure Move to Cart ?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.98]" onClick={handleMoveSingleItemCart}>
                Move
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}