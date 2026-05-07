import Wrapper from '../src/components/UIWrapper/Wrapper'
import Button from '../src/components/ui/Button'

export default function NotFound() {
  return (
    <Wrapper>
      <main className="museum-page flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
        <h1 className="type-display-1">Route not found.</h1>
        <p className="text-muted">
          This SlugLoop archive route does not exist.
        </p>
        <Button href="/" variant="solid">
          Return to Story
        </Button>
      </main>
    </Wrapper>
  )
}
