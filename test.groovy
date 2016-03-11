g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\"wwperson\"")}.as("or")



.or(__
	.has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\"FEMALE\"")}
	.and(__.outE("isRelatedTo").otherV().as("or|0|and|1|or").or(__()).union(__().as("or|0|and|1|or|0")))

	.union(__.outE("isRelatedTo").as("or|0|and|1").otherV().as("or|0|and|1|or").or(__()).union(__().as("or|0|and|1|or|0")).as("or|0|1"))
)
.union(__().as("or|0").has("wwperson_gender").filter{it.get().property("wwperson_gender").value().contains("\"FEMALE\"")}.and(__.outE("isRelatedTo").otherV().as("or|0|and|1|or").or(__()).union(__().as("or|0|and|1|or|0"))).union(__.outE("isRelatedTo").as("or|0|and|1").otherV().as("or|0|and|1|or").or(__()).union(__().as("or|0|and|1|or|0")).as("or|0|1")))


.match(
	__.as("or|0|and|1|or|0").values("wwperson_children").as("val1"),
	__.as("or|0").values("wwperson_children").as("val2")
)

.where("val1", eq("val2"))

.select("or|0|and|1|or|0").dedup().count()