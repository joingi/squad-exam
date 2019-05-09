import Vue from 'vue';
import store from '../store';
import VueRouter from 'vue-router';
import FrontPage from '@/pages/index';
Vue.use(VueRouter)

// LAZY ROADS
const Profill = resolve => {
  require.ensure(['../pages/profill/index.vue'], () => {
    resolve(require('../pages/profill/index.vue'))
  })
};
const Skilabod = resolve => {
  require.ensure(['../pages/skilabod/index.vue'], () => {
    resolve(require('../pages/skilabod/index.vue'))
  })
};
const SkilabodId = resolve => {
  require.ensure(['../pages/skilabod/_id/index.vue'], () => {
    resolve(require('../pages/skilabod/_id/index.vue'))
  })
};
const Leidbeinendur = resolve => {
  require.ensure(['../pages/leidbeinendur/index.vue'], () => {
    resolve(require('../pages/leidbeinendur/index.vue'))
  })
};
const LeidbeinendurId = resolve => {
  require.ensure(['../pages/leidbeinendur/_id/index.vue'], () => {
    resolve(require('../pages/leidbeinendur/_id/index.vue'))
  })
};
const Hopthjalfun = resolve => {
  require.ensure(['../pages/hopthjalfun/index.vue'], () => {
    resolve(require('../pages/hopthjalfun/index.vue'))
  })
};
const HopthjalfunId = resolve => {
  require.ensure(['../pages/hopthjalfun/_id/index.vue'], () => {
    resolve(require('../pages/hopthjalfun/_id/index.vue'))
  })
};
const Einkathjalfun = resolve => {
  require.ensure(['../pages/einkathjalfun/index.vue'], () => {
    resolve(require('../pages/einkathjalfun/index.vue'))
  })
};
const EinkathjalfunId = resolve => {
  require.ensure(['../pages/einkathjalfun/_id/index.vue'], () => {
    resolve(require('../pages/einkathjalfun/_id/index.vue'))
  })
};
const Admin = resolve => {
  require.ensure(['../pages/admin/index.vue'], () => {
    resolve(require('../pages/admin/index.vue'))
  })
};
const AdminEventId = resolve => {
  require.ensure(['../pages/admin/_eventId/index.vue'], () => {
    resolve(require('../pages/admin/_eventId/index.vue'))
  })
};
const BuaTilVidburd = resolve => {
  require.ensure(['../pages/admin/bua-til-vidburd/index.vue'], () => {
    resolve(require('../pages/admin/bua-til-vidburd/index.vue'))
  })
};
const BuaTilVidburdId = resolve => {
  require.ensure(['../pages/admin/bua-til-vidburd/_id/index.vue'], () => {
    resolve(require('../pages/admin/bua-til-vidburd/_id/index.vue'))
  })
};

const routes = [
  {
    path: '/',
    component: FrontPage
  },
  {
    path: '/profill',
    name: 'profill',
    component: Profill
  },
  {
    path: '/skilabod',
    component: Skilabod,
    children: [
      {
        path: '',
        component: Skilabod
      }
    ]
  },
  {
    path: '/skilabod/:id',
    component: SkilabodId,
    children: [
      {
        path: '',
        name: 'skilabodId',
        component: SkilabodId
      }
    ]
  },
  {
    path: '/leidbeinendur',
    component: Leidbeinendur,
    children: [
      {
        path: '',
        name: 'leidbeinendur',
        component: Leidbeinendur
      }
    ]
  },
  {
    path: '/leidbeinendur/:id',
    component: LeidbeinendurId,
    children: [
      {
        path: '',
        name: 'leidbeinendurId',
        component: LeidbeinendurId
      }
    ]
  },
  {
    path: '/hopthjalfun',
    component: Hopthjalfun,
    children: [
      {
        path: '',
        component: Hopthjalfun
      }
    ]
  },
  {
    path: '/hopthjalfun/:id',
    component: HopthjalfunId,
    children: [
      {
        path: '',
        name: 'hopthjalfunId',
        component: HopthjalfunId
      }
    ]
  },
  {
    path: '/einkathjalfun',
    component: Einkathjalfun,
    children: [
      {
        path: '',
        component: Einkathjalfun
      }
    ]
  },
  {
    path: '/einkathjalfun/:id',
    component: EinkathjalfunId,
    children: [
      {
        path: '',
        name: 'einkathjalfunId',
        component: EinkathjalfunId
      }
    ]
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'admin',
        component: Admin
      }
    ]
  },
  {
    path: '/admin/edit/:id',
    component: AdminEventId,
    children: [
      {
        path: '',
        name: 'adminEventId',
        component: AdminEventId
      }
    ]
  },
  {
    path: '/admin/bua-til-vidburd',
    component: BuaTilVidburd,
    children: [
      {
        path: '',
        component: Admin
      },
      {
        path: ':id',
        component: BuaTilVidburdId
      }
    ]
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
  }
})

// mode: 'history',

router.beforeEach((to, from, next) => {
  // to and from are both route objects

  // CLEAR FILTERS ON ROUTE CHANGE
  store.commit('FILTER_PLACE', null)
  store.commit('FILTER_SPORT', null)
  store.commit('FILTER_PLACE', null)
  store.commit('FILTER_DATE', null)

  next()
})

export default router
