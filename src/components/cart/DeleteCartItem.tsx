"use client";

import { CartItem, useCart } from "@/context/CartContext";
import {AlertDialog, Button} from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteCartItem({ item }: { item: CartItem }) {

    const {removeFromCart} = useCart()

    //handle delete
    const handleDelete = (id:string)=>{
        if(item.id === id){
           removeFromCart(item.id)
           toast.success("CartItem Deleted!")
        }
    }
  return (
    <AlertDialog>
      <Button  className="p-4 bg-transparent text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors"><Trash2 className="w-4 h-4" /></Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete cart permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{item.title}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={()=>handleDelete(item.id)}>
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}