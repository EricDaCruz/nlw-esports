import { useState } from "react";
import {
   View,
   Modal,
   ModalProps,
   Text,
   TouchableOpacity,
   Alert,
   ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";

import * as Clipboard from "expo-clipboard";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";

interface Props extends ModalProps {
   discord: string;
   onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
   const [isCoppingDiscord, setIsCoppingDiscord] = useState(false);

   async function handleCopyDiscordToClipboard() {
      setIsCoppingDiscord(true);
      await Clipboard.setStringAsync(discord);

      Alert.alert(
         "Discord Copiado!",
         `${discord} foi copiado para a área de transferência!`
      );
      setIsCoppingDiscord(false);
   }

   return (
      <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
         <View style={styles.container}>
            <View style={styles.content}>
               <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                  <MaterialIcons
                     name="close"
                     size={20}
                     color={THEME.COLORS.CAPTION_500}
                  />
               </TouchableOpacity>
               <CheckCircle
                  size={64}
                  color={THEME.COLORS.SUCCESS}
                  weight="bold"
               />
               <Heading
                  title="Let´s play!"
                  subtitle={`Agora é só começar a jogar!`}
                  style={{ alignItems: "center", marginTop: 24 }}
               />

               <Text style={styles.label}>Adicione no seu Discord</Text>

               <TouchableOpacity
                  onPress={handleCopyDiscordToClipboard}
                  style={styles.discordButton}
                  disabled={isCoppingDiscord}
               >
                  <Text style={styles.discord}>
                     {isCoppingDiscord 
                     ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/>
                     : discord
                     }
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   );
}
