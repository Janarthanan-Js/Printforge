"use client";

import { useCallback, useSyncExternalStore } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

interface LikeButtonProps {
  modelId: number;
  initialLikes: number;
}

const LIKE_EVENT = "printforge:like-change";

function useStoredLike(modelId: number) {
  const key = `printforge-liked-${modelId}`;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const onStorage = (event: StorageEvent) => {
        if (event.key === key) onStoreChange();
      };

      window.addEventListener("storage", onStorage);
      window.addEventListener(LIKE_EVENT, onStoreChange);

      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(LIKE_EVENT, onStoreChange);
      };
    },
    [key]
  );

  const getSnapshot = useCallback(
    () => window.localStorage.getItem(key) === "1",
    [key]
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export default function LikeButton({
  modelId,
  initialLikes,
}: LikeButtonProps) {
  const liked = useStoredLike(modelId);
  const likes = initialLikes + (liked ? 1 : 0);

  function toggleLike() {
    window.localStorage.setItem(
      `printforge-liked-${modelId}`,
      liked ? "0" : "1"
    );
    window.dispatchEvent(new Event(LIKE_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggleLike}
      aria-pressed={liked}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full transition ${
        liked
          ? "bg-red-50 border-red-300 text-red-600"
          : "bg-white border-gray-300 text-gray-700 hover:border-black"
      }`}
    >
      {liked ? (
        <FaHeart aria-hidden="true" />
      ) : (
        <FaRegHeart aria-hidden="true" />
      )}
      {likes.toLocaleString()} likes
    </button>
  );
}
