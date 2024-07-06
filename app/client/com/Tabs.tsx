'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

export function Tabs({
  tabs,
  state,
}: {
  tabs: string[]
  state?: Record<string, string>
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [selected, setSelected] = useState(0)
  const onSelect = useCallback(
    (n: number) => {
      setSelected(n)
      if (state?.selected) {
        const oldState = Object.fromEntries(searchParams.entries())
        const newState = { ...oldState, [state.selected]: String(n) }
        router.replace(`/?${new URLSearchParams(newState).toString()}`)
      }
    },
    [setSelected, state, searchParams, router]
  )

  return (
    <div className="flex flex-row gap-4">
      {tabs.map((tab, i) => (
        <div
          key={String(i + tab)}
          className={`border border-gray-300 rounded px-3 py-1 cursor-pointer ${
            selected === i && 'bg-red-600'
          }`}
          onClick={(e) => onSelect(i)}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}
