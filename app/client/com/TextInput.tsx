'use client'
import { useRouter, useSearchParams } from 'next/navigation'

export function TextInput({
  state,
  onSubmit,
}: {
  state?: Record<string, string>
  onSubmit?: (state: Record<string, string>) => Promise<Record<string, string>>
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <input
      className="border border-gray-400 rounded"
      type="text"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const value = (e.target as HTMLInputElement).value

          if (state?.value) {
            const oldState = Object.fromEntries(searchParams.entries())
            const newState = { ...oldState, [state.value]: value }
            router.replace(`/?${new URLSearchParams(newState).toString()}`)
          }

          if (onSubmit) {
            const oldState = Object.fromEntries(searchParams.entries())
            onSubmit(oldState).then((updates) => {
              if (updates && typeof updates === 'object') {
                const newState = { ...oldState, ...updates }
                router.replace(`/?${new URLSearchParams(newState).toString()}`)
              }
            })
          }
        }
      }}
    />
  )
}
