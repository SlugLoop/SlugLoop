import Journey from '../../src/components/Journey/Journey'
import Wrapper from '../../src/components/UIWrapper/Wrapper'

export const metadata = {
  title: 'SlugLoop | Field Log: hackathon → Top 10',
  description:
    'A scrolling field log of how four UCSC engineering students rebuilt the campus loop bus tracker over a hackathon weekend and ended up as the first US team in the Google Solution Challenge global Top 10 in three years.',
}

export default function JourneyPage() {
  return (
    <Wrapper>
      <Journey />
    </Wrapper>
  )
}
