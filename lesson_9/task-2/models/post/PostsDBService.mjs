import Post from './Post.mjs'
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import User from '../user/User.mjs'

class PostsDBService extends MongooseCRUDManager {
    async getList(filters) {
        try {
            let finalFilters = { ...filters }

            if (filters.authorsName) {
                const authorNameRegex = new RegExp(filters.authorsName, 'i')
                const matchingUsers = await User.find({ name: authorNameRegex }).select('_id')
                const userIds = matchingUsers.map((user) => user._id)

                delete finalFilters.authorsName

                if (userIds.length > 0) {
                    if (userIds.length === 1) {
                        finalFilters.authors = userIds[0]
                    } else {
                        finalFilters.authors = { $in: userIds }
                    }
                } else {
                    return []
                }
            }

            let query = Post.find(finalFilters, { password: 0 })
            query = query.populate('authors')
            query = query.populate('comments.commenter', 'name')

            const results = await query.exec()
            return results.map((doc) => doc.toObject())
        } catch (error) {
            return []
        }
    }
}

export default new PostsDBService(Post)
