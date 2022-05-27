export default {
  path: "/site",
  name: "site",
  component: () => import("@/views/site/index"),
  redirect: "/site/cadastro",
  children: [
    {
      path: "cadastro",
      name: "cadastro",
      component: () => import("@/views/site/cadastro")
    },
    {
      path: "cadastroangola",
      name: "cadastroangola",
      component: () => import("@/views/site/cadastroangola")
    },
    {
      path: "rurallschool",
      name: "rurallschool",
      component: () => import("@/views/site/rurallSchool/index.vue")
    },
    {
      path: "franquia",
      name: "franquia",
      component: () => import("@/views/site/franquias/index.vue")
    }
  ]
};
