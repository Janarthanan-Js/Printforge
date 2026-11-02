import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa6";
import Pill from "./pill";
import { getCategoryDisplayName } from "../lib/categories";
import type { ModelCardProps } from "../types";

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <Link
      href={`/3d-models/${model.id}`}
      className="block group hover:shadow-[0_5px_12px_rgba(0,0,0,0.1)] hover:-translate-y-[3px] transition-all rounded-lg"
      aria-labelledby={`model-${model.id}-title`}
    >
      <div
        className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg"
        role="article"
      >
        <div className="relative overflow-hidden aspect-square bg-gray-100">
          <Image
            src={model.image}
            alt={model.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h2
            id={`model-${model.id}-title`}
            className="mb-2 text-lg font-semibold text-gray-900 line-clamp-1"
          >
            {model.name}
          </h2>

          <p className="mb-3 text-sm text-gray-600 line-clamp-2">
            {model.description}
          </p>

          <div className="mb-3">
            <Pill>{getCategoryDisplayName(model.category)}</Pill>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <FaRegHeart aria-hidden="true" />
              <span>{model.likes.toLocaleString()} likes</span>
            </span>
            <span className="text-xs">
              {new Date(model.dateAdded).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
