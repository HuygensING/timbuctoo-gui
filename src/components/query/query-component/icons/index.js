import React from "react";
import Collective from "./collective";
import Document from "./document";
import Person from "./person";
import Keyword from "./keyword";

export default {
	"wwpersons": (props = null) => <Person {...props} />,
	"wwperson": (props = null) => <Person {...props} />,
	"wwdocuments": (props = null) => <Document {...props} />,
	"wwdocument": (props = null) => <Document {...props} />,
	"wwcollectives": (props = null) => <Collective {...props} />,
	"wwcollective": (props = null) => <Collective {...props} />,
	"wwkeywords": (props = null) => <Keyword {...props} />,
	"wwkeyword": (props = null) => <Keyword {...props} />
};