import { useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { GameController } from "phosphor-react";
import * as Select from "@radix-ui/react-select";

interface Games {
   id: string;
   title: string;
}

interface Props {
   games: Games[];
   gameId: string;
   setGameId: (id: string) => void;
}

export function SelectGame({ games, gameId, setGameId }: Props) {
   
   return (
      <Select.Root value={gameId} onValueChange={setGameId}>
         <Select.Trigger className="inline-flex items-center justify-between bg-zinc-900 rounded px-4 py-3 text-sm placeholder:text-zinc-500">
            <Select.Value></Select.Value>
            <Select.SelectIcon>
               <ChevronDownIcon />
            </Select.SelectIcon>
         </Select.Trigger>
         <Select.Portal className="bg-zinc-900 text-white rounded-lg px-3 py-3">
            <Select.Content>
               <Select.Viewport>
                  <Select.Item value="" className="flex cursor-pointer" >
                     <Select.ItemText>Selecione o game que deseja jogar</Select.ItemText>
                  </Select.Item>
                  {games.map((game) => (
                     <Select.Item
                        value={game.id}
                        className="flex items-center gap-2 cursor-pointer px-2 py-2 rounded hover:bg-violet-500"
                     >
                        <Select.ItemIndicator>
                           <GameController />
                        </Select.ItemIndicator>
                        <Select.ItemText>{game.title}</Select.ItemText>
                     </Select.Item>
                  ))}
               </Select.Viewport>
            </Select.Content>
         </Select.Portal>
      </Select.Root>
   );
}
