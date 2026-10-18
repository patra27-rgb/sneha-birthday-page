import { useRef, useState } from 'react'
import './App.css'

const sparkles = ['✦', '✧', '♥', '✦', '♡', '✧', '♥', '✦']
const floatingHearts = ['♡', '✦', '♥', '♡', '✧', '♥', '♡']
const balloonColors = [
  '#ff6680',
  '#ffb23f',
  '#ffd94a',
  '#53c7a2',
  '#57b9ee',
  '#9884f5',
  '#f176c8',
  '#ff8661',
  '#a7ce50',
]
const balloons = Array.from({ length: 20 }, (_, index) => index)
const galleryPhotos = Array.from({ length: 11 }, (_, index) => index + 2)
const fireworks = Array.from({ length: 3 }, (_, index) => index)
const fireworkSparks = Array.from({ length: 12 }, (_, index) => index)
const fireworkColors = ['#ff6680', '#ffd94a', '#57b9ee']
const photoBaseUrl = import.meta.env.BASE_URL

function App() {
  const [letterOpen, setLetterOpen] = useState(false)
  const [celebration, setCelebration] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [heroPhotoMissing, setHeroPhotoMissing] = useState(!import.meta.env.DEV)
  const [missingGalleryPhotos, setMissingGalleryPhotos] = useState(
    () => import.meta.env.DEV ? new Set() : new Set(galleryPhotos),
  )
  const burstId = useRef(0)

  function celebrate(event) {
    const buttonBounds = event.currentTarget.getBoundingClientRect()
    const id = ++burstId.current

    setCelebration({
      id,
      x: buttonBounds.left + buttonBounds.width / 2,
      y: buttonBounds.top + buttonBounds.height / 2,
    })
    window.setTimeout(() => {
      setCelebration((current) => current?.id === id ? null : current)
    }, 4200)
  }

  return (
    <main className="page-shell" data-theme={darkMode ? 'dark' : 'light'}>
      {celebration && (
        <div className="balloon-burst" aria-hidden="true">
          {balloons.map((index) => {
            const drift = ((index % 7) - 3) * 36
            const rise = -window.innerHeight - 100
            const rotation = (index % 2 === 0 ? 1 : -1) * (12 + index * 2)

            return (
              <span
                className="burst-balloon"
                key={`${celebration.id}-${index}`}
                style={{
                  left: `${celebration.x}px`,
                  top: `${celebration.y}px`,
                  '--balloon-color': balloonColors[index % balloonColors.length],
                  '--balloon-drift': `${drift}px`,
                  '--balloon-rise': `${rise}px`,
                  '--balloon-rotation': `${rotation}deg`,
                  '--balloon-delay': `${index * 35}ms`,
                }}
              />
            )
          })}
        </div>
      )}
      {celebration && (
        <div className="fireworks-burst" aria-hidden="true">
          {fireworks.map((index) => (
            <div
              className="firework"
              key={`${celebration.id}-firework-${index}`}
              style={{
                left: `${25 + index * 25}%`,
                top: `${27 - (index % 2) * 9}%`,
                '--firework-color': fireworkColors[index],
                '--firework-delay': `${index * 220}ms`,
              }}
            >
              {fireworkSparks.map((sparkIndex) => (
                <span
                  key={sparkIndex}
                  style={{ '--spark-angle': `${sparkIndex * 30}deg` }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="floating-hearts" aria-hidden="true">
        {floatingHearts.map((heart, index) => (
          <span key={`${heart}-${index}`}>{heart}</span>
        ))}
      </div>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#home" aria-label="A birthday page for Sneha">
          <span className="brand-mark">♡</span>
          <span>just for you</span>
        </a>
        <span className="topbar-note">A little page full of love</span>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          onClick={() => setDarkMode((enabled) => !enabled)}
        >
          <span aria-hidden="true">{darkMode ? '☀' : '☾'}</span>
        </button>
        <a className="topbar-link" href="#birthday-note">
          Your birthday note <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span /> TODAY IS YOURS, SNEHA</p>
          <h1>
            The world got
            <br />
            a little <em>brighter</em>
            <br />
            the day you arrived.
          </h1>
          <p className="hero-description">
            And somehow, every day since has been better with you in it.
            Here&apos;s a little something to make your day feel as lovely as you are.
          </p>
          <a className="primary-button" href="#birthday-note">
            There&apos;s a note for you <span aria-hidden="true">↓</span>
          </a>
          <p className="little-love"><span>♥</span> made with so much love</p>
        </div>

        <div className={`hero-art${heroPhotoMissing ? ' image-missing' : ''}`}>
          <span className="art-sparkle sparkle-top" aria-hidden="true">✳</span>
          <span className="art-sparkle sparkle-right" aria-hidden="true">✦</span>
          <span className="art-sparkle sparkle-left" aria-hidden="true">✧</span>
          <span className="birthday-stamp" aria-hidden="true">
            <span>TO</span>
            <strong>SNEHA</strong>
            <span>WITH LOVE</span>
          </span>
          <span className="hero-placeholder" aria-hidden="true">♡</span>
          {!heroPhotoMissing && (
            <img
              className="hero-photo"
              src={`${photoBaseUrl}sneha.png`}
              alt="Sneha"
              onError={() => setHeroPhotoMissing(true)}
            />
          )}
          <div className="art-caption">a day as sweet as you</div>
          <span className="cake-side-note">one more wish ✷</span>
        </div>
      </section>

      <section className="photo-gallery" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <p className="eyebrow">SNEHA, IN EVERY LIGHT</p>
          <h2 id="gallery-title">A little gallery of you</h2>
        </div>
        <div className="gallery-grid">
          {galleryPhotos.map((number) => (
            <figure
              className={`gallery-frame${missingGalleryPhotos.has(number) ? ' image-missing' : ''}`}
              key={number}
            >
              <span className="gallery-placeholder" aria-hidden="true">♡</span>
              {!missingGalleryPhotos.has(number) && (
                <img
                  className="gallery-photo"
                  src={`${photoBaseUrl}sneha${number}.jpeg`}
                  alt={`Sneha, photo ${number}`}
                  loading="lazy"
                  decoding="async"
                  onError={() => {
                    setMissingGalleryPhotos((current) => new Set(current).add(number))
                  }}
                />
              )}
            </figure>
          ))}
        </div>
      </section>

      <section className="birthday-note" id="birthday-note">
        <div className="note-heading">
          <span className="note-icon" aria-hidden="true">✉</span>
          <div>
            <p className="eyebrow">A NOTE FROM THE HEART</p>
            <h2>For my favorite person</h2>
          </div>
          <span className="note-heart" aria-hidden="true">♡</span>
        </div>
        <p className="note-preview">
          You make ordinary moments feel special, and the people around you feel
          so lucky. I hope this next trip around the sun brings you all the joy
          you give to everyone else.
        </p>
        <div className="note-footer">
          <span>always cheering for you</span>
          <button
            className="letter-button"
            type="button"
            aria-expanded={letterOpen}
            aria-controls="full-letter"
            onClick={() => setLetterOpen((open) => !open)}
          >
            {letterOpen ? 'Close your note' : 'Open your note'}
            <span aria-hidden="true">{letterOpen ? '−' : '↗'}</span>
          </button>
        </div>
        {letterOpen && (
          <div className="full-letter" id="full-letter">
            <p>Dear Sneha,</p>
            <p>
              Happy birthday to someone who makes life softer, brighter, and a
              whole lot more fun. I hope today brings you your favorite things,
              your biggest laughs, and a hundred little reasons to smile.
            </p>
            <p>
              Keep being wonderfully, unmistakably you. You deserve every bit
              of happiness coming your way today and in the year ahead.
            </p>
            <p className="letter-signoff">With all my love, always ♡</p>
          </div>
        )}
      </section>

      <section className="wish-section" aria-label="Birthday wish">
        <span className="wish-decoration wish-decoration-one" aria-hidden="true">✳</span>
        <span className="wish-decoration wish-decoration-two" aria-hidden="true">✧</span>
        <div className="wish-copy">
          <span className="wish-eyebrow">MAKE A WISH ✷</span>
          <h2>Here&apos;s to your<br /><em>loveliest year yet.</em></h2>
        </div>
        <button className="wish-button" type="button" onClick={celebrate}>
          <span aria-hidden="true">🎆</span> Light the fireworks!
        </button>
        {celebration && (
          <div className="sparkle-burst" aria-hidden="true">
            {sparkles.map((sparkle, index) => (
              <span key={`${celebration.id}-${index}`} style={{ '--sparkle-index': index }}>
                {sparkle}
              </span>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <span>HAPPY BIRTHDAY, SNEHA</span>
        <span>THE WORLD IS SWEETER WITH YOU IN IT <span className="footer-heart">♥</span></span>
      </footer>
    </main>
  )
}

export default App
