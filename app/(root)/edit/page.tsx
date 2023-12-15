"use client";

import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const EditPage = () => {
   const [open, setOpen] = useState(true);
   const [keys, setKeys] = useState<string[]>([]);

   const handleLogin = (e: any) => {
      e.preventDefault();
      const key1 = e.target[0].value;
      const key2 = e.target[1].value;
      const key3 = e.target[2].value;
      const keyArr = [key1, key2, key3];
      setKeys(keyArr);
      if (
         keyArr.some((key) => key === process.env.NEXT_PUBLIC_KEY_1) &&
         keyArr.some((key) => key === process.env.NEXT_PUBLIC_KEY_2) &&
         keyArr.some((key) => key === process.env.NEXT_PUBLIC_KEY_3)
      )
         setOpen(false);
      else alert("Some of the keys are wrong!!");
   };

   return (
      <div className="container">
         <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Log in</DialogTitle>
                  <DialogDescription>
                     Login first to make changes to the website
                  </DialogDescription>
               </DialogHeader>
               <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => handleLogin(e)}
               >
                  <div className="flex gap-5 items-center">
                     <Label htmlFor="key1" className="w-[20%]">
                        Key 1:
                     </Label>
                     <Input
                        type="password"
                        name="key1"
                        id="key1"
                        className="col-span-3"
                     />
                  </div>
                  <div className="flex gap-5 items-center">
                     <Label htmlFor="key2" className="w-[20%]">
                        Key 2:
                     </Label>
                     <Input
                        type="password"
                        name="key2"
                        id="key2"
                        className="col-span-3"
                     />
                  </div>
                  <div className="flex gap-5 items-center">
                     <Label htmlFor="key3" className="w-[20%]">
                        Key 3:
                     </Label>
                     <Input
                        type="password"
                        name="key3"
                        id="key3"
                        className="col-span-3"
                     />
                  </div>
                  <div className="flex gap-2 w-full">
                     <Button type="submit" className="w-full">
                        Continue
                     </Button>
                     <Button
                        type="reset"
                        className="w-full"
                        variant={"destructive"}
                     >
                        Reset
                     </Button>
                  </div>
               </form>
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default EditPage;
