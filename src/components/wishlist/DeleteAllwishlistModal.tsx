"use client";

import { useWishlist } from "@/context/WishListContext";
import {AlertDialog, Button} from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteAllWishlistModal() {

    //clear wishlist
    const {clearWishlist} = useWishlist()

    //handle delete all wishlist 
    const handleDeleteAllWishlist = ()=>{

        clearWishlist()
        toast.success("Delete All Wishlist Successfully!",{
    style: { color: "#00c950" },
  })
    }


  return (
    <AlertDialog>
      <Button  className="px-4 bg-transparent py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Clear All</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              {/* <AlertDialog.Icon status="danger" /> */}
              <Trash2 className="w-4 h-4 text-red-500 "/>
              <AlertDialog.Heading>Delete wishlist permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>WishList Items</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDeleteAllWishlist}>
                Remove All
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}