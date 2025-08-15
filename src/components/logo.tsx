import { Building } from "lucide-react";

export default function Logo() {
  return (
    <a href="#home" className="flex items-center space-x-2">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="h-12 w-12 text-primary"
      >
        <path
          fill="currentColor"
          d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm52-108v24a4 4 0 0 1-8 0v-20h-28v60h20a4 4 0 0 1 0 8h-48a4 4 0 0 1-4-4v-64a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4Zm-8 28h-28v20h28Z"
        />
      </svg>
      <div className="flex flex-col">
          <span className="font-extrabold text-2xl text-primary font-headline tracking-wider">
            JIGUUR GRAND
          </span>
           <span className="text-xs text-primary/80 font-sans -mt-1">GROUP Est. 1989</span>
      </div>
    </a>
  );
}
