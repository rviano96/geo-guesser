import  {
    ReactNode,
    useEffect,
    useState,
    useContext,
    createContext,
} from 'react'
import { auth } from '../config/firebaseSetup'
import {
    UserCredential,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth'
import { AuthContext, AuthContextModel } from '../context/AuthContext'

export interface AuthProviderProps {
    children?: ReactNode
}

export interface UserContextState {
    isAuthenticated: boolean
    isLoading: boolean
    id?: string
}

export const UserStateContext = createContext<UserContextState>(
    {} as UserContextState,
)

export function useAuth(): AuthContextModel {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [user, setUser] = useState<User | null>(null)

    function signUp(email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signIn(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function resetPassword(email: string): Promise<void> {
        return sendPasswordResetEmail(auth, email)
    }
    useEffect(() => {
        //function that firebase notifies you if a user is set
        const unsubsrcibe = auth.onAuthStateChanged((user) => {
            setUser(user)
        })
        return unsubsrcibe
    }, [])

    const values = {
        signUp,
        user,
        signIn,
        resetPassword,
        auth,
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useUserContext = (): UserContextState => {
    return useContext(UserStateContext)
}
