g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\"wwperson\"")}.as("or")

.or(
	__.has("wwperson_deathDate")
		.values("wwperson_deathDate")
		.map{ try { return ((String) it).replace("\"", "").toInteger() } catch (Exception e) { return null; } }
		.filter{it != null}
		.is(eq(1800))
)

.select("or").dedup().count()