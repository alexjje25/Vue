import store from "@/store/index.js";

export default {
  path: "admin",
  name: "admin",
  component: () =>
    import(/* webpackChunkName: "dashAdmin" */ "@/views/dash/admin"),
  beforeEnter: (to, from, next) => {
    const status = store.getters["auth/user"];
    const type = store.getters["auth/GET_TYPE"];
    if (status) {
      if (type == "fazenda") {
        next("/dash/fazenda");
        window.console.log("fazenda");
      } else if (type == "admin") {
        next();
        window.console.log("admin");
      }
    } else {
      window.console.log("restrito!");
      next("/dash/login");
    }
  },
  children: [
    {
      path: "clientes",
      name: "clientes",
      component: () => import("@/views/dash/admin/clientes/index.vue")
    },
    {
      path: "clientesAngolas",
      name: "clientesAngolas",
      component: () => import("@/views/dash/admin/clientesAngolas/index.vue")
    },
    {
      path: "school",
      name: "school",
      component: () => import("@/views/dash/admin/school/index.vue")
    },
    {
      path: "franquia",
      name: "franquia",
      component: () => import("@/views/dash/admin/franquia/index.vue")
    },
    {
      path: "Home",
      name: "Home/admin",
      component: () => import("@/views/dash/admin/home/index.vue")
    },
    {
      path: "MapSite",
      name: "MapSite/admin",
      component: () => import("@/views/dash/admin/mapsite/index.vue")
    },
    {
      path: "talhoes",
      name: "talhoes/admin",
      component: () => import("@/views/dash/admin/talhoes/index.vue")
    },
    {
      path: "signup",
      name: "signupAdmin",
      component: () => import("@/views/dash/admin/signup/index.vue")
    },
    {
      path: "colors",
      name: "colorsTools",
      component: () => import("@/views/dash/admin/colors/index.vue")
    },
    {
      path: "pragas",
      name: "pragas",
      component: () => import("@/views/dash/admin/pragas"),
      children: [
        {
          path: "lista",
          name: "ListaPragas",
          component: () => import("@/views/dash/admin/pragas/lista")
        },
        {
          path: "include",
          name: "IncludePragas",
          component: () => import("@/views/dash/admin/pragas/include")
        }
      ]
    },
    {
      path: "armadilhas",
      name: "adminArmadilhas",
      component: () => import("@/views/dash/admin/armadilhas"),
      children: [
        {
          path: "lista",
          name: "ListaTraps",
          component: () => import("@/views/dash/admin/armadilhas/lista")
        },
        {
          path: "include",
          name: "IncludeTraps",
          component: () => import("@/views/dash/admin/armadilhas/include")
        }
      ]
    },
    {
      path: "daninhas",
      name: "daninhas",
      component: () => import("@/views/dash/admin/daninhas"),
      children: [
        {
          path: "lista",
          name: "ListaDaninhas",
          component: () => import("@/views/dash/admin/daninhas/lista")
        },
        {
          path: "include",
          name: "IncludeDaninhas",
          component: () => import("@/views/dash/admin/daninhas/include")
        }
      ]
    },
    {
      path: "doencas",
      name: "doencas",
      component: () => import("@/views/dash/admin/doencas"),
      children: [
        {
          path: "lista",
          name: "ListaDoencas",
          component: () => import("@/views/dash/admin/doencas/lista")
        },
        {
          path: "include",
          name: "IncludeDoencas",
          component: () => import("@/views/dash/admin/doencas/include")
        }
      ]
    },
    {
      path: "users",
      name: "users",
      component: () => import("@/views/dash/admin/users"),
      children: [
        {
          path: "lista",
          name: "lista",
          component: () => import("@/views/dash/admin/users/lista")
        },
        {
          path: "include",
          name: "include",
          component: () => import("@/views/dash/admin/users/include")
        }
      ]
    }
  ]
};
