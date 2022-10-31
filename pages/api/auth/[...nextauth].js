import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.Facebook({
            clientId: '125991836139066',
            clientSecret: '46f1902acfd2a3087da31c39f93c8a03',
          }),
    ],
}

export default (req, res) => NextAuth(req, res, options)