import { getAllFrontmatter } from 'lib/mdx'
import { format, parseISO } from 'date-fns'
import { H2, XStack, Paragraph, Card, YStack, styled, H3 } from 'tamagui'
import NextInternalLink from 'next/link'
import { Frontmatter } from 'frontmatter'

export default function Blog({ frontmatters }) {
  return (
    <>
      <H2 als="center" theme="alt2">
        Blog
      </H2>
      <ContainerLarge>
        <YStack>
          {frontmatters.map((frontmatter: Frontmatter) => (
            <NextInternalLink key={frontmatter.title} href={frontmatter.slug} style={{textDecorationLine: 'none'}}>
              <TamaguiCard
                title={frontmatter.title}
                subTitle={
                  <Paragraph o={0.5} cursor="inherit" theme="alt1" size="$3">
                    {format(parseISO(frontmatter.publishedAt), 'MMMM yyyy')} by &nbsp;
                    {frontmatter.by}
                  </Paragraph>
                }
              >
                {frontmatter.description}
              </TamaguiCard>
            </NextInternalLink>
          ))}
        </YStack>
      </ContainerLarge>
    </>
  )
}

function TamaguiCard({ children, title, subTitle, ...props }) {
  return (
    <Card
      p="$4"
      mx="$1"
      my="$2"
      mb="$2"
      space="$2"
      $gtSm={{
        width: '100%',
        //maxWidth: 'calc(50% - var(--space-8))',
      }}
      $sm={{ width: 'auto', maxWidth: 'auto', f: 1 }}
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      bordered
    >
      <H3 tag="span" size="$7" lh="$6" color="$color" cursor="inherit" ls={0}>
        {title}
      </H3>

      {!!subTitle && <XStack o={0.5}>{subTitle}</XStack>}

      <Paragraph tag="span" size="$4" cursor="inherit" theme="alt2" o={0.7}>
        {children}
      </Paragraph>

      <Card.Background shadowColor={'blue'} />
    </Card>
  )
}

const variants = {
  hide: {
    true: {
      pointerEvents: 'none',
      opacity: 0,
    },
  },
} as const

const ContainerLarge = styled(YStack, {
  mx: 'auto',
  px: '$4',
  width: '100%',

  $gtSm: {
    maxWidth: 980,
  },

  $gtMd: {
    maxWidth: 1140,
  },

  variants,
})

export function getStaticProps() {
  const frontmatters = getAllFrontmatter('blog')
  const sortedFrontmatters = frontmatters.sort(
    (a, b) => Number(new Date(b.publishedAt || '')) - Number(new Date(a.publishedAt || ''))
  )
  return { props: { frontmatters: sortedFrontmatters } }
}
