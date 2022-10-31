import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.Facebook({
            clientId: 277634837338169,
            clientSecret: e0f33ba84df56c791cbf79b7d0743e79,
          }),
    ],
}

export default (req, res) => NextAuth(req, res, options)