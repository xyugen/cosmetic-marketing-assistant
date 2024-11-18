"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { Fragment, useState } from "react";

export interface FacebookCardProps {
  name: string;
  description: string[] | string ;
  imageAlt?: string;
  className?: string;
}

export default function FacebookCard({
  name,
  description,
  imageAlt = "",
  className,
}: FacebookCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className={cn("w-full max-w-[500px] bg-white shadow-md", className)}>
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar>
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt="User's profile picture"
          />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-[#050505]">{name}</h3>
          <p className="text-xs text-[#65676B]">2 hours ago</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-3 text-[#050505] whitespace-pre-wrap">
          {Array.isArray(description)
            ? description.map((item, index) => (
                <Fragment key={index}>{item}</Fragment>
              ))
            : description}
        </div>
        <div className="h-80 w-full rounded-md bg-gray-400" />
        {/* <Image
          src="https://placehold.co/468x300"
          width={468}
          height={300}
          alt="Beach scene"
          className="h-auto w-full rounded-md"
        /> */}
      </CardContent>
      <CardFooter className="flex w-full justify-between border-t border-t-gray-200 px-2 py-1">
        <Button
          variant="ghost"
          className={`flex-1 ${isLiked ? "text-[#1877F2] hover:text-[#1877F2]" : "text-[#65676B]"}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <ThumbsUp
            size={20}
            className={cn("mr-2", isLiked && "fill-[#1877F2]")}
          />
          Like
        </Button>
        <Button variant="ghost" className="flex-1 text-[#65676B]">
          <MessageCircle size={20} className="mr-2" />
          Comment
        </Button>
        <Button variant="ghost" className="flex-1 text-[#65676B]">
          <Share2 size={20} className="mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
