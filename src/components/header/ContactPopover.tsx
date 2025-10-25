
import React from "react";
import { Phone } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const ContactPopover: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger className="nav-link font-medium text-sm text-foreground/80 hover:text-foreground">
        Contact
      </PopoverTrigger>
      <PopoverContent 
        className="w-64 p-4 bg-white dark:bg-gray-900 rounded-md shadow-md"
        sideOffset={5}
      >
        <div className="space-y-3">
          <h3 className="text-sm font-medium mb-2">Contact Information</h3>
          <div className="text-sm">
            <p className="font-medium text-foreground">Karivaradhan C</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            <a href="tel:+916380033886" className="text-foreground/80 hover:text-foreground">
              +91 6380033886
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
