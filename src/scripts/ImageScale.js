export const imageScale = image => {
  const scale = findImageScale(image)

  return { width: image.width * scale, height: image.height * scale }
}

export const findImageScale = image => {
  if (image.width > 2400 || image.height > 2400) return 0.2
  else if (image.width > 1900 || image.height > 1900) return 0.25
  else if (image.width > 1200 || image.height > 1200) return 0.3
  else if (image.width > 850 || image.height > 855) return 0.5
  else if (image.width > 700 || image.height > 675) return 0.6
  else if (image.height < 250 || (image.width < 250 && image.height < 435))
    return 1.5
  else return 1
}
