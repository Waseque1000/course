"use client";

import React, { useState } from "react";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  sizeClassName?: string;
  className?: string;
}

export default function UserAvatar({
  src,
  name,
  sizeClassName = "w-10 h-10",
  className = "",
}: UserAvatarProps) {
  const [imgError, setImgError] = useState(false);

  // Compute clean initial letter
  const initial = (name || "Scholar").trim().charAt(0).toUpperCase();

  // Vibrant gradient colors based on initial character code for personalized flair
  const charCode = initial.charCodeAt(0) || 65;
  const gradient =
    charCode % 3 === 0
      ? "from-purple-600 to-indigo-600"
      : charCode % 3 === 1
      ? "from-indigo-600 to-purple-700"
      : "from-purple-700 to-violet-600";

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name || "User Avatar"}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={() => setImgError(true)}
        className={`${sizeClassName} rounded-full object-cover ring-2 ring-purple-100 shadow-xs flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClassName} rounded-full bg-gradient-to-tr ${gradient} text-white font-black text-sm flex items-center justify-center ring-2 ring-purple-100 shadow-xs flex-shrink-0 select-none ${className}`}
      title={name || "User"}
    >
      <span>{initial}</span>
    </div>
  );
}

