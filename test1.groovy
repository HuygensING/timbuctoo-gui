g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\"wwperson\"")}.as("or")

.or(__
	.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\"FEMALE\"")}
	.and(__.outE("isRelatedTo").otherV().as("or|0|and|1|or").or(__()).union(__().as("or|0|and|1|or|0")))

	.union(__.outE("isRelatedTo").as("or|0|and|1").otherV().as("or|0|and|1|or").or(__()).union(__().as("or|0|and|1|or|0")).as("or|0|1"))
)
.union(__().as("or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\"FEMALE\"")}.and(__.outE("isRelatedTo").otherV().as("or|0|and|1|or").or(__()).union(__().as("or|0|and|1|or|0"))).union(__.outE("isRelatedTo").as("or|0|and|1").otherV().as("or|0|and|1|or").or(__()).union(__().as("or|0|and|1|or|0")).as("or|0|1")))


.match(
	__.as("or|0")
		.has("wwperson_birthDate")
		.values("wwperson_birthDate")
		.map{ try { return ((String) it).replace("\"", "").toInteger() } catch (Exception e) { return null; } }
		.filter{it != null}
		.as("pers2_birthDate"),

	__.as("or|0|and|1|or|0")
		.has("wwperson_birthDate")
		.values("wwperson_birthDate")
		.map{ try { return ((String) it).replace("\"", "").toInteger() } catch (Exception e) { return null; } }
		.filter{it != null}
		.as("pers1_birthDate"),

	__.as("or|0|and|1|or|0")
		.has("wwperson_deathDate")
		.values("wwperson_deathDate")
		.map{ try { return ((String) it).replace("\"", "").toInteger() } catch (Exception e) { return null; } }
		.filter{it != null}
		.as("pers1_deathDate"),

	__.as("or|0|and|1|or|0")
		.values("wwperson_names")
		.map{ try { def val = (new JsonSlurper()).parseText((String) it); return val.list[0].components[0].value + " " + val.list[0].components[val.list[0].components.size() - 1].value } catch (Exception e) { return "" } }
		.as("pers1_name"),

	__.as("or|0")
		.values("wwperson_names")
		.map{ try { def val = (new JsonSlurper()).parseText((String) it); return val.list[0].components[0].value + " " + val.list[0].components[val.list[0].components.size() - 1].value } catch (Exception e) { return "" } }
		.as("pers2_name")
)

.where(
	"pers2_birthDate", between("pers1_birthDate", "pers1_deathDate")
)

.select("pers2_name", "pers2_birthDate", "pers1_birthDate", "pers1_deathDate", "pers1_name").range(0, 10)