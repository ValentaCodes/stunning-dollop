// /pages/api/auth/web3-login.ts
import { AuthError, createClient} from '@supabase/supabase-js'

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // must use the service role key!
)

export default async function handler(req: { body: { walletAddress: string } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: AuthError }): any; new(): any } } }) {
    const { walletAddress } = req.body

    // Generate custom access token with JWT claim
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        user_metadata: {
            wallet_address: walletAddress
        },
        email: `${walletAddress}@wallet.auth`, // dummy email if required
    })

    if (error) return res.status(400).json({ error })

    // Issue a session
    const jwt = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email: `${walletAddress}@wallet.auth`
    })

    // TODO: Return JWT or redirect to client
}
