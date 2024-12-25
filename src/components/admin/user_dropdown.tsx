import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const UserDropDown = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-7 w-7">
            <AvatarImage src="https://github.com/chetan-kk.png" alt="@Subha" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@User</h4>
          <p className="text-muted-foreground text-xs whitespace-nowrap text-center">
            Administrator
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserDropDown;
