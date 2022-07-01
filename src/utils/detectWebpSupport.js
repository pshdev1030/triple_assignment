export function detectWebpSupport(successCallback, failCallback) {
  const image = new Image()
  // 1px x 1px WebP 이미지
  const webpdata =
    'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='
  const callback = (event) => {
    // if the event is from 'onload', check the see if the image's width is 1 pixel (which indicates support). otherwise, it fails
    const result = event?.type === 'load' && image.width === 1
    if (result) {
      document.body.classList.add('webp')
      successCallback && successCallback()
    } else {
      document.body.classList.add('no-webp')
      failCallback && failCallback()
    }
  }
  image.onerror = callback
  image.onload = callback
  image.src = webpdata
}
