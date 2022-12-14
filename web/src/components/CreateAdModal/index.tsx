import { useEffect, useState, FormEvent } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Input } from "../Form/Input";
import { Check, GameController } from "phosphor-react";
import { SelectGame } from "../Form/Select";

interface Game {
   id: string;
   title: string;
}

interface FormData {
   name: string;
   yearsPlaying: number;
   discord: string;
   hourStart: string;
   hourEnd: string;
}

const regexDiscord = new RegExp("^.{3,32}#[0-9]{4}$");
const regexTime = new RegExp("[0-2][0-9]:[0-5][0-9]");

const FormSchema = z.object({
   name: z.string().min(1, { message: "Este campo é obrigatório." }),
   yearsPlaying: z
      .number()
      .nonnegative({ message: "Insira um valor maior ou igual a 0" }),
   discord: z
      .string()
      .min(1, { message: "Este campo é obrigatório." })
      .regex(regexDiscord, { message: "Digite um discord válido." }),
   hourStart: z.string().min(1, { message: "Este campo é obrigatório." }),
   hourEnd: z
      .string()
      .min(1, { message: "Este campo é obrigatório." })
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const CreateAdModal = () => {
   const [games, setGames] = useState<Game[]>([]);
   const [weekDays, setWeekDays] = useState<string[]>([]);
   const [gameId, setGameId] = useState("");
   const [useVoiceChannel, setUseVoiceChannel] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormSchemaType>({
      resolver: zodResolver(FormSchema),
   });

   useEffect(() => {
      axios("http://localhost:3333/games").then((response) =>
         setGames(response.data)
      );
   }, []);

   const handleCreateAd: SubmitHandler<FormSchemaType> = async (data) => {
      console.log(data);
      //   try {
      //          await axios.post(`http://localhost:3333/games/${gameId}/ads`, {
      //             name: data.name,
      //             yearsPlaying: Number(data.yearsPlaying),
      //             discord: data.discord,
      //             weekDays: weekDays.map(Number),
      //             hourStart: data.hourStart,
      //             hourEnd: data.hourEnd,
      //             useVoiceChannel: useVoiceChannel,
      //          });

      //          alert("Anúncio criado com sucesso!");
      //       } catch (err) {
      //          console.log(err);
      //          alert("Erro ao criar anúncio!");
      //       }
   };

   return (
      <Dialog.Portal>
         <Dialog.Overlay className="bg-black/60 inset-0 fixed flex justify-center items-center">
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white w-[480px] shadow-black/25 rounded-lg sm:max-w-full max-h-screen">
               <Dialog.Title className="text-3xl font-black">
                  Publique um anúncio
               </Dialog.Title>
               <form
                  onSubmit={handleSubmit(handleCreateAd)}
                  className="mt-8 flex flex-col gap-4"
                  noValidate
               >
                  <div className="flex flex-col gap-2">
                     <label className="font-semibold" htmlFor="game">
                        Qual o Game?
                     </label>
                     <SelectGame
                        games={games}
                        gameId={gameId}
                        setGameId={setGameId}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label htmlFor="name">Seu nome (ou nickname)</label>
                     <Input
                        register={register}
                        id="name"
                        name="name"
                        placeholder="Como te chamam dentro do game"
                     />
                  </div>
                  {errors.name && (
                     <span className="text-red-500 text-sm">
                        {errors.name.message}
                     </span>
                  )}
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                     <div>
                        <div className="flex flex-col gap-2">
                           <label htmlFor="yearsPlaying">
                              Joga há quantos anos?
                           </label>
                           <Input
                              register={register}
                              isNumber={true}
                              id="yearsPlaying"
                              name="yearsPlaying"
                              type="number"
                              placeholder="Tudo bem ser ZERO"
                           />
                        </div>
                        {errors.yearsPlaying && (
                           <span className="text-red-500 text-sm">
                              {errors.yearsPlaying.message}
                           </span>
                        )}
                     </div>
                     <div>
                        <div className="flex flex-col gap-2">
                           <label htmlFor="discord">Qual seu Discord?</label>
                           <Input
                              register={register}
                              id="discord"
                              name="discord"
                              type="text"
                              placeholder="Usuario#0000"
                           />
                        </div>
                        {errors.discord && (
                           <span className="text-red-500 text-sm">
                              {errors.discord.message}
                           </span>
                        )}
                     </div>
                  </div>
                  <div className="flex gap-6 sm:flex-col md:flex-row">
                     <div className="flex flex-col gap-2">
                        <label htmlFor="weekDays">Quando costuma jogar?</label>
                        <ToggleGroup.Root
                           type="multiple"
                           className="grid gap-2 sm:grid-cols-7 md:grid-cols-4"
                           value={weekDays}
                           onValueChange={setWeekDays}
                        >
                           <ToggleGroup.Item
                              value="0"
                              className={`w-8 h-8 rounded ${
                                 weekDays.includes("0")
                                    ? "bg-violet-500"
                                    : "bg-zinc-900"
                              }`}
                              title="Domingo"
                           >
                              D
                           </ToggleGroup.Item>
                           <ToggleGroup.Item
                              value="1"
                              className={`w-8 h-8 rounded ${
                                 weekDays.includes("1")
                                    ? "bg-violet-500"
                                    : "bg-zinc-900"
                              }`}
                              title="Segunda"
                           >
                              S
                           </ToggleGroup.Item>
                           <ToggleGroup.Item
                              value="2"
                              className={`w-8 h-8 rounded ${
                                 weekDays.includes("2")
                                    ? "bg-violet-500"
                                    : "bg-zinc-900"
                              }`}
                              title="Terça"
                           >
                              T
                           </ToggleGroup.Item>
                           <ToggleGroup.Item
                              value="3"
                              className={`w-8 h-8 rounded ${
                                 weekDays.includes("3")
                                    ? "bg-violet-500"
                                    : "bg-zinc-900"
                              }`}
                              title="Quarta"
                           >
                              Q
                           </ToggleGroup.Item>
                           <ToggleGroup.Item
                              value="4"
                              className={`w-8 h-8 rounded ${
                                 weekDays.includes("4")
                                    ? "bg-violet-500"
                                    : "bg-zinc-900"
                              }`}
                              title="Quinta"
                           >
                              Q
                           </ToggleGroup.Item>
                           <ToggleGroup.Item
                              value="5"
                              className={`w-8 h-8 rounded ${
                                 weekDays.includes("5")
                                    ? "bg-violet-500"
                                    : "bg-zinc-900"
                              }`}
                              title="Sexta"
                           >
                              S
                           </ToggleGroup.Item>
                           <ToggleGroup.Item
                              value="6"
                              className={`w-8 h-8 rounded ${
                                 weekDays.includes("6")
                                    ? "bg-violet-500"
                                    : "bg-zinc-900"
                              }`}
                              title="Sábado"
                           >
                              S
                           </ToggleGroup.Item>
                        </ToggleGroup.Root>
                     </div>
                     <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="hourStart">Qual horário do dia?</label>
                        <div className="grid grid-cols-2 gap-2">
                           <div>
                              <Input
                                 register={register}
                                 name="hourStart"
                                 id="hourStart"
                                 type="time"
                                 placeholder="De"
                              />
                              {errors.hourStart && (
                                 <span className="text-red-500 text-sm">
                                    {errors.hourStart.message}
                                 </span>
                              )}
                           </div>
                           <div>
                              <Input
                                 register={register}
                                 name="hourEnd"
                                 id="hourEnd"
                                 type="time"
                                 placeholder="Até"
                              />
                              {errors.hourStart && (
                                 <span className="text-red-500 text-sm">
                                    {errors.hourStart.message}
                                 </span>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  <label className="mt-2 flex items-center gap-2 text-sm">
                     <Checkbox.Root
                        className="w-6 h-6 rounded bg-zinc-900"
                        checked={useVoiceChannel}
                        onCheckedChange={(checked) =>
                           checked
                              ? setUseVoiceChannel(true)
                              : setUseVoiceChannel(false)
                        }
                     >
                        <Checkbox.Indicator className="flex items-center justify-center">
                           <Check className="w-4 h-4 text-emerald-400" />
                        </Checkbox.Indicator>
                     </Checkbox.Root>
                     Costumo me conectar ao chat de voz
                  </label>

                  <footer className="mt-4 flex justify-end gap-4">
                     <Dialog.Close
                        type="button"
                        className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                     >
                        Cancelar
                     </Dialog.Close>
                     <button
                        className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        type="submit"
                     >
                        <GameController size={24} /> Encontrar Duo
                     </button>
                  </footer>
               </form>
            </Dialog.Content>
         </Dialog.Overlay>
      </Dialog.Portal>
   );
};
