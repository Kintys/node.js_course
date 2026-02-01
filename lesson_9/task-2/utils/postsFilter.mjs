import { escapeRegex } from './helpers.mjs'

export const ALLOWED_FILTERS = {
    post: (v) => {
        const raw = String(v ?? '').trim()
        if (!raw) return undefined
        const safe = escapeRegex(raw)
        return { post: new RegExp(safe, 'i') }
    },

    authors: (v) => {
        const raw = String(v ?? '').trim()
        if (!raw) return undefined
        const safe = escapeRegex(raw)
        return { authorsName: safe }
    }
}

export function buildPostsFilter(query) {
    const filter = {}
    for (const key in ALLOWED_FILTERS) {
        if (query[key] !== undefined && query[key] !== '') {
            const value = ALLOWED_FILTERS[key](query[key])
            if (value !== undefined && value !== null) {
                Object.assign(filter, value)
            }
        }
    }
    return filter
}
