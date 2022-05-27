import Vue from "vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";

Sentry.init({
  release: "rurallstrong@" + process.env.npm_package_version,
  dsn:
    "https://2403b70745dc4ef79a98af1e60dcec7a@o418922.ingest.sentry.io/5324940",
  integrations: [new VueIntegration({ Vue, attachProps: true })]
});

export const send = mensagem => {
  Sentry.captureMessage(mensagem);
};

export const sendError = mensagem => {
  Sentry.captureException(mensagem);
};

export { Sentry };
