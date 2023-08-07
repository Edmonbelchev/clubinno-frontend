import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const App           = () => import('@/App.vue');
const Login         = () => import('@/views/auth/Login.vue');
const Register      = () => import('@/views/auth/Register.vue');
const Profile       = () => import('@/views/profile/Index.vue');

/* ENTERTAINMENT PLACE ROUTES */
const RegisterPlace = () => import('@/views/entertainmentPlace/Register.vue');
const EntertainmentPlace = () => import('@/views/entertainmentPlace/Index.vue');
const EntertainmentPlaceEdit = () => import('@/views/entertainmentPlace/Edit.vue');
const EntertainmentPlaceProfiles = () => import('@/views/entertainmentPlace/Profiles.vue');
const EntertainmentPlaceCreatePersonnel = () => import('@/views/entertainmentPlace/CreatePersonnel.vue');

/* TOWN HALL ROUTES */
const RegisterTownHall = () => import('@/views/townHall/Register.vue');
const TownHall = () => import('@/views/townHall/Index.vue');
const TownHallEdit = () => import('@/views/townHall/Edit.vue');

/* SETUP PREFIX FUNCTION FOR ROUTE GROUPING */
const routesWithPrefix = (prefix: any, routes: any) => {
    return routes.map(route => {
      route.path = `${prefix}${route.path}`
  
      return route
    })
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: App,
            meta: { requiresAuth: true },
        },

        /* AUTH ROUTES */
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: { requiresAuth: true },
        },

        /* ENTERTAINMENT PLACE */
        ...routesWithPrefix('/entertainment-place', [
            {
                path: '/register',
                name: 'entertainment-place-register',
                component: RegisterPlace,
                meta: { requiresAuth: true },
            },
            {
                path: '/:id',
                name: 'entertainment-place',
                component: EntertainmentPlace,
                meta: { requiresAuth: true },
            },
            {
                path: '/:id/edit',
                name: 'entertainment-place-edit',
                component: EntertainmentPlaceEdit,
                meta: { requiresAuth: true },
            },
            {
                path: '/:id/profiles',
                name: 'entertainment-place-profiles',
                component: EntertainmentPlaceProfiles,
                meta: { requiresAuth: true },
            },
            {
                path: '/:id/personnel/create',
                name: 'entertainment-place-create-personnel',
                component: EntertainmentPlaceCreatePersonnel,
                meta: { requiresAuth: true },
            },
        ]),

        /* TOWN HALL */
        {
            path: '/town-hall/register',
            name: 'registerTownHall',
            component: RegisterTownHall,
            meta: { requiresAuth: true },
        },
         /* TOWN HALL */
         {
            path: '/town-hall/:id',
            name: 'town-hall',
            component: TownHall,
            meta: { requiresAuth: true },
        },
         /* TOWN HALL */
         {
            path: '/town-hall/:id/edit',
            name: 'town-hall-edit',
            component: TownHallEdit,
            meta: { requiresAuth: true },
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    /* GET AUTH STORE */
    const store = useAuthStore()
    /* GET isLogged STATE */
    const isLogged = store.isLogged
    /* GET USER STATE */
    const user = store.user

    if(to.path === '/login' && isLogged) {
      next('/profile')
      return
    }

    /* MIDDLEWARE STATEMENTS */
    if(isLogged && user && user.total_profiles == 0){
        if(to.path != '/entertainment-place/register' && user.type == 1){
            next('/entertainment-place/register')
            return
        }
        else if (to.path != '/performer/register' && user.type == 2){
            next('/performer/register')
            return
        }
        else if (to.path != '/music-company/register' && user.type == 3){
            next('/music-company/register')
            return
        }
        else if (to.path != '/town-hall/register' && user.type == 4){
            next('/town-hall/register')
            return
        }
    }
  
    /* IF NOT LOGGED IN REDIRECT TO LOGIN PAGE */
    if(to.matched.some(record => record.meta.requiresAuth) && !isLogged){
      next('login')
      return
    }
  
    next()
})

export default router