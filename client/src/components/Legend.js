'use client'

import React, {useState} from 'react'

export default function Legend(props) {
  const [open, setOpen] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="museum-map-panel absolute bottom-[100px] left-5 max-w-[150px] rounded-lg p-4 text-left opacity-80 transition"
    >
      <span className="font-bold">Legend</span>
      {open && (
        <span className="mt-4 flex flex-col gap-3">
          {Object.keys(props.legendItems).map((route) => (
            <span key={route} className="flex items-center gap-2 text-sm">
              <img
                src={props.legendItems[route].icon}
                alt="Bus Icon"
                width="20"
                height="20"
              />
              <span>{props.legendItems[route].name}</span>
            </span>
          ))}
        </span>
      )}
    </button>
  )
}
