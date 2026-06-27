"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { MaterialIcon } from "@/components/material-icon";

type Props = {
  videoUrl?: string;
  posterUrl: string;
  images: string[];
  labels?: string[];
};

const DEFAULT_LABELS = ["Makkah", "Makkah", "Makkah", "Makkah", "Madinah"];

function LocationTag({ label }: { label: string }) {
  return (
    <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tertiary">
      {label}
    </span>
  );
}

function ImageTile({
  src,
  label,
  className = "",
}: {
  src: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url('${src}')` }}
    >
      {label && <LocationTag label={label} />}
    </div>
  );
}

function VideoTile({
  videoUrl,
  posterUrl,
  className = "",
}: {
  videoUrl?: string;
  posterUrl: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    if (!videoUrl || !videoRef.current) return;
    void videoRef.current.play();
    setPlaying(true);
  }

  return (
    <div className={`relative overflow-hidden rounded-xl bg-neutral-10 ${className}`}>
      {videoUrl ? (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            controls={playing}
            playsInline
            className="h-full w-full object-cover"
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
              aria-label="Play package video"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg">
                <MaterialIcon name="play_arrow" className="text-3xl text-primary" />
              </span>
            </button>
          )}
        </>
      ) : (
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${posterUrl}')` }}
        />
      )}

      <span className="absolute left-3 top-3 rounded-md bg-[#8B6914]/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
        Hotel
      </span>

      <Link
        href="/gallery"
        className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-tertiary shadow-sm"
      >
        View Gallery
        <MaterialIcon name="north_east" className="text-sm" />
      </Link>
    </div>
  );
}

export function PackageGallery({ videoUrl, posterUrl, images, labels }: Props) {
  const imgs = images.slice(0, 5);
  while (imgs.length < 5) {
    imgs.push(posterUrl);
  }
  const tags = labels ?? DEFAULT_LABELS;

  return (
    <>
      {/* Mobile: video + scrollable strip */}
      <div className="space-y-2 lg:hidden">
        <VideoTile
          videoUrl={videoUrl}
          posterUrl={posterUrl}
          className="min-h-[220px] w-full"
        />
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {imgs.map((src, i) => (
            <ImageTile
              key={i}
              src={src}
              label={tags[i]}
              className="h-28 w-44 shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Desktop: 2 portrait + 4 landscape (Smart Umrah layout) */}
      <div className="hidden h-[480px] grid-cols-4 grid-rows-2 gap-1.5 lg:grid xl:h-[520px]">
        <VideoTile
          videoUrl={videoUrl}
          posterUrl={posterUrl}
          className="col-start-1 row-span-2 row-start-1"
        />
        <ImageTile
          src={imgs[0]}
          label={tags[0]}
          className="col-start-2 row-start-1"
        />
        <ImageTile
          src={imgs[1]}
          label={tags[1]}
          className="col-start-2 row-start-2"
        />
        <ImageTile
          src={imgs[2]}
          label={tags[2]}
          className="col-start-3 row-span-2 row-start-1"
        />
        <ImageTile
          src={imgs[3]}
          label={tags[3]}
          className="col-start-4 row-start-1"
        />
        <ImageTile
          src={imgs[4]}
          label={tags[4]}
          className="col-start-4 row-start-2"
        />
      </div>
    </>
  );
}
