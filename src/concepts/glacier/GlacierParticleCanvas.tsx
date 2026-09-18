import React, { useEffect, useRef } from 'react'

interface GlacierParticleCanvasProps {
  theme?: 'dark' | 'light'
  className?: string
}

interface IceCrystal {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  baseAlpha: number
  pulseSpeed: number
  pulseAngle: number
  color: string
  twinkleFactor: number
  shapeType: 'crystal' | 'cross' | 'orb'
}

export const GlacierParticleCanvas: React.FC<GlacierParticleCanvasProps> = ({
  theme = 'dark',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0

    // Set high-DPI scaling safely
    const handleResize = () => {
      if (!canvas) return
      const parent = canvas.parentElement || document.body
      width = parent.clientWidth || window.innerWidth
      height = parent.clientHeight || window.innerHeight

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Palette of luminescent electric ice cyan & glacial frost
    const cyanPaletteDark = [
      'rgba(125, 211, 252, ', // #7DD3FC
      'rgba(56, 189, 248, ',  // #38BDF8
      'rgba(186, 230, 253, ', // #BAE6FD
      'rgba(224, 242, 254, ', // #E0F2FE
    ]

    const cyanPaletteLight = [
      'rgba(14, 165, 233, ',  // #0EA5E9
      'rgba(2, 132, 199, ',   // #0284C7
      'rgba(56, 189, 248, ',  // #38BDF8
    ]

    const palette = theme === 'dark' ? cyanPaletteDark : cyanPaletteLight

    // Spawn 40 particles (between 35 and 45)
    const particleCount = 40
    const particles: IceCrystal[] = []

    for (let i = 0; i < particleCount; i++) {
      const shapeRand = Math.random()
      particles.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        radius: 1.2 + Math.random() * 2.4, // 1.2px - 3.6px
        vx: (Math.random() - 0.5) * 0.35, // gentle horizontal drift
        vy: -0.15 - Math.random() * 0.35, // slow upward buoyant floating drift
        baseAlpha: 0.25 + Math.random() * 0.5,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        pulseAngle: Math.random() * Math.PI * 2,
        color: palette[Math.floor(Math.random() * palette.length)],
        twinkleFactor: 0.5 + Math.random() * 0.5,
        shapeType: shapeRand > 0.6 ? 'crystal' : shapeRand > 0.3 ? 'cross' : 'orb',
      })
    }

    let lastTime = performance.now()

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.vx * 60 * dt
        p.y += p.vy * 60 * dt
        p.pulseAngle += p.pulseSpeed

        // Wrap around borders smoothly
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        // Calculate pulsing luminescent opacity
        const oscillation = Math.sin(p.pulseAngle)
        const alpha = Math.max(
          0.08,
          Math.min(0.9, p.baseAlpha + oscillation * 0.25 * p.twinkleFactor)
        )

        ctx.save()
        ctx.translate(p.x, p.y)

        if (p.shapeType === 'crystal') {
          // Faceted sub-zero ice crystal diamond
          ctx.beginPath()
          ctx.moveTo(0, -p.radius * 1.6)
          ctx.lineTo(p.radius * 0.9, 0)
          ctx.lineTo(0, p.radius * 1.6)
          ctx.lineTo(-p.radius * 0.9, 0)
          ctx.closePath()

          ctx.fillStyle = `${p.color}${alpha})`
          ctx.shadowColor = theme === 'dark' ? 'rgba(125, 211, 252, 0.6)' : 'rgba(14, 165, 233, 0.3)'
          ctx.shadowBlur = theme === 'dark' ? 8 : 4
          ctx.fill()
        } else if (p.shapeType === 'cross') {
          // Microscopic 4-point ice flake star
          ctx.fillStyle = `${p.color}${alpha})`
          ctx.shadowColor = theme === 'dark' ? 'rgba(56, 189, 248, 0.6)' : 'rgba(2, 132, 199, 0.3)'
          ctx.shadowBlur = theme === 'dark' ? 6 : 3

          const size = p.radius * 1.2
          ctx.fillRect(-size, -0.75, size * 2, 1.5)
          ctx.fillRect(-0.75, -size, 1.5, size * 2)
        } else {
          // Soft luminescent orb with radial glow
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius * 2)
          grad.addColorStop(0, `${p.color}${alpha * 1.2})`)
          grad.addColorStop(0.5, `${p.color}${alpha * 0.4})`)
          grad.addColorStop(1, `${p.color}0)`)

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(0, 0, p.radius * 2, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 w-full h-full ${className}`}
      style={{ willChange: 'transform' }}
    />
  )
}
