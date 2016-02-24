import React from "react";
import Collective from "./collective";
import Document from "./document";
import Person from "./person";

export default {
	"wwpersons": (props = null) => <Person {...props} />,
	"wwdocuments": (props = null) => <Document {...props} />,
	"wwcollectives": (props = null) => <Collective {...props} />
};