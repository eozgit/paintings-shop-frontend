import { RouteConfig } from 'vue-router'
import { Store, AppStore } from '../store'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'registration',
        component: () => import('pages/Registration.vue')
      },
      {
        path: 'login',
        component: () => import('pages/Login.vue'),
        beforeEnter: (to, from, next) => {
          const store = Store as AppStore
          next()
        }
      },
      {
        path: 'paintings',
        component: () => import('pages/Paintings.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
