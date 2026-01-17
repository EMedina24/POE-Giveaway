"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Participant {
  id: string;
  participant_name: string;
  reddit_name?: string | null;
  reddit_profile_link?: string | null;
  created_at: string;
}

interface GiveawaySelectorProps {
  participants: Participant[];
  winnerId?: string | null;
  onSelectWinner?: (participant: Participant) => void;
}

export default function GiveawaySelector({
  participants,
  winnerId,
  onSelectWinner
}: GiveawaySelectorProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (participants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-12 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          No participants yet. Participants will appear here once they join.
        </p>
      </div>
    );
  }

  const currentParticipant = participants[currentIndex];
  const isWinner = winnerId === currentParticipant?.id;

  return (
    <div className="flex flex-col gap-6">
      {/* Swiper Container */}
      <div className="relative mx-auto w-full max-w-sm">
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards, Pagination, Navigation]}
          className="h-80 w-full"
          onSwiper={setSwiper}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          cardsEffect={{
            perSlideOffset: 8,
            perSlideRotate: 2,
            rotate: true,
            slideShadows: true,
          }}
        >
          {participants.map((participant, index) => (
            <SwiperSlide key={participant.id}>
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                {/* Participant Number */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-2xl font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                  #{index + 1}
                </div>

                {/* Participant Name */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {participant.participant_name}
                  </h3>
                </div>

                {/* Reddit Info */}
                {(participant.reddit_name || participant.reddit_profile_link) && (
                  <div className="flex flex-col items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
                    {participant.reddit_name && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {participant.reddit_name}
                      </p>
                    )}
                    {participant.reddit_profile_link && (
                      <a
                        href={participant.reddit_profile_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Profile →
                      </a>
                    )}
                  </div>
                )}

                {/* Winner Badge */}
                {winnerId === participant.id && (
                  <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 dark:bg-yellow-900/30">
                    <span className="text-2xl">👑</span>
                    <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">
                      Winner
                    </span>
                  </div>
                )}

                {/* Joined Date */}
                <p className="mt-auto text-xs text-zinc-500 dark:text-zinc-500">
                  Joined {new Date(participant.created_at).toLocaleDateString()}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        {participants.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              aria-label="Previous participant"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              aria-label="Next participant"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Info Bar */}
      <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Showing {currentIndex + 1} of {participants.length}
          </span>
        </div>

        {onSelectWinner && !winnerId && currentParticipant && (
          <button
            type="button"
            onClick={() => onSelectWinner(currentParticipant)}
            className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-yellow-600"
          >
            Select as Winner
          </button>
        )}

        {isWinner && (
          <div className="flex items-center gap-2 text-sm font-medium text-yellow-700 dark:text-yellow-400">
            <span>👑</span>
            <span>Current Winner</span>
          </div>
        )}
      </div>

      {/* Random Selection Button */}
      {onSelectWinner && !winnerId && participants.length > 0 && (
        <button
          type="button"
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * participants.length);
            const randomParticipant = participants[randomIndex];
            swiper?.slideTo(randomIndex);
            setTimeout(() => {
              onSelectWinner(randomParticipant);
            }, 500);
          }}
          className="w-full rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          🎲 Pick Random Winner
        </button>
      )}
    </div>
  );
}
