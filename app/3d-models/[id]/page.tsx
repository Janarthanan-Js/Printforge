import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import Pill from "@/app/components/pill";
import ModelCard from "@/app/components/ModelCard";
import LikeButton from "@/app/components/LikeButton";
import ShareButton from "@/app/components/ShareButton";
import { getModelById, getRelatedModels } from "@/app/lib/models";
import { getCategoryDisplayName } from "@/app/lib/categories";
import type { ModelDetailPageProps } from "@/app/types";

export async function generateMetadata({
  params,
}: ModelDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const model = await getModelById(id);

  if (!model) {
    notFound();
  }

  return {
    title: model.name,
    description: model.description,
  };
}

export default async function ModelDetailPage({
  params,
}: ModelDetailPageProps) {
  const { id } = await params;
  const model = await getModelById(id);

  if (!model) {
    notFound();
  }

  const relatedModels = getRelatedModels(model);

  return (
    <div className="px-4 py-8 mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-black">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/3d-models" className="hover:text-black">
              3D Models
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900" aria-current="page">
            {model.name}
          </li>
        </ol>
      </nav>

      <article className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <figure className="relative overflow-hidden bg-gray-100 border border-gray-200 rounded-xl shadow-lg aspect-square">
          <Image
            src={model.image}
            alt={`3D model of ${model.name}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </figure>

        <section className="flex flex-col justify-center">
          <Link
            href={`/3d-models?category=${model.category}`}
            className="mb-4 w-fit"
          >
            <Pill className="hover:border-black">
              {getCategoryDisplayName(model.category)}
            </Pill>
          </Link>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {model.name}
          </h1>

          <p className="mb-6 text-base leading-relaxed text-gray-600">
            {model.description}
          </p>

          <dl className="grid grid-cols-2 gap-4 py-6 mb-6 border-y border-gray-200">
            <div>
              <dt className="text-xs font-semibold uppercase text-gray-500">
                Added
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(model.dateAdded).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-gray-500">
                File format
              </dt>
              <dd className="mt-1 text-sm text-gray-900">STL</dd>
            </div>
          </dl>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`/api/models/${model.id}/download`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition"
            >
              <FiDownload aria-hidden="true" />
              Download STL
            </a>

            <LikeButton
              modelId={model.id}
              initialLikes={model.likes}
            />

            <ShareButton title={model.name} />
          </div>
        </section>
      </article>

      {relatedModels.length > 0 ? (
        <section className="pt-8 mt-16 border-t border-gray-200">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold">You may also like</h2>
            <Link
              href="/3d-models"
              className="text-sm text-gray-600 underline underline-offset-4 hover:text-black"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedModels.map((related) => (
              <ModelCard key={related.id} model={related} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
