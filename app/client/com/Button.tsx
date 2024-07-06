'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function Button({
  text,
  onPress,
}: {
  text: string
  onPress?: (state: Record<string, string>) => Promise<Record<string, string>>
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <button
      onClick={() => {
        if (!onPress) return
        const oldState = Object.fromEntries(searchParams.entries())
        onPress(oldState).then((updates) => {
          if (updates && typeof updates === 'object') {
            const newState = { ...oldState, ...updates }
            router.replace(`/?${new URLSearchParams(newState).toString()}`)
          }
        })
      }}
      className="px-3 py-1 border border-gray-400 rounded bg-gray-300"
    >
      {text}
    </button>
  )
}
