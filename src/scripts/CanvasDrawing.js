export const drawCircle = (canvas, point, radius) => {
  const [x, y] = point
  canvas.beginPath()
  canvas.arc(x, y, radius, 0, 2 * Math.PI)
  canvas.fill()
  canvas.closePath()
}

export const drawCircleWithRing = (
  canvas,
  point,
  radius,
  [color, secondColor = 'white']
) => {
  const [x, y] = point

  setLineStyle(canvas, color)

  canvas.beginPath()
  canvas.arc(x, y, radius, 0, 2 * Math.PI)
  canvas.fill()
  canvas.closePath()

  setLineStyle(canvas, secondColor, 1.5)

  canvas.beginPath()
  canvas.arc(x, y, radius - 2.5, 0, 2 * Math.PI)
  canvas.stroke()
  canvas.closePath()
}

export const drawRing = (canvas, point, radius) => {
  const [x, y] = point
  canvas.beginPath()
  canvas.arc(x, y, radius, 0, 2 * Math.PI)
  canvas.stroke()
  canvas.closePath()
}

export const drawTriangle = (canvas, point, sideLength) => {
  const [x, y] = point

  const pointsOfTriangle = [
    [0, ((1 - Math.sqrt(3)) / 2) * sideLength],
    [0.5 * sideLength, 0.5 * sideLength],
    [-0.5 * sideLength, 0.5 * sideLength],
    [0, ((1 - Math.sqrt(3)) / 2) * sideLength],
  ]

  const shiftedTriangle = pointsOfTriangle.map(point => [
    point[0] + x,
    point[1] + y,
  ])

  canvas.moveTo(...shiftedTriangle[0])
  canvas.beginPath()
  canvas.lineTo(x, y - 16)
  canvas.lineTo(x - 15, y + 10)
  canvas.lineTo(x + 15, y + 10)
  canvas.lineTo(x, y - 16)
  canvas.stroke()
  canvas.closePath()
}

export const drawLine = (canvas, from, to) => {
  canvas.beginPath()
  canvas.moveTo(...from)
  canvas.lineTo(...to)
  canvas.stroke()
}

export const drawPath = (canvas, path) => {
  canvas.moveTo(...path[0])
  canvas.beginPath()
  for (const point of path) {
    canvas.lineTo(...point)
  }
  canvas.stroke()
}

export const drawPathWithDots = (canvas, path, dotSize) => {
  drawPath(canvas, path)
  path.slice(1).forEach(dot => drawCircle(canvas, dot, dotSize))
}

export const setLineStyle = (canvas, color, width = 3.5) => {
  canvas.lineWidth = width

  if (color === 'purple') {
    canvas.fillStyle = 'rgba(204, 0, 255, 1)'
    canvas.strokeStyle = 'rgba(204, 0, 255, 0.85)'
  } else if (color === 'blue') {
    canvas.fillStyle = 'rgba(0, 0, 255, 0.3)'
    canvas.strokeStyle = 'rgba(0, 0, 255, 0.8)'
  } else if (color === 'blue-dark') {
    canvas.fillStyle = 'rgba(0, 0, 255, 0.8)'
    canvas.strokeStyle = 'rgba(0, 0, 255, 1)'
  } else if (color === 'red') {
    canvas.fillStyle = 'rgba(255, 0, 0, 0.25)'
    canvas.strokeStyle = 'rgba(255, 0, 0, 0.5)'
  } else if (color === 'red-dark') {
    canvas.fillStyle = 'rgba(255, 0, 0, 0.85)'
    canvas.strokeStyle = 'rgba(255, 0, 0, 0.85)'
  } else if (color === 'white') {
    canvas.fillStyle = 'rgba(255, 255, 255, 0.5)'
    canvas.strokeStyle = 'rgba(255, 255, 255, 0.85)'
  }
}
