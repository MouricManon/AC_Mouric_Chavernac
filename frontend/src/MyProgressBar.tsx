import React, {useEffect, useRef} from "react"

export enum Orientation {
  horizontal = "horizontal",
  vertical = "vertical"
}

type BarProps = {
  vitesse: number,
  initialvalue?: number
  className?: string
  run: boolean
  frontcolor?: string
  backcolor?: string
  auto?: boolean
  orientation?: Orientation
  onCompleted?: () => void
}

export default function MyProgressbar({
    vitesse, initialvalue = 0, className, run, frontcolor = "#008800", backcolor = "#FFFFFF", auto = false, onCompleted, orientation = Orientation.horizontal
}: BarProps) {

  const requestIdRef = useRef(0)
  const canvasRef = useRef<HTMLCanvasElement>( null)
  const widthRef = useRef(0)
  const dateRef = useRef(Date.now() - initialvalue)

  function renderFrame() {
    if (!canvasRef.current) return
    let ctx = canvasRef.current.getContext("2d")
    if (!ctx) return
    let elapsetime = Date.now() - dateRef.current
    let percent = (elapsetime * 100) / vitesse
    let reflength = canvasRef.current.width
    if (orientation === Orientation.vertical) reflength = canvasRef.current.height
    widthRef.current = (percent * reflength) / 100
    if (widthRef.current >= reflength) {
      if (onCompleted) onCompleted()
      if (auto || !run) {
        dateRef.current = Date.now()
        reset(ctx)
      }
    }
    else {
      fill(ctx)
    }
  }

  function fill(ctx: CanvasRenderingContext2D) {
    if (!canvasRef.current || !widthRef.current) return
    let width =  canvasRef.current.width
    let height = canvasRef.current.height
    ctx.fillStyle = frontcolor
    if (orientation === Orientation.horizontal) {
      ctx.fillRect(0,0, widthRef.current, height);
    }
    else {
      ctx.fillRect(0, height - widthRef.current, width, height);
    }
  }

  function reset(ctx: CanvasRenderingContext2D) {
    if (!canvasRef.current) return
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    ctx.fillStyle = backcolor
    ctx.fillRect(0,0, width, height)
    widthRef.current = 0
  }

  function draw() {
    if (!canvasRef.current) return
    if (widthRef.current < canvasRef.current.width || auto) {
        renderFrame()
        requestIdRef.current = requestAnimationFrame(draw)
      }
  }

  useEffect(() => {
    if (!canvasRef.current) return
    let canvas = canvasRef.current as HTMLCanvasElement
    let ctxi = canvas.getContext("2d")
    if (!ctxi) return
    if (!run) {
      reset(ctxi)
    }
    if (run || auto) {
      dateRef.current = Date.now() - initialvalue
      requestIdRef.current = requestAnimationFrame(draw)
    }
    else {
      widthRef.current = 0
    }
    return () => {
      cancelAnimationFrame(requestIdRef.current)
    }
  })

  return (
      <canvas className={className} ref={canvasRef}/>
  )
}