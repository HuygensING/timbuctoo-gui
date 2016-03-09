import React from "react";
import Collective from "./collective";
import Document from "./document";
import Person from "./person";
import Keyword from "./keyword";
import Language from "./language";
import Location from "./location";

export default {
	"wwpersons": (props = null) => <Person {...props} onMouseDown={(ev) => ev.preventDefault()} />,
	"wwperson": (props = null) => <Person {...props} onMouseDown={(ev) => ev.preventDefault()} />,
	"wwdocuments": (props = null) => <Document {...props} onMouseDown={(ev) => ev.preventDefault()} />,
	"wwdocument": (props = null) => <Document {...props} onMouseDown={(ev) => ev.preventDefault()} />,
	"wwcollectives": (props = null) => <Collective {...props} onMouseDown={(ev) => ev.preventDefault()} />,
	"wwcollective": (props = null) => <Collective {...props} onMouseDown={(ev) => ev.preventDefault()} />,
	"wwkeywords": (props = null) => <Keyword {...props} onMouseDown={(ev) => ev.preventDefault()} />,
	"wwkeyword": (props = null) => <Keyword {...props} onMouseDown={(ev) => ev.preventDefault()} />,
	"wwlanguages": (props = null) => <Language {...props} onMouseDown={(ev) => ev.preventDefault()} />,
	"wwlanguage": (props = null) => <Language {...props} onMouseDown={(ev) => ev.preventDefault()} />,
	"wwlocations": (props = null) => <Location {...props} onMouseDown={(ev) => ev.preventDefault()} />,
	"wwlocation": (props = null) => <Location {...props} onMouseDown={(ev) => ev.preventDefault()} />
};