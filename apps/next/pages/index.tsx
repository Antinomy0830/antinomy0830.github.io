import { H1, Paragraph } from '@tamagui/text'
import { XStack, YStack, Separator, Text, Anchor } from 'tamagui'

export default function NomiHome() {
  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to ~Nomi</H1>
        <Paragraph ta="center"></Paragraph>
        <Separator />

        <XStack space jc="center">
          <Anchor color="$color" href="/blog">
            Blog
          </Anchor>
          <Anchor color="$color" href="/gallery">
            Gallery
          </Anchor>
          <Anchor color="$color" href="/about">
            About
          </Anchor>
        </XStack>
      </YStack>
    </YStack>
  )
}
