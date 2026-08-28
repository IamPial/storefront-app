"use client";

import { useCart } from "@/context/CartContext";
import {AlertDialog, Button} from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteAllCart() {
   
  //import context  
  const {cart, clearCart} = useCart()

  //handle delete all
  const handleDeleteAll = ()=>{
    if(cart.length > 0){
        clearCart()
        toast.success("All Item Deleted Successfully!",{
    style: { color: "#00c950" },
  })
    }
  }

  return (
    <AlertDialog>
      <Button  className="bg-transparent inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /> Clear Cart</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete carts permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>All Cart Items</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDeleteAll }>
                Remove All
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}