import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUserSecret,
  faAddressCard,
  faUsers,
  faBug,
  faEye,
  faTrashAlt,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
// fas faPencilAlt
//faAddressCard"></i>
// <icone :icon="['fas', 'users']" />
library.add(faUserSecret);
library.add(faAddressCard);
library.add(faUsers);
library.add(faBug);
library.add(faEye);
library.add(faTrashAlt);
library.add(faPencilAlt);

Vue.component("icone", FontAwesomeIcon);
