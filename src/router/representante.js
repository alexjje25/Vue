export default {
  path: "/representante",
  name: "representante",
  component: () =>
    import(
      /* webpackChunkName: "dashRepresentantes" */ "@/views/representante/index.vue"
    ),
  children: [
    {
      path: "clientes",
      name: "MyClients",
      component: () => import("@/views/representante/clientes/index.vue")
    }
  ]
};
