import { useNuxtApp } from '#app'

export const useAuth = () => {
  const { $auth } = useNuxtApp()
  return $auth
}
