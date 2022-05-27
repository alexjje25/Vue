import store from "@/store/index.js";
import mapaCalor from "@/views/dash/gerencia/mapCalor/index";
export default {
  path: "gerencia",
  name: "gerencia",
  component: () =>
    import(/* webpackNameChuck: "gerencia" */ "@/views/dash/gerencia"),
  beforeEnter: (to, from, next) => {
    const status = store.getters["auth/user"];
    const type = store.getters["auth/GET_TYPE"];
    if (status) {
      if (type == "gerencia") {
        next();
      } else if (type == "admin") {
        next("/dash/admin");
      }
    } else {
      next("/dash/login");
    }
  },
  redirect: "/dash/gerencia/tarefas",
  children: [
    {
      path: "rota-colaborador",
      name: "rotaColab",
      component: () => import("@/views/dash/gerencia/rota/index")
    },
    {
      path: "colaboradores",
      name: "colaboradores",
      component: () =>
        import(
          /* webpackChunkName: "colaboradores" */ "@/views/dash/gerencia/colaboradores"
        ),
      redirect: "colaboradores/lista",
      children: [
        {
          path: "view",
          name: "view",
          component: () => import("@/views/dash/gerencia/colaboradores/view"),
          props: route => ({ query: route.query.q })
        },
        {
          path: "lista",
          name: "colabList",
          component: () => import("@/views/dash/gerencia/colaboradores/lista")
        },
        {
          path: "registro",
          name: "colabRegistro",
          component: () =>
            import("@/views/dash/gerencia/colaboradores/registro/index.vue")
        }
      ]
    },
    {
      path: "home",
      name: "chart",
      component: () => import("@/views/tester.vue")
    },
    {
      path: "ndvi",
      component: () => import("@/views/dash/gerencia/ndvi")
    },
    {
      path: "producoes",
      component: () =>
        import(
          /* webpackChunkName: "producoes" */ "@/views/dash/gerencia/producoes"
        )
    },
    {
      path: "aplicacoes",
      component: () =>
        import(
          /* webpackChunkName: "aplicacoes" */ "@/views/dash/gerencia/aplicacoes"
        )
    },
    {
      path: "alertas",
      component: () =>
        import(
          /* webpackChunkName: "armadilhas" */ "@/views/dash/gerencia/alertas"
        )
    },
    {
      path: "armadilhas",
      component: () =>
        import(
          /* webpackChunkName: "armadilhas" */ "@/views/dash/gerencia/armadilhas"
        )
    },
    {
      path: "tarefas",
      name: "tarefas",
      component: () =>
        import(
          /* webpackChunkName: "tarefas" */ "@/views/dash/gerencia/tarefas"
        )
    },
    {
      path: "estoque",
      name: "estoque/gerencia",
      component: () =>
        import(
          /* webpackChunkName: "estoque" */ "@/views/dash/gerencia/estoque"
        )
    },
    {
      path: "cadastros",
      component: () =>
        import(
          /* webpackChunkName: "cadastros" */ "@/views/dash/gerencia/cadastros"
        )
    },
    {
      path: "mapas",
      name: "mapas",
      component: doisMapas,
      redirect: "mapas/pragas",
      children: [
        {
          path: "daninhas",
          name: "mapas/Daninhas",
          component: () => import("@/views/dash/gerencia/doismapas/daninhas")
        },
        {
          path: "pragas",
          name: "mapas/Pragas",
          component: () => import("@/views/dash/gerencia/doismapas/pragas")
        },
        {
          path: "doencas",
          name: "mapas/Doencas",
          component: () => import("@/views/dash/gerencia/doismapas/doencas")
        }
      ]
    },
    {
      path: "heatmap",
      name: "HeatMap",
      component: mapaCalor,
      redirect: "heatmap/pragas",
      children: [
        {
          path: "daninhas",
          name: "heatmap/Daninhas",
          component: () => import("@/views/dash/gerencia/mapCalor/daninhas")
        },
        {
          path: "pragas",
          name: "heatmap/Pragas",
          component: () => import("@/views/dash/gerencia/mapCalor/pragas")
        },
        {
          path: "doencas",
          name: "heatmap/Doencas",
          component: () => import("@/views/dash/gerencia/mapCalor/doencas")
        }
      ]
    },
    {
      path: "reports",
      component: () =>
        import(
          /* webpackChunkName: "reports" */ "@/views/dash/gerencia/reports"
        ),
      redirect: "reports/pragas",
      children: [
        {
          path: "daninhas",
          name: "Report/Daninhas",
          component: () => import("@/views/dash/gerencia/reports/daninhas")
        },
        {
          path: "pragas",
          name: "Report/Pragas",
          component: () => import("@/views/dash/gerencia/reports/pragas")
        },
        {
          path: "doencas",
          name: "Report/Doencas",
          component: () => import("@/views/dash/gerencia/reports/doencas")
        }
      ]
    }
  ]
};
