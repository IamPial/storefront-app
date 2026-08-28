"use client";

import { useWishlist, WishlistItem } from "@/context/WishListContext";
import {AlertDialog, Button} from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteWishlistModal({item}:{item:WishlistItem}) {

    const {removeFromWishlist} = useWishlist()

    //handle delete wishlist 
    const handleDeleteWishlist = (id:string)=>{

        if(item.id ===id){
            removeFromWishlist(item.id)
            toast.success("Delete wishlist successfully!",{
                style:{
                    color:"#00c950"
                }
            })
        }
        
    }

  return (
    <AlertDialog>
      <Button className="absolute top-3 right-3 p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-500 hover:text-red-500 rounded-full transition-colors shadow-sm"> <Trash2 className="w-4 h-4" /></Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete wishlist item?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={()=>handleDeleteWishlist(item.id)}>
                Remove
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}