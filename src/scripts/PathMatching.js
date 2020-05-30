export const distanceBetweenPoints = (point1, point2) => {
  const x = (point1[0] - point2[0]) ** 2
  const y = (point1[1] - point2[1]) ** 2

  return Math.sqrt(x + y)
}

const between = (value, a, b) =>
  value >= Math.min(a, b) && value <= Math.max(a, b)

const betweenPoints = (value, point1, point2) =>
  between(value[0], point1[0], point2[0]) &&
  between(value[1], point1[1], point2[1])

const findPointOfIntersection = (circleCenter, point1, point2) => {
  // Equation of Circle: (x-a)^2 + (x-b)^2 = radius^2
  const [a, b] = circleCenter

  // DIfference Between Points
  const dx = point2[0] - point1[0]
  const dy = point2[1] - point1[1]

  // Check for Vertical Lines
  if (dx !== 0 && dy !== 0) {
    // Equation of Line Between Points: y = mx + c
    const m = dy / dx
    const c = -m * point1[0] + point1[1]

    // Equation of Line Perpendicular to Points, Passing Through Circle Center
    // y = (-1/m)x + (a/m) + b

    // Point of Intersection of 2 Lines
    const x = (a - (c - b) * m) / (m ** 2 + 1)
    const y = m * x + c

    return [x, y]
  } else if (dx === 0 && dy === 0) {
    // 2 Points are in the same place
    return point1
  } else if (dx === 0) {
    // Equation of Line Between Points (Vertical): x = x_1
    // Equation of Line Perpendicular to Points, Passing Through Circle Center (Horizontal): y = b
    // Point of Intersection: [x_1, b]
    return [point1[0], b]
  } else if (dy === 0) {
    // Equation of Line Between Points (Horizonta;): y = y_1
    // Equation of Line Perpendicular to Points, Passing Through Circle Center (Horizontal): x = a
    // Point of Intersection: [a, y_1]
    return [a, point1[1]]
  }
}

const pointInSegment = (pointA, pointB, intersectionPoint) =>
  betweenPoints(intersectionPoint, pointA, pointB)

const pointInCircle = (circleCenter, intersectionPoint, circleRadius) =>
  distanceBetweenPoints(intersectionPoint, circleCenter) <= circleRadius

const lineInCircle = (point1, point2, circleCenter, circleRadius = 10) => {
  const intersectionPoint = findPointOfIntersection(
    circleCenter,
    point1,
    point2
  )

  return (
    pointInCircle(circleCenter, intersectionPoint, circleRadius) &&
    pointInSegment(point1, point2, intersectionPoint)
  )
}

const checkIfLineInCircle = (point, path, sensitivity = 10) => {
  let currentPoint = 1
  while (currentPoint < path.length) {
    if (
      lineInCircle(
        path[currentPoint - 1],
        path[currentPoint],
        point,
        sensitivity
      )
    )
      return true

    currentPoint += 1
  }
  return false
}

const checkIfPointInCircle = (point, path, sensitivity = 10) => {
  let currentPoint = 1
  while (currentPoint < path.length) {
    if (pointInCircle(point, path[currentPoint], sensitivity)) return true
    currentPoint += 1
  }
  return false
}

export const comparePath = (compulsoryPoints, disallowedPoints, path) => {
  const checkCompulsoryPoints = compulsoryPoints.map(
    (point) =>
      checkIfLineInCircle(point.location, path, point.size) ||
      checkIfPointInCircle(point.location, path, point.size)
  )

  const checkDisallowedPoints = disallowedPoints.map(
    (point) =>
      checkIfLineInCircle(point.location, path, point.size) ||
      checkIfPointInCircle(point.location, path, point.size)
  )

  return {
    correct:
      checkCompulsoryPoints.every((point) => !!point) &&
      checkDisallowedPoints.every((point) => !point),
    compulsoryPoints: checkCompulsoryPoints,
    disallowedPoints: checkDisallowedPoints,
  }
}

export const pathLength = (path) => {
  let length = 0
  let currentPoint = 1

  while (currentPoint < path.length) {
    length += distanceBetweenPoints(path[currentPoint - 1], path[currentPoint])
    currentPoint += 1
  }

  return length
}
