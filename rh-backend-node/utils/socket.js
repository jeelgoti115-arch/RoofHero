export const emitContractorEvent = (req, event, payload = {}) => {
  const io = req.app?.get('io')
  if (!io) return

  const message = {
    event,
    contractorIds: Array.isArray(payload.contractorIds) ? payload.contractorIds : [],
    quoteId: payload.quoteId || payload.quote?._id?.toString() || null,
  }

  setImmediate(() => {
    try {
      io.emit(event, message)
    } catch (emitError) {
      console.error('Socket emit failed:', emitError)
    }
  })
}

export const emitHomeownerEvent = (req, event, payload = {}) => {
  const io = req.app?.get('io')
  if (!io) return

  const message = {
    event,
    homeownerIds: Array.isArray(payload.homeownerIds)
      ? payload.homeownerIds
      : payload.homeownerId
      ? [payload.homeownerId]
      : [],
    quoteId: payload.quoteId || payload.quote?._id?.toString() || null,
  }

  setImmediate(() => {
    try {
      io.emit(event, message)
    } catch (emitError) {
      console.error('Socket emit failed:', emitError)
    }
  })
}
