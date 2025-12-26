"use client";

import { useEffect, useState } from "react";

const BackgroundBubbles = () => {
  const [bubbles, setBubbles] = useState<{ id: number; size: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate bubbles only on client side to avoid hydration mismatch
    const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 40 + 10, // 10px to 50px
      left: Math.random() * 100, // 0% to 100%
      delay: Math.random() * 15, // 0s to 15s delay
      duration: Math.random() * 10 + 10, // 10s to 20s duration
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="bubbles">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            animation: `bubble ${b.duration}s linear infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundBubbles;
