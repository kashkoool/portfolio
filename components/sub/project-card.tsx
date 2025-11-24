"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPublished = link && link.trim() !== "";

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Desktop: Clickable card, Mobile: Non-clickable */}
      <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#030014] hover:border-purple-500 transition-all duration-300 flex flex-col h-full">
        {/* Desktop Link Wrapper - Only if published */}
        {isPublished ? (
          <Link
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden lg:flex flex-col h-full"
          >
          <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden bg-[#0a0a0a]">
            <Image
              src={src}
              alt={title}
              width={1000}
              height={1000}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized={src.endsWith('.jpg') || src.endsWith('.jpeg')}
              loading="lazy"
              fetchPriority="low"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="relative p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
            <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 line-clamp-3 sm:line-clamp-4 flex-1">
              {description}
            </p>
          </div>
        </Link>
        ) : (
          /* Desktop: Non-clickable card if not published */
          <div className="hidden lg:flex flex-col h-full">
            <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden bg-[#0a0a0a]">
              <Image
                src={src}
                alt={title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized={src.endsWith('.jpg') || src.endsWith('.jpeg')}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 bg-yellow-600/90 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                Not Published
              </div>
            </div>

            <div className="relative p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
              <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-gray-300 line-clamp-3 sm:line-clamp-4 flex-1">
                {description}
              </p>
            </div>
          </div>
        )}

        {/* Mobile: Non-clickable card with View Details button */}
        <div className="lg:hidden flex flex-col h-full">
          <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-[#0a0a0a]">
            <Image
              src={src}
              alt={title}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
              unoptimized={src.endsWith('.jpg') || src.endsWith('.jpeg')}
              loading="lazy"
              fetchPriority="low"
              decoding="async"
            />
            {!isPublished && (
              <div className="absolute top-4 right-4 bg-yellow-600/90 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                Not Published
              </div>
            )}
          </div>

          <div className="relative p-4 sm:p-5 flex-1 flex flex-col">
            <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 line-clamp-2">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 line-clamp-3 sm:line-clamp-4 flex-1 mb-4">
              {description}
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors duration-300 font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Invisible bridge to tooltip to prevent mouse leave */}
      <div
        className={`absolute z-40 hidden lg:block ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          bottom: "100%",
          left: "0",
          right: "0",
          height: "20px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Desktop Hover Tooltip/Popup with Full Description */}
      <div
        className={`absolute z-50 transition-all duration-300 ease-out ${
          isHovered
            ? "opacity-100 translate-y-0 visible pointer-events-auto"
            : "opacity-0 translate-y-2 invisible pointer-events-none"
        } hidden lg:block`}
        style={{
          bottom: "calc(100% + 16px)",
          left: "50%",
          transform: isHovered ? "translateX(-50%)" : "translateX(-50%) translateY(8px)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-[#030014] border border-purple-500 rounded-lg shadow-2xl p-5 sm:p-6 w-80 sm:w-96 max-h-80 overflow-y-auto scrollbar-thin backdrop-blur-sm pointer-events-auto">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {description}
          </p>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
            <div className="w-4 h-4 bg-[#030014] border-r border-b border-purple-500 transform rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Mobile Modal for Full Description */}
      {isModalOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#030014] border border-purple-500 rounded-lg shadow-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto scrollbar-thin flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-48 overflow-hidden bg-[#0a0a0a] rounded-lg mb-4">
              <Image
                src={src}
                alt={title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
                unoptimized={src.endsWith('.jpg') || src.endsWith('.jpeg')}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
              />
            </div>
            <h2 className="text-xl font-semibold text-purple-400 mb-3">
              {title}
            </h2>
            <p className="text-base text-gray-300 leading-relaxed mb-6 flex-1">
              {description}
            </p>
            <div className="flex flex-col gap-3">
              {isPublished ? (
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 font-medium text-center"
                >
                  Visit Project
                </Link>
              ) : (
                <div className="w-full px-6 py-3 bg-yellow-600/80 text-white rounded-lg text-center font-medium">
                  Not Published
                </div>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
