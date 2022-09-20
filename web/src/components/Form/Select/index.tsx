import { useState } from "react";
import * as Select from "@radix-ui/react-select";

export function SelectGame() {
    const [isSelectOpen, setIsSelectOpen] = useState(false);

   return (
      <Select.Root 
        onOpenChange={(open) => setIsSelectOpen(open)}
        open={isSelectOpen} 
      >
         <Select.Trigger>
            <Select.Value placeholder="Selecione o game que deseja jogar" />
            <Select.Icon />
         </Select.Trigger>
         <Select.Portal>
            <Select.Content>
               <Select.Viewport>
                  <Select.Item value="game1">
                     <Select.ItemText />
                  </Select.Item>
               </Select.Viewport>
            </Select.Content>
         </Select.Portal>
      </Select.Root>
   );
}
