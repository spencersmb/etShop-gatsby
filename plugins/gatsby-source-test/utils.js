
exports.transformNormalizedData = (data) => {

  let normalized = {}
  for (const key of Object.keys(data)) {
    const item = data[key]

    normalized = {
      ...normalized,
      [item.slug]: item
    }
  }

  return normalized
}
