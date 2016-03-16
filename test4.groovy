g.V()
.has("isLatest", true)
.filter {
  it.get()
    .property("types")
    .value()
    .contains("\"wwperson\"")
}.as("or")
.or(__.and(__.outE("hasBirthPlace")
    .otherV()
    .as("or|0|and|0|or")
    .or(__())
    .union(__()
      .as("or|0|and|0|or|0")))
  .union(__.outE("hasBirthPlace")
    .as("or|0|and|0")
    .otherV()
    .as("or|0|and|0|or")
    .or(__())
    .union(__()
      .as("or|0|and|0|or|0"))
    .as("or|0|0")))
.union(

  __()
  .as("or|0")
  .and(__.outE("hasBirthPlace")
    .otherV()
    .as("or|0|and|0|or")
    .or(__())
    .union(__()
      .as("or|0|and|0|or|0")))
  .union(__.outE("hasBirthPlace")
    .as("or|0|and|0")
    .otherV()
    .as("or|0|and|0|or")
    .or(__())
    .union(__()
      .as("or|0|and|0|or|0"))
    .as("or|0|0")))

.match(
  __.as("or|0").range(0, 1).aggregate("a"),
  __.as("or|0|and|0|or|0").range(0, 1).aggregate("b"),
  __.as("or|0|and|0|or|0").group("val1").by("tim_id"),
  __.as("or|0").group("val2").by("tim_id"),
).cap("val1", "val2", "a", "b")
.map{
  [
    "count1": it.get().get("val1").count{ key, value -> 1},
    "count2":  it.get().get("val2").count{ key, value -> 1},
    "a": it.get().get("a"),
    "b": it.get().get("b")
  ]
}


