import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import {
    SelectedSnapDisplay,
    useSelectedSnapDisplay
} from './EmblaCarouselSelectedSnapDisplay'
import useEmblaCarousel from 'embla-carousel-react'

type Movie = {
    id: number
    title: string
    backdrop?: string
    poster?: string
}

type PropType = {
    slides: Movie[] // Accepting an array of movies instead of numbers
    options?: EmblaOptionsType,
    content:string
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options,content } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((movie, index) => (
                        <div className={content === "now-playing" ? "embla__slide" : "embla__slide-secondary"}  key={movie.id}>
                            {/* Render image or backdrop */}
                            <div className="embla__slide__image">
                                {movie.backdrop ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop}`}
                                        alt={movie.title}
                                    />
                                ) : (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
                                        alt={movie.title}
                                    />
                                )}
                            </div>
                            <h2 className="embla__slide__title">{movie.title}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <SelectedSnapDisplay
                    selectedSnap={selectedSnap}
                    snapCount={snapCount}
                />
            </div>
        </section>
    )
}

export default EmblaCarousel
