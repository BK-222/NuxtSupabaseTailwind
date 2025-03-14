import { defineStore } from 'pinia'

interface AuthState {
  user: { id: string; email?: string } | null
}

interface AuthPayload {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null
  }),
  actions: {
    signin(payload: AuthPayload) {
      return this.auth({ ...payload, mode: 'login' })
    },
    signup(payload: AuthPayload) {
      return this.auth({ ...payload, mode: 'signup' })
    },
    async auth({ email, password, mode }: AuthPayload & { mode: 'login' | 'signup' }) {
      const { $supabase } = useNuxtApp()
      try {
        const { data, error } = mode === 'login'
          ? await $supabase.auth.signInWithPassword({ email, password })
          : await $supabase.auth.signUp({ email, password })

        if (error) throw error
        this.user = data.user

      } catch (error) {
        console.error(`${mode} error:`, error)
        throw error
      }
    },
    async signout() {
      const { $supabase } = useNuxtApp()
      try {
        const { error } = await $supabase.auth.signOut()
        if (error) throw error
        this.user = null
      } catch (error) {
        console.error("Signout error:", error)
        throw error
      }
    }
  }
})