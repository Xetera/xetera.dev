import React from "react"

export default function PostData({ date, readingTime, className }) {
  return (
    <div className={`flex flex-row ${className}`}>
      <time dateTime={date} className="text-s block text-gray-500">
        {date}
      </time>
      <span className="mx-2 text-gray-700 font-bold">·</span>
      <p className="text-s m-0 text-gray-500">{readingTime}</p>
    </div>
  )
}

export function Tags({ tags, className, fontClass }) {
  return (
    <div className={`${className ?? ""}`}>
      {tags.map(tag => (
        <div
          className={`rounded-md inline-flex mr-2 bg-gray-800 px-3 font-normal text-gray-300 ${fontClass}`}
        >
          {tag}
        </div>
      ))}
    </div>
  )
}
