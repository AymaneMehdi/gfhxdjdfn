import { IconEye, IconCirclePlus } from "@tabler/icons";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Tout les partenaires",
    icon: IconEye,
    href: "/all-posts",
  },
  {
    id: uniqueId(),
    title: "Ajouter partenaire",
    icon: IconCirclePlus,
    href: "/add-post",
  },
];

export default Menuitems;
