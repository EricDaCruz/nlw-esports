import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   register: any;
}

export function Input(props: InputProps) {
   return (
      <input
         {...props}
         className="bg-zinc-900 rounded px-4 py-3 text-sm placeholder:text-zinc-500"
         {...props.register(props.name)}
      />
   );
}
