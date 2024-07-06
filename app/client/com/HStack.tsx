'use client'
import { PropsWithChildren } from 'react'

export function HStack({ children }: PropsWithChildren<{}>) {
  return <div className="flex flex-row items-center gap-4">{children}</div>
}
