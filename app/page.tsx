import { PropsWithChildren } from 'react'
import { Button } from './client/com/Button'
import { HStack } from './client/com/HStack'
import { Label } from './client/com/Label'
import { Tabs } from './client/com/Tabs'
import { TextInput } from './client/com/TextInput'
import { VStack } from './client/com/VStack'
import { useSearchParams } from 'next/navigation'

type SearchParams = { [key: string]: string | string[] | undefined }

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="p-4">
      <Container title="Tabs example">
        <TabsExample searchParams={searchParams} />
      </Container>
      <Container title="Button example">
        <ButtonExample searchParams={searchParams} />
      </Container>
      <Container title="Input example">
        <InputExample searchParams={searchParams} />
      </Container>
    </div>
  )
}

function Container({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <div>
      <h2 className="font-bold text-lg">{title}</h2>
      <div className="border border-gray-500 p-4 rounded mb-4">{children}</div>
    </div>
  )
}

function TabsExample({ searchParams }: { searchParams: SearchParams }) {
  const selectedTab = +(searchParams.selectedTab || 0)
  return (
    <VStack>
      <Tabs
        tabs={['First tab', 'Second tab']}
        state={{ selected: 'selectedTab' }}
      />
      {selectedTab === 0 && <Label text="Tab number 1" />}
      {selectedTab === 1 && <Label text="Tab number 2" />}
    </VStack>
  )
}

function ButtonExample({ searchParams }: { searchParams: SearchParams }) {
  const onPress = async () => {
    'use server'
    return { clicks: String(+(searchParams.clicks || 0) + 1) }
  }
  return (
    <HStack>
      <Button text="Press me!" onPress={onPress} />
      <Label text={`Presses: ${searchParams.clicks || 0}`} />
    </HStack>
  )
}

function InputExample({ searchParams }: { searchParams: SearchParams }) {
  return (
    <HStack>
      <TextInput state={{ value: 'value' }} />
      <Label text={`You entered: ${searchParams.value || ''}`} />
    </HStack>
  )
}
