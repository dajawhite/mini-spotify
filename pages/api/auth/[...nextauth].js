import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import fetch from "node-fetch";

//represent permissions we're asking the user (find in spotify docs)
const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-currently-playing",
    "user-modify-playback-state"
].join(",")

const params = {
    scope: scopes
}

//create the login url with the above scopes
const LOGIN_URL ='https://accounts.spotify.com/authorize?' + new URLSearchParams(params).toString();

async function refreshAccessToken(token){
    // refreshing an access token
    // node-fetch because this is happening server side so don't have the browser to fetch it for you
    const params = new URLSearchParams()
    params.append("grant_type", "refresh_token") // from spotify
    params.append("refresh_token",token.refreshToken)  // from spotify
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET).toString('base64')),
        },
        body: params
    })
    const data = await response.json()
    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token ?? token.refreshToken,
        accessTokenExpires: Date.now() + data.expires_in * 1000
    }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: LOGIN_URL
    }),
  ],
  // Tokens allow interaction with Spotify api because they show you are verified
  // Keep user in login state upon refresh, closing tab, reopening tab
  // Have to safe tokens inside browser (must encrypt!) 
  secret: process.env.JWT_SECRET, 
  // pages object used when there's a unique route for login page
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin 
        // returned value is encrypted in stored in a cookie

        // case of first time
        if (account) {
          token.accessToken = account.access_token //from spotify
          token.refreshToken = account.refresh_token //from spotify
          token.accessTokenExpires = account.expires_at //from spotify

          return token
        }
        // access token not expired
        if(Date.now() < token.accessTokenExpires * 1000){
            return token
        }
        // access token has expired
        return refreshAccessToken(token)
      },
    async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        return session
    }
  }
}

export default NextAuth(authOptions)